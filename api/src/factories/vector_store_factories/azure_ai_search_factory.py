from src.components.vector_stores.azure_ai_search import AzureAiSearch
from src.settings.azure_ai_search_settings import AzureAiSearchSettings

from .vector_store_abstract_factory import (
    VectorStoreAbstractFactory,
)


class AzureAiSearchFactory(VectorStoreAbstractFactory):
    def create(self):
        from src.components.vector_stores.schemas.resume_azure_ai_search_index import (
            ResumeAzureAiSearchIndexSchemaFactory,
        )
        from src.settings.app_settings import AppSettings

        app_settings = AppSettings()
        azure_ai_search_index_schema = (
            ResumeAzureAiSearchIndexSchemaFactory().create(
                vector_search_dimensions=app_settings.embedding_dimensions
            )
        )
        azure_ai_search_settings = AzureAiSearchSettings()
        vector_store = AzureAiSearch.from_settings(
            azure_ai_search_settings, azure_ai_search_index_schema
        )
        return vector_store
