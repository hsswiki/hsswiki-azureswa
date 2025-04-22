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
