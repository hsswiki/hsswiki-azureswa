import logging as log
import re

from api.src.configs.app_settings import VectorStoreType, app_settings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pydantic import BaseModel

from api.src.components.deprecated_lite_llm import get_litellm
from api.src.utils.logging_utils import log_correlation_id_context_var
from src.utils.python_parallel_utils import (
    get_parallel_thread_results,
)


class SectionMetadata(BaseModel):
    section: str = ""
    document_id: str = ""
    page: int = 0


class Section(BaseModel):
    """Text in a section share the same metadata."""

    text: str
    metadata: SectionMetadata = SectionMetadata()
    chunks: list[str] = []


class ChunkMetadata(BaseModel):
    page_number: int = 0
    sections: str = ""
    document_id: str = ""
    # Vector ID for ChromaDB Collection / Document Key for AI Search. Will be
    # generated automatically by LangChain.
    # id: str = ""


class Chunk(BaseModel):
    text: str = ""
    metadata: ChunkMetadata = ChunkMetadata()


def get_chromadb_client():
    import chromadb

    result = chromadb.PersistentClient("./data/output/chromadb")
    return result


def chunk_and_embed_into_collection(
    input_file_path: str,
    collection_name: str,
    document_id: str = "",  # Already expects string
):
    """
    Returns
        vector_ids
    """
    log.info(f"{input_file_path=}")
    with open(input_file_path, "r") as file:
        text_str = file.read()
    text_by_page_number = {0: text_str}
    log.info(f"{len(text_str)=}")

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=app_settings.chunk_size,
        chunk_overlap=app_settings.chunk_overlap,
    )

    if app_settings.vector_store_type == VectorStoreType.AZURE_AI_SEARCH:
        log.info(f"{app_settings.vector_store_type=}")

        from langchain_core.documents import Document

        documents: list[Document] = []
        for page_number, page_text in text_by_page_number.items():
            try:
                page_chunks = text_splitter.split_text(page_text)
                for chunk in page_chunks:
                    documents.append(
                        Document(
                            page_content=chunk,
                            metadata=ChunkMetadata(
                                page_number=page_number,
                                document_id=str(document_id),
                            ).model_dump(),
                        )
                    )
            except Exception as e:
                log.error(f"Error processing page {page_number}: {str(e)}")
                raise

        log.info("Starting embedding process")
        try:
            llm = get_litellm()

            def embedding_worker(chunk, correlation_id):
                log_correlation_id_context_var.set(correlation_id)
                log.info("Embedding")
                embedding_response = llm.embed(chunk)
                log.info("Embedded")
                return embedding_response

            worker_args = [
                (doc.page_content, f"embed_chunk{i}/{len(documents)}")
                for i, doc in enumerate(documents, start=1)
            ]

            embeddings = get_parallel_thread_results(
                embedding_worker, worker_args, max_worker_multiplier=10
            )
            log.info(f"{len(embeddings)=} {len(documents)=}")
            log.info("Embedding process complete")
        except Exception as e:
            log.error(f"Embedding failed: {str(e)}")
            raise

        vector_store = get_azure_search_vector_store()

        log.info("Adding embeddings")
        texts = [doc.page_content for doc in documents]
        metadatas = [doc.metadata for doc in documents]
        vector_store.add_embeddings(zip(texts, embeddings), metadatas)

        log.info(f"Added {len(documents)=} to {vector_store._index_name=}")
        return

    # method == "CHROMA_DB"

    log.info(f"{app_settings.vector_store_type=}")
    try:
        # 1. Initial setup and ChromaDB connection
        log.info("=== Starting vectorization process ===")
        chromadb_client = get_chromadb_client()
        log.info("Successfully connected to ChromaDB")

        # 2. Get or create collection
        log.info(f"Getting or creating collection: {collection_name}")
        if (
            app_settings.vector_store_table_name
            in chromadb_client.list_collections()
        ):
            log.info("Deleting existing collection")
            chromadb_client.delete_collection(
                name=app_settings.vector_store_table_name
            )

        collection = chromadb_client.create_collection(
            name=app_settings.vector_store_table_name
        )
        log.info("Created new collection")

        log.info("Starting text chunking")

        from langchain_core.documents import Document

        documents: list[Document] = []
        for page_number, page_text in text_by_page_number.items():
            try:
                page_chunks = text_splitter.split_text(page_text)
                for chunk in page_chunks:
                    documents.append(
                        Document(
                            page_content=chunk,
                            metadata=ChunkMetadata(
                                page_number=page_number,
                                document_id=str(document_id),
                            ).model_dump(),
                        )
                    )
            except Exception as e:
                log.error(f"Error processing page {page_number}: {str(e)}")
                raise

        log.info(f"Created {len(documents)} chunks")

        # skipped_add_section_metadata(chunks)
        # - Commented out since chromadb yet doesn't support contains operator and
        # using list as metadata, while one chunk may contain many sections.
        # - Ref: # https://github.com/chroma-core/chroma/issues/3416

        # 5. Embedding
        log.info("Starting embedding process")
        try:
            llm = get_litellm()

            def embedding_worker(chunk, correlation_id):
                log_correlation_id_context_var.set(correlation_id)
                log.info("Embedding")
                embedding_response = llm.embed(chunk)
                log.info("Embedded")
                return embedding_response

            worker_args = [
                (doc.page_content, f"embed_chunk{i}/{len(documents)}")
                for i, doc in enumerate(documents, start=1)
            ]

            embeddings = get_parallel_thread_results(
                embedding_worker, worker_args, max_worker_multiplier=10
            )
            log.info(f"{len(embeddings)=} {len(documents)=}")
            log.info("Embedding process complete")
        except Exception as e:
            log.error(f"Embedding failed: {str(e)}")
            raise

        # 6. Adding to collection
        log.info("Adding documents to collection")
        try:
            metadatas = [doc.metadata for doc in documents]
            collection.add(
                embeddings=embeddings,  # type: ignore
                documents=[doc.page_content for doc in documents],
                metadatas=metadatas,  # type: ignore
                ids=[
                    f"docid{document_id}_chunk{i + 1}"
                    for i in range(len(documents))
                ],
            )
            log.info(f"Added to {collection_name=}")
            log.info(f"Example {metadatas[-1]=}")
            log.info("Successfully added all documents to collection")
        except Exception as e:
            log.error(f"Failed to add documents to collection: {str(e)}")
            raise

        return collection

    except Exception as e:
        log.error(f"Vectorization failed: {str(e)}")
        log.error(f"Error type: {type(e)}")
        import traceback

        log.error(traceback.format_exc())
        raise


def get_azure_search_vector_store():
    # Doc: https://python.langchain.com/docs/integrations/vectorstores/azuresearch/#custom-schemas-and-queries
    log.info("Entering")
    from azure.search.documents.indexes.models import (
        SearchableField,
        SearchField,
        SearchFieldDataType,
        SimpleField,
    )
    from langchain_community.vectorstores.azuresearch import AzureSearch

    llm = get_litellm()
    embedding_function = llm.embed

    search_fields = [
        # Langchain boilerplate fields
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
            type=SearchFieldDataType.Collection(SearchFieldDataType.Single),
            searchable=True,
            vector_search_dimensions=len(embedding_function("_")),
            vector_search_profile_name="myHnswProfile",
        ),
        SearchableField(
            name="metadata",
            type=SearchFieldDataType.String,
            searchable=True,
        ),
        # Additional custom fields
        SimpleField(
            name="document_id",
            type=SearchFieldDataType.String,
            filterable=True,
        ),
        # Metadata fields not specified in the index schema will still be saved
        # in the metadata field and retrieved upon search.
    ]
    vector_store = AzureSearch(
        azure_search_endpoint=app_settings.azure_ai_search_endpoint,
        azure_search_key=app_settings.azure_ai_search_key,
        index_name=app_settings.vector_store_table_name,
        embedding_function=embedding_function,
        fields=search_fields,
    )
    log.info("Exiting")
    return vector_store


def query_relevant_chunks(
    query,
    number_of_chunks,
    collection=None,
):
    log.info(f"{query=} {number_of_chunks=}")
    if app_settings.vector_store_type == VectorStoreType.AZURE_AI_SEARCH:
        log.info(f"{app_settings.vector_store_type=}")
        # filters = " or ".join(
        #     [f"document_id eq '{doc_id}'" for doc_id in document_ids]
        # )
        # # E.g. "document_id eq '1' or document_id eq '2'"
        # log.info(f"{filters=}")

        vector_store = get_azure_search_vector_store()
        docs = vector_store.similarity_search(
            query=query,
            k=number_of_chunks,
            search_type="similarity",
            # filters=filters,
        )
        relevant_chunks = []
        for i, doc in enumerate(docs):
            # metadata = {
            #     k: v
            #     for k, v in doc.metadata.items()
            #     if k in ChunkMetadata.model_fields
            # }
            relevant_chunks.append(
                {
                    "chunk": doc.page_content,
                    # "metadata": metadata,
                }
            )
        log.info(f"{len(relevant_chunks)=}")
        return relevant_chunks

    log.info(f"{app_settings.vector_store_type=}")
    llm = get_litellm()
    query_embeddings = llm.embed(query)
    from chromadb import Collection
    from chromadb.api.types import IncludeEnum, Where

    # where_filter: Where = {
    #     "document_id": {
    #         "$in": document_ids,
    #     }
    # }
    assert isinstance(collection, Collection), f"Invalid {collection=}"
    query_results: dict = collection.query(
        query_embeddings=query_embeddings,
        n_results=number_of_chunks,
        # where=where_filter,
        # Where filter syntax doc: https://docs.trychroma.com/docs/querying-collections/metadata-filtering#metadata-filtering
        include=[IncludeEnum.documents, IncludeEnum.metadatas],
    )  # type: ignore
    if len(query_results["documents"]) != 1:
        raise ValueError(
            f'{len(query_results["documents"])=}, which is not 1 as expected.'
        )

    relevant_chunks = []
    for i, chunk in enumerate(query_results["documents"][0]):
        # id_ = query_results["ids"][0][i]
        metadata = query_results["metadatas"][0][i]
        relevant_chunks.append(
            {
                "chunk": chunk,
                "metadata": metadata,
                # "id": id_,
            }
        )
    log.info(f"{len(relevant_chunks)=}")
    return relevant_chunks
