# from src.components.vector_stores.azure_ai_search import AzureAiSearch
# from src.components.vector_stores.schemas.example_azure_ai_search_index import (
#     ExampleAzureAiSearchIndexSchemaFactory,
# )
# from src.settings.azure_ai_search_settings import AzureAiSearchSettings


# def test_example_azure_ai_search_index():
#     EXAMPLE_VECTOR_SEARCH_DIMENSIONS = 1536
#     EXAMPLE_QUERY_EMBEDDING = [0.0] * EXAMPLE_VECTOR_SEARCH_DIMENSIONS

#     azure_ai_search_settings = AzureAiSearchSettings()  # type: ignore
#     example_azure_ai_search_index_schema = (
#         ExampleAzureAiSearchIndexSchemaFactory().create(
#             vector_search_dimensions=EXAMPLE_VECTOR_SEARCH_DIMENSIONS
#         )
#     )
#     vector_store = AzureAiSearch.from_settings(
#         azure_ai_search_settings, example_azure_ai_search_index_schema
#     )
#     search_results = vector_store.similarity_search_by_vector(
#         embedding=EXAMPLE_QUERY_EMBEDDING
#     )
#     for doc, score in search_results:
#         print(f"{(doc, score)=}")

#     assert search_results

# cd api
# VECTOR_STORE=AzureAiSearch AI_SEARCH_SCHEMA=Example python -m pytest tests/ -vs --log-cli-level INFO
# python -m pytest tests/ -vs --log-cli-level INFO

import logging
import os
from typing import TYPE_CHECKING

os.environ["VECTOR_STORE"] = "AzureAiSearch"
os.environ["VECTOR_STORE_SCHEMA_NAME"] = "Example"

# logging.getLogger("azure.core.pipeline.policies.http_logging_policy").setLevel(
#     logging.WARNING
# )
logging.getLogger("azure").setLevel(logging.WARNING)

EXAMPLE_VECTOR_SEARCH_DIMENSIONS = 1536
EXAMPLE_QUERY_EMBEDDING = [0.0] * EXAMPLE_VECTOR_SEARCH_DIMENSIONS

from src.components.factory_helper import (
    FactoryType,
    get_factory_from_settings,
)

if TYPE_CHECKING:
    from src.components.vector_stores.factories.vector_store_abstract_factory import (
        VectorStoreAbstractFactory,
    )


def test_azure_ai_search_example_schema():
    VectorStoreFactory: type[VectorStoreAbstractFactory] = (
        get_factory_from_settings(FactoryType.VECTOR_STORE)
    )
    vector_store = VectorStoreFactory().create()
    search_results = vector_store.similarity_search_by_vector(
        embedding=EXAMPLE_QUERY_EMBEDDING
    )
    for doc in search_results:
        print(doc)
