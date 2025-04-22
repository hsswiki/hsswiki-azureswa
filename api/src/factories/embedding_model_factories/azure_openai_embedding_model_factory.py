from src.components.embedding_models.azure_openai_embedding_model import (
    AzureOpenaiEmbeddingModel,
)
from src.settings.azure_openai_settings import AzureOpenaiSettings

from .embedding_model_abstract_factory import (
    EmbeddingModelAbstractFactory,
)


class AzureOpenaiEmbeddingModelFactory(EmbeddingModelAbstractFactory):
    def create(self):
        azure_openai_settings = AzureOpenaiSettings()
        embedding_model = AzureOpenaiEmbeddingModel.from_settings(
            azure_openai_settings
        )
        return embedding_model
