from abc import ABC, abstractmethod
from typing import Iterable, Optional

from langchain_core.vectorstores import VectorStore


class VectorStoreInterface(VectorStore, ABC):
    @abstractmethod
    def add_embeddings(
        self,
        text_embeddings: Iterable[tuple[str, list[float]]],
        metadatas: Optional[list[dict]] = None,
        *,
        keys: Optional[list[str]] = None,
    ) -> list[str]:
        raise NotImplementedError
