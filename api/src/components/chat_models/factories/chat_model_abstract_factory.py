from abc import ABC, abstractmethod

from ..chat_model_interface import ChatModelInterface


class ChatModelAbstractFactory(ABC):
    @abstractmethod
    def create(self) -> ChatModelInterface:
        raise NotImplementedError
