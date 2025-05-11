from abc import ABC, abstractmethod

from src.components.vector_stores.vector_store_interface import (
    VectorStoreInterface,
)


class VectorStoreAbstractFactory(ABC):
    @abstractmethod
    def create(self) -> VectorStoreInterface:
        raise NotImplementedError


class VectorStoreSchemaAbstractFactory(ABC):
    @abstractmethod
    def create(self, *args, **kwargs):
        """
        Abstract Factory method to create a schema for Vector Store's use.
        """
        raise NotImplementedError
