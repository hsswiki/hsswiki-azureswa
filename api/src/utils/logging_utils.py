import contextvars
import datetime
import logging
import os
from typing import Optional

LOG_FOLDER = "../../logs"

log_correlation_id_context_var = contextvars.ContextVar(
    "correlation_id", default=""
)


def format_root_logger(
    log_level: Optional[int] = logging.DEBUG,
    log_format_str: Optional[str] = None,
    do_file_handler: bool = False,
):
    """
    Set root logger format.

    Use %(asctime)s for timestamp if needed. Omitted since Azure Function
    logging format already contains timestamp.

    Example usage:

    ```python
    from utils.logging_utils import log_correlation_id_context_var

    def async_worker(data, correlation_id=1):
        log_correlation_id_context_var.set(f"{correlation_id}")
        log.info(f"Async processing {data=}"))

    # Then correlation id will be added to log messages
    ```
    """
    if env_log_level := os.environ.get("UTILS_LOG_LEVEL_INT"):
        log_level = int(env_log_level)
    assert log_level in (10, 20, 30, 40, 50), f"Invalid {log_level=}"

    log_format_str = (
        log_format_str
        or os.environ.get("UTILS_LOG_FORMAT")
        or "[%(levelname)-8s] %(asctime)s %(correlation_id)s %(filename)s::%(funcName)s L%(lineno)d: %(message)s\n"
    )
    # Level name length up to 8 for "CRITICAL". Ending with new line character
    # since sometimes Azure Function logs can omit it.

    date_format_str = r"%Y-%m-%d %H:%M:%S"

    logging.basicConfig(
        level=log_level,
        format=log_format_str,
        datefmt=date_format_str,
        force=True,  # Override root logger handler settings
    )
    logging.info(f"{log_level=}")

    root_logger = logging.getLogger()

    # Add correlation_id as log format variable
    class CorrelationIdFilter(logging.Filter):
        def filter(self, record):
            record.correlation_id = log_correlation_id_context_var.get()
            return True

    root_logger.addFilter(CorrelationIdFilter())
    for root_logger_handler in root_logger.handlers:
        root_logger_handler.setFormatter(
            logging.Formatter(log_format_str, datefmt=date_format_str)
        )
        root_logger_handler.addFilter(CorrelationIdFilter())

    if do_file_handler:
        # Add file handler to root logger
        os.makedirs(LOG_FOLDER, exist_ok=True)
        log_file_name = f"{LOG_FOLDER}/{datetime.datetime.now().strftime(date_format_str)}.log"
        file_handler = logging.FileHandler(log_file_name)
        file_handler.setLevel(log_level)
        file_handler.setFormatter(
            logging.Formatter(log_format_str, datefmt=date_format_str)
        )
        file_handler.addFilter(CorrelationIdFilter())

        root_logger = logging.getLogger()
        root_logger.addHandler(file_handler)


def reload_logging_module():
    import importlib

    importlib.reload(logging)
    logging.basicConfig(level=logging.DEBUG)


# class LogFormatter:
#     def __init__(self):
#         self._errors: list[dict[str, str]] = []  # Chronological order

#     def empty_errors(self):
#         self._errors = []


# import json
# try:
#     json.loads('a')
# except json.JSONDecodeError:
#     print(1)

# log_formatter = LogFormatter()
