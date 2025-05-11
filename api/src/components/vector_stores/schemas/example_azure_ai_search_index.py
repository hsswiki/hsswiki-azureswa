from src.components.vector_stores.factories.vector_store_abstract_factory import (
    VectorStoreSchemaAbstractFactory,
)


class ExampleAzureAiSearchIndexSchemaFactory(VectorStoreSchemaAbstractFactory):
    def create(self, vector_search_dimensions: int):
        from azure.search.documents.indexes.models import (
            SearchableField,
            SearchField,
            SearchFieldDataType,
            SimpleField,
        )

        from src.components.vector_stores.azure_ai_search import (
            AzureAiSearchIndexSchema,
        )

        example_azure_ai_search_index_schema = AzureAiSearchIndexSchema(
            index_name="test-hotel-index",
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
                    # vector_search_dimensions = 1536
                    # vector_search_dimensions=len(embedding_function("_")),
                    vector_search_profile_name="myHnswProfile",
                ),
                SearchableField(
                    name="metadata",
                    type=SearchFieldDataType.String,
                    searchable=True,
                ),
                # Additional field to store the title
                SearchableField(
                    name="title",
                    type=SearchFieldDataType.String,
                    searchable=True,
                ),
                # Additional field for filtering on document source
                SimpleField(
                    name="source",
                    type=SearchFieldDataType.String,
                    filterable=True,
                ),
            ],
        )
        return example_azure_ai_search_index_schema
