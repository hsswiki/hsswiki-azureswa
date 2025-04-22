from src.components.vector_stores.azure_ai_search import AzureAiSearch
from src.components.vector_stores.schemas.example_azure_ai_search_index import (
    ExampleAzureAiSearchIndexSchemaFactory,
)
from src.settings.azure_ai_search_settings import AzureAiSearchSettings


def test_example_azure_ai_search_index():
    EXAMPLE_VECTOR_SEARCH_DIMENSIONS = 1536
    EXAMPLE_QUERY_EMBEDDING = [0.0] * EXAMPLE_VECTOR_SEARCH_DIMENSIONS

    azure_ai_search_settings = AzureAiSearchSettings()
    example_azure_ai_search_index_schema = (
        ExampleAzureAiSearchIndexSchemaFactory().create(
            vector_search_dimensions=EXAMPLE_VECTOR_SEARCH_DIMENSIONS
        )
    )
    vector_store = AzureAiSearch.from_settings(
        azure_ai_search_settings, example_azure_ai_search_index_schema
    )
    search_results = vector_store.similarity_search_by_vector(
        embedding=EXAMPLE_QUERY_EMBEDDING
    )
    for doc, score in search_results:
        print(f"{(doc, score)=}")

    assert search_results
