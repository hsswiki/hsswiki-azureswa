def get_traceback_text() -> str:
    import traceback

    traceback_text = traceback.format_exc()
    return traceback_text


def to_snake_case(name):
    """Convert a CamelCase string to snake_case."""
    import re

    return re.sub(r"(?<!^)(?=[A-Z])", "_", name).lower()


def to_camel_case(name):
    """Convert a snake_case string to CamelCase."""
    return "".join(word.capitalize() for word in name.split("_"))


def execute_code(code: str) -> tuple[str, str]:
    """
    Executes the given Python code string in the current session and captures stdout and stderr.

    Args:
        code (str): The Python code to execute.

    Returns:
        tuple[str, str]: A tuple containing the captured stdout and stderr as strings.

    # Example code to execute
    code_to_execute = '''
    x = 5
    y = 10
    print(f"The sum of x and y is: {x + y}")
    '''

    stdout, stderr = execute_code(code_to_execute)
    print("Captured stdout:")
    print(stdout)
    print("Captured stderr:")
    print(stderr)
    """
    import io
    import sys

    # Redirect stdout and stderr
    stdout_capture = io.StringIO()
    stderr_capture = io.StringIO()
    original_stdout = sys.stdout
    original_stderr = sys.stderr

    try:
        sys.stdout = stdout_capture
        sys.stderr = stderr_capture
        exec(
            code, globals(), locals()
        )  # Execute the code in the current session
    except Exception as e:
        # Capture any exception and print it to stderr
        print(f"Error: {e}", file=sys.stderr)
    finally:
        # Restore original stdout and stderr
        sys.stdout = original_stdout
        sys.stderr = original_stderr

    return stdout_capture.getvalue(), stderr_capture.getvalue()
