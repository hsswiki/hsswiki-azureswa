from src.settings.azure_openai_settings import AzureOpenaiSettings

from ..azure_openai_embedding_model import AzureOpenaiEmbeddingModel
from .embedding_model_abstract_factory import (
    EmbeddingModelAbstractFactory,
)


class AzureOpenaiEmbeddingModelFactory(EmbeddingModelAbstractFactory):
    def create(self):
        settings = AzureOpenaiSettings()
        embedding_model = AzureOpenaiEmbeddingModel.from_settings(settings)
        return embedding_model
