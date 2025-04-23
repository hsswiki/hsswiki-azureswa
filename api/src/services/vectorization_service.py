import logging

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter

from src.factories.embedding_model_factories.embedding_model_abstract_factory import (
    EmbeddingModelAbstractFactory,
)
from src.factories.factory_utils import (
    FactoryType,
    get_factory_from_settings,
)
from src.factories.vector_store_factories.vector_store_abstract_factory import (
    VectorStoreAbstractFactory,
)
from src.settings.app_settings import app_settings
from src.utils.logging_utils import log_correlation_id_context_var
from src.utils.python_parallel_utils import (
    get_parallel_thread_results,
)


class VectorizationServiceFacade:
    def __init__(self):
        self.app_settings = app_settings.reload_environment_variables()
        self.input_file_path = self.app_settings.input_file_path

        EmbeddingModelFactory: type[EmbeddingModelAbstractFactory] = (
            get_factory_from_settings(FactoryType.EMBEDDING_MODEL)
        )
        self.embedding_model = EmbeddingModelFactory().create()

        VectorStoreFactory: type[VectorStoreAbstractFactory] = (
            get_factory_from_settings(FactoryType.VECTOR_STORE)
        )
        self.vector_store = VectorStoreFactory().create()

        # raise Exception(f"{self.embedding_model=} {self.vector_store=}")

    def vectorize(self):
        raw_documents = TextLoader(self.input_file_path).load()

        documents = CharacterTextSplitter(
            chunk_size=self.app_settings.chunk_size,
            chunk_overlap=self.app_settings.chunk_overlap,
        ).split_documents(raw_documents)

        texts = [doc.page_content for doc in documents]
        # embeddings = [self.embedding_model.embed_query(text) for text in texts]

        logging.info("Entering embedding")
        try:

            def embedding_worker(chunk, correlation_id):
                log_correlation_id_context_var.set(correlation_id)
                logging.info("Embedding")
                embedding_response = self.embedding_model.embed_query(chunk)
                logging.info("Embedded")
                return embedding_response

            worker_args = [
                (doc.page_content, f"embed_doc{i}/{len(documents)}")
                for i, doc in enumerate(documents, start=1)
            ]

            embeddings = get_parallel_thread_results(
                embedding_worker, worker_args, max_worker_multiplier=10
            )
            logging.info(f"Embedded {len(embeddings)=} {len(documents)=}")
        except Exception as e:
            logging.error(f"Embedding failed: {repr(e)}")
            raise e

        logging.info(f"Adding {len(texts)=} embeddings")
        self.vector_store.add_embeddings(zip(texts, embeddings))
        logging.info(f"Added {len(texts)=} embeddings")
