"""
Singleton metaclasses. Note that subclasses of a class created with a metaclass
will also inherit the metaclass.

Singleton pattern in Python can be achieved in the following ways, each having
its own pros and cons:

- Metaclass (preferred)
- Base class cons:
    - __new__ method defined in subclass can override singleton behavior
    - Subclasses need multiple inheritance and the singleton class must be the
      leftmost
- Class decorator cons: Can't call class methods since the decorator returns a
  function
- Module cons: Can't do lazily instantiation

- Ref: https://stackoverflow.com/q/6760685/13451354
"""

import unittest


def singleton_decorator(custom_function):
    cached_return_value = None
    has_cached = False

    def decorated_custom_function(*args, **kwargs):
        nonlocal cached_return_value, has_cached
        if not has_cached:
            cached_return_value = custom_function(*args, **kwargs)
            has_cached = True
        return cached_return_value

    return decorated_custom_function


class TestSingletonDecorator(unittest.TestCase):
    def test_singleton_decorator(self):
        @singleton_decorator
        def decorated_function(x):
            return x + 1

        # The first call will execute the function and cache the return value
        self.assertEqual(decorated_function(1), 2)

        # Subsequent calls will directly return the cached result, ignoring new
        # arguments if exist.
        self.assertEqual(decorated_function(2), 2)
        self.assertEqual(decorated_function(3), 2)


class SingletonByArgMeta(type):
    """
    Metaclass for singleton by class and initialization arguments. Args must be
    serializable/hashable.
    """

    _instances = {}

    def __call__(cls, *args, **kwargs):
        import json

        key = (cls, json.dumps((args, kwargs)))
        if key not in cls._instances:
            cls._instances[key] = super().__call__(*args, **kwargs)
        return cls._instances[key]


class SingletonByClassMeta(type):
    """Metaclass for singleton by class."""

    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]


class ThreadSafeSingletonByClassMeta(type):
    """
    Metaclass for thread-safe singleton by class.

    Be careful not to nest the initialization of thread-safe singletons. E.g.
    If one singleton's init calls another singleton to init, then the process
    will deadlock since the two initilizations can wait for each other's lock.
    """

    from threading import Lock

    _instances = {}
    _lock = Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]


class TestSingleton(unittest.TestCase):
    def test_meta_singleton_by_class_and_arg(self):
        class SingletonByClassAndArg(metaclass=SingletonByArgMeta):
            def __init__(self, _arg1):
                pass

        assert SingletonByClassAndArg(1) is not SingletonByClassAndArg(2)

    def test_meta_singleton_by_class(self):
        class SingletonByClass(metaclass=SingletonByClassMeta):
            def __init__(self, _arg1):
                pass

        assert SingletonByClass(1) is SingletonByClass(2)

    def test_thread_safe_meta_singleton_by_class(self):
        class ThreadSafeSingletonByClass(
            metaclass=ThreadSafeSingletonByClassMeta
        ):
            def __init__(self, value):
                self.value = value

        self._test_thread_safe_singleton(ThreadSafeSingletonByClass)

    def _test_thread_safe_singleton(self, singleton_class):
        from concurrent.futures import ThreadPoolExecutor

        def init_my_singleton(value):
            return singleton_class(value).value

        init_values = []
        with ThreadPoolExecutor() as executor:
            results = executor.map(init_my_singleton, [1, 2])
            for result in results:
                init_values.append(result)
        assert init_values == [1, 1]


if __name__ == "__main__":
    unittest.main()
