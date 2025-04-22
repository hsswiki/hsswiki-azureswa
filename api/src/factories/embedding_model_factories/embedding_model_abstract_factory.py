from abc import ABC, abstractmethod

from langchain_core.embeddings import Embeddings


class EmbeddingModelAbstractFactory(ABC):
    @abstractmethod
    def create(self) -> Embeddings:
        raise NotImplementedError
