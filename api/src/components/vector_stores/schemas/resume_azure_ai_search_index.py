from azure.search.documents.indexes.models import (
    SearchableField,
    SearchField,
    SearchFieldDataType,
    SimpleField,
)

from src.components.vector_stores.azure_ai_search import (
    AzureAiSearchIndexSchema,
)
from src.components.vector_stores.vector_store_abstract_factory import (
    VectorStoreSchemaAbstractFactory,
)


class ResumeAzureAiSearchIndexSchemaFactory(VectorStoreSchemaAbstractFactory):
    INDEX_NAME = "resume"

    def create(self, vector_search_dimensions: int):
        result_index_schema = AzureAiSearchIndexSchema(
            index_name=self.INDEX_NAME,
            fields=[
                SimpleField(
                    name="id",
                    type=SearchFieldDataType.String,
                    key=True,
                    filterable=True,
                ),
                SearchableField(
                    name="content",
                    type=SearchFieldDataType.String,
                    searchable=True,
                ),
                SearchField(
                    name="content_vector",
                    type=SearchFieldDataType.Collection(
                        SearchFieldDataType.Single
                    ),
                    searchable=True,
                    vector_search_dimensions=vector_search_dimensions,
                    vector_search_profile_name="myHnswProfile",
                ),
                SearchableField(
                    name="metadata",
                    type=SearchFieldDataType.String,
                    searchable=True,
                ),
            ],
        )
        return result_index_schema
