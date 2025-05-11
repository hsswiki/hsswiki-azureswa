import unittest

from langchain_openai import AzureOpenAIEmbeddings

from src.settings.azure_openai_settings import AzureOpenaiSettings


class AzureOpenaiEmbeddingModel(AzureOpenAIEmbeddings):
    """
    [Doc](https://python.langchain.com/docs/integrations/text_embedding/azureopenai/)
    """

    @classmethod
    def from_settings(cls, settings: AzureOpenaiSettings, **kwargs):
        return cls(
            api_key=settings.embedding_api_key.get_secret_value(),  # type: ignore
            # It seems the current version of langchain_openai still uses
            # Pydantic v1 typing, which is incompatible with `from pydantic
            # import SecretStr`.
            azure_endpoint=settings.embedding_endpoint,
            model=settings.embedding_deployment,
            # It seems `model` and `deployment` kwargs are the same and the
            # latter is not needed
            api_version=settings.embedding_api_version,
            **kwargs,
        )


class TestAzureOpenaiEmbeddingModel(unittest.TestCase):
    DO_MOCK_AND_SAVE_COST = True

    def test_embed_query(self):
        """
        Setup Azure OpenAI settings first, probably in an env file. For
        example:

        ```dotenv
        AZURE_OPENAI_EMBEDDING_API_KEY=ExampleApiKey
        AZURE_OPENAI_EMBEDDING_TARGET_URI=https://example-embedding-endpoint.openai.azure.com/openai/deployments/text-embedding-3-small/embeddings?api-version=2023-05-15

        # Also add below if Target URI not specified
        AZURE_OPENAI_EMBEDDING_ENDPOINT=https://example-embedding-endpoint.openai.azure.com/
        AZURE_OPENAI_EMBEDDING_DEPLOYMENT=text-embedding-3-small
        AZURE_OPENAI_EMBEDDING_API_VERSION=2023-05-15
        ```
        """
        import logging
        from unittest.mock import patch

        logging.basicConfig(level=logging.DEBUG)

        azure_openai_settings = AzureOpenaiSettings()

        embedding_model = AzureOpenaiEmbeddingModel.from_settings(
            azure_openai_settings
        )
        string_to_embed = "hello"

        if self.DO_MOCK_AND_SAVE_COST:
            print("\nMocking enabled")
            mock_embed_query = patch.object(
                AzureOpenAIEmbeddings,
                "embed_query",
                return_value=[0.0] * 1536,
            )
            mock_embed_query.start()

        single_vector = embedding_model.embed_query(string_to_embed)

        if self.DO_MOCK_AND_SAVE_COST:
            mock_embed_query.stop()

        print(f"{single_vector[:3]=}")
        assert len(single_vector) == 1536  # text-embedding-3-small


if __name__ == "__main__":
    unittest.main()
