from abc import ABC, abstractmethod

from pydantic_settings import BaseSettings


class EmbeddingModelAbstractFactory(ABC):
    @abstractmethod
    def create_from_settings(self, settings: BaseSettings, **kwargs):
        raise NotImplementedError
