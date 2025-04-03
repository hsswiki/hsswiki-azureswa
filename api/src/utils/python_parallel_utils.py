import asyncio
import os
import unittest
from concurrent.futures import ThreadPoolExecutor
from enum import Enum
from typing import Callable, Coroutine, TypeVar, Union

R = TypeVar("R")


class AsyncRunType(str, Enum):
    ASYNC_DEF = "async_def"
    ASYNCIO = "asyncio"
    NEW_THREAD = "new_thread"


def get_parallel_async_results(
    async_worker_function: Callable[..., R],
    worker_args: list[tuple] = [],
    run_type: AsyncRunType = AsyncRunType.ASYNCIO,
    max_worker_multiplier: int = 2,
) -> Union[list[R], Coroutine]:
    """
    Args:
        run_type:
            Decides the execution method and the return type.
        max_worker_multiplier:
            Only applies when run_type == NEW_THREAD.

    Returns:
        - If run_type=ASYNC_DEF: a Coroutine (to be awaited with asyncio.run(...)).
        - Otherwise (ASYNCIO or NEW_THREAD): a list of results.
    """

    async def _get_parallel_async_results():
        futures = [async_worker_function(*args) for args in worker_args]
        future_results = await asyncio.gather(
            *futures,
            return_exceptions=True,  # Append exception object instead of raising
        )
        return future_results  # Order is preserved

    if run_type == AsyncRunType.ASYNCIO:
        # Runs the async function in the current (or new) event loop and returns actual results
        results = asyncio.run(_get_parallel_async_results())
        return results

    elif run_type == AsyncRunType.ASYNC_DEF:
        # Returns a coroutine; the caller is responsible for awaiting
        return _get_parallel_async_results()

    elif run_type == AsyncRunType.NEW_THREAD:
        # Useful if you're inside an environment that can't call `asyncio.run()` directly.
        max_workers = max_worker_multiplier * (os.cpu_count() or 1)

        async def _get_parallel_async_results_in_new_event_loop():
            with ThreadPoolExecutor(max_workers=max_workers):
                # Offload to a thread, but we still need an event loop to gather async tasks
                results = await _get_parallel_async_results()
            return results

        return _get_parallel_async_results_in_new_event_loop()

    else:
        raise ValueError(f"Unsupported run_type: {run_type}")


def get_parallel_thread_results(
    worker_function: Callable[..., R],
    worker_args: list[tuple] = [],
    max_worker_multiplier=2,
) -> list[R]:
    import os
    from concurrent.futures import ThreadPoolExecutor

    max_workers = max_worker_multiplier * (os.cpu_count() or 1)
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # max_workers kwarg defaults to the number of processors, which is
        # suitable for CPU-bound tasks. For I/O-bound tasks, can set to 2x
        # CPU count or higher.

        results_iterator = executor.map(worker_function, *zip(*worker_args))
        # If function only has one arg, then simply pass args as a list.
        # If any parallel function raises, the whole executor will fail.
    results = list(results_iterator)
    return results


class TestParallel(unittest.TestCase):
    # @unittest.skip("Sleep takes time")
    def test_asyncio(self):
        import asyncio

        worker_args = [(1, 1), (2, 2)]

        async def async_worker(arg1, _arg2):
            # await asyncio.sleep(1)  # To simulate processing time
            # Can't use time.sleep since it's blocking. Even if asyncio is
            # used, it will still run in sequence.
            return arg1

        expected_results = [1, 2]

        # Usage 1: return async function definition
        results = asyncio.run(
            get_parallel_async_results(
                async_worker, worker_args, run_type=AsyncRunType.ASYNC_DEF
            )  # type: ignore
        )
        assert results == expected_results

        # Usage 2: return results, similar to get_parallel_thread_results
        results = get_parallel_async_results(
            async_worker, worker_args, run_type=AsyncRunType.ASYNCIO
        )
        assert results == expected_results

        # Usage 3: return results from a new event loop
        # In real world, call gather_results_in_new_thread in other async
        # function such as Azure Function's main function, like
        # `async_results = await gather_results_in_new_thread()`
        results = asyncio.run(
            get_parallel_async_results(
                async_worker, worker_args, run_type=AsyncRunType.NEW_THREAD
            )  # type: ignore
        )
        assert results == expected_results

    def test_threading(self):
        worker_args = [(1, 1), (2, 2)]
        # If worker has just one arg, can still use list of tuples, or pass
        # args as a list without zip in executor.map's 2nd argument.

        def worker(arg1: int, _arg2: int) -> int:
            return arg1

        results = get_parallel_thread_results(worker, worker_args)
        # Make sure to iterate over the results_iterator in order to get any
        # raised error from the worker function.
        assert results == [1, 2]  # Same as async_results


if __name__ == "__main__":
    unittest.main()
