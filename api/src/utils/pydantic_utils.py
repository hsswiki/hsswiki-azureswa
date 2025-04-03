"""
pip install pydantic==2.11.1 pydantic-settings==2.8.1
Includes python-dotenv
"""

import logging

from pydantic_settings import BaseSettings, SettingsConfigDict


class FrozenBaseSettings(BaseSettings):
    """
    Pydantic Settings Class with immutable fields and helper methods.

    Doc: https://docs.pydantic.dev/latest/concepts/pydantic_settings/#dotenv-env-support

    Example usage:

    ```shell
    export IS_LOCAL=TRUE  # Or 1, True, true, t, ...
    ```

    ```python
    from utils.base_settings import FrozenBaseSettings

    class Settings(FrozenBaseSettings):
        is_local: bool = True

    settings = Settings()
    assert settings.is_local

    settings.is_local = False  # Raise ValueError since frozen

    os.environ['IS_LOCAL'] = 'false'
    settings.reload_environment_variables()
    assert not settings.is_local
    ```
    """

    model_config = SettingsConfigDict(
        validate_default=False,
        # Disable so that `foo: str = None` won't raise TypeError
        frozen=True,
        # Overriding priority: Env vars > .env.prod > .env, etc.
        env_file=(
            "env/.env",
            "env/.env.prod",
        ),
        extra="ignore",  # Ignore undefined fields in dotenv files
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._init_adder()

    def _init_adder(self):
        """
        Override this method in subclass to add additional behaviors after
        init, such as printing out important settings.
        """

    def reload_environment_variables(self):
        """
        Method to reread from environment variable
        Ref: https://github.com/pydantic/pydantic-settings/issues/315#issuecomment-2175391937
        """
        logging.info("Reloading environment variables")
        self.__init__()
