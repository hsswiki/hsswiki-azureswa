from abc import ABC, abstractmethod
from typing import Iterable, Optional

from langchain_core.language_models.chat_models import BaseChatModel


class ChatModelInterface(BaseChatModel, ABC):
    @abstractmethod
    def add_embeddings(
        self,
        text_embeddings: Iterable[tuple[str, list[float]]],
        metadatas: Optional[list[dict]] = None,
        *,
        keys: Optional[list[str]] = None,
    ) -> list[str]:
        raise NotImplementedError

    @abstractmethod
    def invoke_string_output(self, string_input: str) -> str:
        """
        Invoke in a string-in-string-out fashion, similar to the old
        LangChain [BaseLLM](https://python.langchain.com/docs/concepts/text_llms/)
        interface.
        """
        raise NotImplementedError
