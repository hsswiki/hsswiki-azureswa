import logging
from enum import Enum

from pydantic import SecretStr

from src.utils.pydantic_utils import FrozenBaseSettings, SettingsConfigDict


class AzureAiSearchSettings(FrozenBaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="azure_ai_search_", frozen=False
    )

    endpoint: str
    admin_key: SecretStr

    def _after_init(self):
        logging.info(f"{self.endpoint=}")
