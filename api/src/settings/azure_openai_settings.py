import logging
import unittest
from urllib.parse import parse_qs, urlparse

from pydantic import SecretStr, model_validator

from src.utils.pydantic_utils import FrozenBaseSettings, SettingsConfigDict


class AzureOpenaiSettings(FrozenBaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="azure_openai_",
        frozen=False,  # For postprocessing parse_settings_from_target_uris
    )

    chat_api_key: SecretStr = SecretStr("")
    chat_target_uri: str = ""
    chat_endpoint: str = ""
    chat_deployment: str = ""
    chat_api_version: str = ""
    temperature: float = 0
    max_tokens: int = None  # type: ignore

    embedding_api_key: SecretStr = SecretStr("")
    embedding_target_uri: str = ""
    embedding_endpoint: str = ""
    embedding_deployment: str = ""
    embedding_api_version: str = ""

    # If deployment and api_version not specified, try to parse from target_uri.
    @model_validator(mode="after")
    def parse_settings_from_target_uris(self):
        for target_uri in (self.chat_target_uri, self.embedding_target_uri):
            if not target_uri:
                continue
            try:
                parse_result = urlparse(target_uri)
                endpoint = f"https://{parse_result.netloc}/"

                path_parts = parse_result.path.split("/")
                deployment = path_parts[3]
                is_chat_model = path_parts[4] == "chat"
                query_params = parse_qs(parse_result.query)
                api_version = query_params["api-version"][0]
            except Exception as e:
                logging.error(
                    f"Failed to parse settings based on {target_uri=}: {repr(e)}"
                )
            if is_chat_model:
                if not self.chat_endpoint:
                    self.chat_endpoint = endpoint
                if not self.chat_deployment:
                    self.chat_deployment = deployment
                if not self.chat_api_version:
                    self.chat_api_version = api_version
            else:  # Embedding Model
                if not self.embedding_endpoint:
                    self.embedding_endpoint = endpoint
                if not self.embedding_deployment:
                    self.embedding_deployment = deployment
                if not self.embedding_api_version:
                    self.embedding_api_version = api_version

        # One of target_uri or endpoint, ... must be specified
        missing_fields: list[str] = []
        for model_type in ("chat", "embedding"):
            for setting_type in ("endpoint", "deployment", "api_version"):
                required_field = f"{model_type}_{setting_type}"
                if not getattr(self, required_field):
                    missing_fields.append(required_field)
        if missing_fields:
            logging.info(f"Potential {missing_fields=}")

        return self

    def _after_init(self):
        logging.info(f"{self.chat_target_uri=}")
        logging.info(f"{self.chat_endpoint=}")
        logging.info(f"{self.chat_deployment=}")
        logging.info(f"{self.chat_api_version=}")

        logging.info(f"{self.embedding_target_uri=}")
        logging.info(f"{self.embedding_endpoint=}")
        logging.info(f"{self.embedding_deployment=}")
        logging.info(f"{self.embedding_api_version=}")


class TestAzureOpenaiSettings(unittest.TestCase):
    def test_parse_settings_from_target_uris(self):
        import os

        logging.basicConfig(level=logging.DEBUG)

        chat_endpoint = "https://chat-endpoint.cognitiveservices.azure.com/"
        chat_deployment = "gpt-4o-mini"
        chat_api_version = "2025-01-01-preview"
        os.environ["azure_openai_chat_target_uri"] = (
            # Part 0    1      2           3                 4    5
            f"{chat_endpoint}openai/deployments/{chat_deployment}/chat/completions?api-version={chat_api_version}"
        )

        embedding_endpoint = (
            "https://embedding-endpoint.cognitiveservices.azure.com/"
        )
        embedding_deployment = "text-embedding-3-small"
        embedding_api_version = "2023-05-15"
        os.environ["azure_openai_embedding_target_uri"] = (
            # Part 0    1      2           3                      4
            f"{embedding_endpoint}openai/deployments/{embedding_deployment}/embeddings?api-version={embedding_api_version}"
        )

        azure_openai_settings = AzureOpenaiSettings()

        assert azure_openai_settings.chat_endpoint == chat_endpoint
        assert azure_openai_settings.chat_deployment == chat_deployment
        assert azure_openai_settings.chat_api_version == chat_api_version

        assert azure_openai_settings.embedding_endpoint == embedding_endpoint
        assert (
            azure_openai_settings.embedding_deployment == embedding_deployment
        )
        assert (
            azure_openai_settings.embedding_api_version
            == embedding_api_version
        )


if __name__ == "__main__":
    unittest.main()
