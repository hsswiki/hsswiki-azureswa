from src.components.embedding_models.mock_embedding_model import (
    MockEmbeddingModel,
)

from .embedding_model_abstract_factory import (
    EmbeddingModelAbstractFactory,
)


class MockEmbeddingModelFactory(EmbeddingModelAbstractFactory):
    def create(self):
        return MockEmbeddingModel()
