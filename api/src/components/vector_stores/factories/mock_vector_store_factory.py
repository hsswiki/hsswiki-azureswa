from src.components.vector_stores.mock_vector_store import MockVectorStore

from .vector_store_abstract_factory import (
    VectorStoreAbstractFactory,
)


class MockVectorStoreFactory(VectorStoreAbstractFactory):
    def create(self):
        return MockVectorStore()
