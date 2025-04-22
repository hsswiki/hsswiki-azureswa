"""
pip install pydantic==2.11.1 pydantic-settings==2.8.1
Includes python-dotenv
"""

import logging
import unittest
from enum import Enum

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Env vars will always take priority over dotenv files. Latter dotenv files in
# the file list will OVERRIDE the former ones.
ENV_FILE_LIST = (
    "env/.env",
    "env/.env.prod",
)


class FrozenBaseSettings(BaseSettings):
    """
    Pydantic Settings Class with immutable fields and helper methods.

    [Doc](https://docs.pydantic.dev/latest/concepts/pydantic_settings/#dotenv-env-support)

    Example file structure can be

    ```
    - project_root_folder
        - env
            - .env
        - src
            - example_config.py (File to import FrozenBaseSettings)
            - utils
                - pydantic_utils.py (This file)
    ```

    And use `from src.utils.pydantic_utils import FrozenBaseSettings`. See
    unit tests below for details.
    """

    model_config = SettingsConfigDict(
        validate_default=False,
        # Disable validate_default so that default type mismatch like `foo: str
        # = None` won't raise TypeError
        frozen=True,
        env_file=ENV_FILE_LIST,
        extra="ignore",  # Ignore extra undefined fields in dotenv files
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._after_init()

    def reload_environment_variables(self):
        """
        Reread settings from environment variable.

        [Ref](https://github.com/pydantic/pydantic-settings/issues/315#issuecomment-2175391937)
        """
        logging.info("Reloading environment variables")
        self.__init__()
        return self

    @model_validator(mode="before")
    @classmethod
    def fallback_to_defaults_on_fail(cls, input_data: dict[str, str]):
        # If read from env, value of input fields will be string.
        for field_name, input_value in input_data.items():
            if field_name not in cls.model_fields:
                # Ignore extra undefined fields in dotenv files
                continue
            field = cls.model_fields[field_name]
            FieldType = type(field.default)
            # Not using field.annotation in general since it can contain like
            # `str | None` for UnionType, `Enum | str` for Enum, and
            # `Literal[]`.
            if not (
                FieldType in (int, bool, float) or issubclass(FieldType, Enum)
            ):
                continue
            try:
                FieldType(input_value)
            except Exception as e:
                if issubclass(FieldType, Enum):
                    # So use (Enum | str) if want to accept other values
                    logging.warning(
                        f"Parsed `{field_name}: {field.annotation}` from "
                        f"`{input_value}`, but it's not a valid Enum value. "
                    )
                    continue
                # Fallback to use the default value if parsing fails
                input_data[field_name] = field.default
                logging.warning(
                    f"Skipped parsing `{field_name}: {field.annotation}` from "
                    f"`{input_value}`: {repr(e)}"
                )
        return input_data

    def _after_init(self):
        """
        Override this method in subclass to perform additional operations after
        init, such as printing out important settings. For example:

        ```python
        def _init_adder(self):
            logging.info(f"{self.example_setting=}")
        ```
        """


class TestFrozenBaseSettings(unittest.TestCase):
    def setUp(self):
        import os

        self.os = os

        class MySettings(FrozenBaseSettings):
            my_setting: int = 1

        self.my_settings = MySettings()

    def test_get_setting(self):
        assert self.my_settings.my_setting == 1

    def test_reload_environment_variables(self):
        self.os.environ["MY_SETTING"] = "2"
        my_settings = self.my_settings.reload_environment_variables()
        # Reassigning the return value is optional
        assert my_settings.my_setting == 2

    def test_frozen(self):
        with self.assertRaises(ValueError):
            # Reassignment will raise ValueError since frozen
            self.my_settings.my_setting = 2

    def test_unfrozen_and_after_init(self):
        class UnfrozenSettings(FrozenBaseSettings):
            model_config = SettingsConfigDict(frozen=False)
            example_setting: int = 1

            def _after_init(self):
                self.example_setting = 2

        unfrozen_settings = UnfrozenSettings()
        assert unfrozen_settings.example_setting == 2

    def test_fallback_to_defaults_on_fail(self):
        class ExampleEnum(Enum):
            VALUE_1 = "value_1"

        class FallbackSettings(FrozenBaseSettings):
            fallback_int: int = 1
            fallback_enum: ExampleEnum | str = ExampleEnum.VALUE_1
            # fallback_enum: ExampleEnum = ExampleEnum.VALUE_1

        fallback_settings = FallbackSettings()
        self.os.environ["FALLBACK_INT"] = "a"
        invalid_enum_value = "invalid_enum_value"
        self.os.environ["FALLBACK_ENUM"] = invalid_enum_value

        # Will log errors, which is intended.
        fallback_settings.reload_environment_variables()

        assert fallback_settings.fallback_int == 1
        assert fallback_settings.fallback_enum == invalid_enum_value


if __name__ == "__main__":
    unittest.main()
