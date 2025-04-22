from typing import Iterable, Optional

from langchain_core.documents import Document

from .vector_store_interface import VectorStoreInterface


class MockVectorStore(VectorStoreInterface):
    @classmethod
    def from_settings(
        cls,
        settings,
        index_schema,
        **kwargs,
    ):
        return cls()

    def add_embeddings(
        self,
        text_embeddings: Iterable[tuple[str, list[float]]],
        metadatas: Optional[list[dict]] = None,
        *,
        keys: Optional[list[str]] = None,
    ) -> list[str]:
        return ["" * len(list(text_embeddings))]

    @classmethod
    def from_texts(
        cls,
        texts,
        embedding,
        metadatas,
        **kwargs,
    ):
        "Implement abstract method for langchain VectorStore interface."
        return cls()

    def similarity_search(
        self, query: str, k: int = 4, **kwargs
    ) -> list[Document]:
        "Implement abstract method for langchain VectorStore interface."
        return [Document(page_content="")]

    def similarity_search_by_vector(
        self, embedding: list[float], k: int = 4, **kwargs
    ):
        """
        similarity_search_by_vector or other similar methods are not yet
        implemented as of langchain-community==0.2.19, so added here for
        convenience.

        Returns:
            list[tuple[Document, float]]:
                The second items are the similarity scores. The list is sorted
                by the similarity scores in descending order.

        References:
            - [similarity_search_by_vector](https://python.langchain.com/api_reference/community/vectorstores/langchain_community.vectorstores.azuresearch.AzureSearch.html#langchain_community.vectorstores.azuresearch.AzureSearch.similarity_search_by_vector)
        """
        from langchain_community.vectorstores.azuresearch import (
            _results_to_documents,
        )

        search_item_paged = self._simple_search(
            embedding=embedding,
            text_query="",  # Not needed when embedding is present
            k=k,
            # filters="id eq 'ZmYyYWY4OWYtOTE3NS00ZGI1LWIxZTQtMzgyOTJlZTJjNjZl'",
            **kwargs,
        )
        search_results = _results_to_documents(search_item_paged)
        return search_results
