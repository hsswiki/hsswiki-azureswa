from src.components.embedding_models.embedding_model_abstract_factory import (
    EmbeddingModelAbstractFactory,
)
class AzureOpenaiEmbeddingModelFactory(EmbeddingModelAbstractFactory):
    def create_from_settings(self, settings: AzureOpenaiSettings, **kwargs):
        return AzureOpenaiEmbeddingModel.from_settings(settings, **kwargs)
