from langchain_community.vectorstores.azuresearch import AzureSearch
from pydantic import BaseModel

from src.settings.azure_ai_search_settings import AzureAiSearchSettings


class AzureAiSearchIndexSchema(BaseModel):
    index_name: str
    fields: list


class AzureAiSearch(AzureSearch):
    """
    Example usage:

    ```python
    vector_store = AzureAiSearch()
    texts = [
        "Text 1",
        "Text 2",
    ]
    metadatas = [
        {"title": "Title 1", "source": "source 1"},
        {"title": "Title 2", "source": "source 2"},
    ]
    document_ids = vector_store.add_embeddings(zip(texts, embeddings), metadatas)
    ```
    """

    @classmethod
    def from_settings(
        cls,
        settings: AzureAiSearchSettings,
        index_schema: AzureAiSearchIndexSchema,
        **kwargs,
    ):
        return cls(
            azure_search_endpoint=settings.endpoint,
            azure_search_key=settings.admin_key.get_secret_value(),
            embedding_function=lambda _: "",
            # Bypassing the required embedding_function argument to decouple
            # Embedding Model and Vector Store by adding embeddings manually
            index_name=index_schema.index_name,
            fields=index_schema.fields,
            **kwargs,
        )

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
        return [doc for doc, _score in search_results]
