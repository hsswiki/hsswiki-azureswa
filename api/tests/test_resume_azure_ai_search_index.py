import logging
import os
from typing import TYPE_CHECKING

os.environ["VECTOR_STORE_SCHEMA_NAME"] = "Resume"
os.environ["VECTOR_STORE"] = "AzureAiSearch"

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


def test_resume_azure_ai_search_index():
    VectorStoreFactory: type[VectorStoreAbstractFactory] = (
        get_factory_from_settings(FactoryType.VECTOR_STORE)
    )
    vector_store = VectorStoreFactory().create()
    search_results = vector_store.similarity_search_by_vector(
        embedding=EXAMPLE_QUERY_EMBEDDING
    )
    for doc in search_results:
        print(doc)
