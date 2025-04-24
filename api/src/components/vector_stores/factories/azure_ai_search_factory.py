import logging
from typing import TYPE_CHECKING

from src.components.vector_stores import schemas
from src.components.vector_stores.azure_ai_search import AzureAiSearch
from src.settings.app_settings import app_settings
from src.settings.azure_ai_search_settings import AzureAiSearchSettings

from .vector_store_abstract_factory import (
    VectorStoreAbstractFactory,
)

if TYPE_CHECKING:
    from src.components.vector_stores.factories.vector_store_abstract_factory import (
        VectorStoreSchemaAbstractFactory,
    )


class AzureAiSearchFactory(VectorStoreAbstractFactory):
    def create(self):
        settings = AzureAiSearchSettings()  # type: ignore
        # Ignore since will get required settings from environment variables

        index_schema_factory_name = f"{app_settings.vector_store_schema_name}AzureAiSearchIndexSchemaFactory"
        logging.info(f"{index_schema_factory_name=}")
        IndexSchemaFactory: type[VectorStoreSchemaAbstractFactory] = getattr(
            schemas, index_schema_factory_name
        )
        index_schema = IndexSchemaFactory().create(
            vector_search_dimensions=app_settings.embedding_dimensions
        )

        vector_store = AzureAiSearch.from_settings(settings, index_schema)
        return vector_store
