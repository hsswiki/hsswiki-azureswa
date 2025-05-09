import logging
from enum import Enum

from src.utils.pydantic_utils import FrozenBaseSettings


class ChatModelClass(str, Enum):
    MOCK_CHAT_MODEL = "MockChatModel"
    AZURE_OPENAI_CHAT_MODEL = "AzureOpenaiChatModel"


class EmbeddingModelClass(str, Enum):
    MOCK_EMBEDDING_MODEL = "MockEmbeddingModel"
    AZURE_OPENAI_EMBEDDING_MODEL = "AzureOpenaiEmbeddingModel"


class VectorStoreClass(str, Enum):
    MOCK_VECTOR_STORE = "MockVectorStore"
    AZURE_AI_SEARCH = "AzureAiSearch"
    CHROMA_DB = "ChromaDb"


class VectorStoreSchemaName(str, Enum):
    EXAMPLE = "Example"
    RESUME = "Resume"


class AppSettings(FrozenBaseSettings):
    invitation_codes_csv: str = ""

    input_file_path: str = "./data/input/wiki.md"

    # Factories
    chat_model: ChatModelClass | str = ChatModelClass.MOCK_CHAT_MODEL
    embedding_model: EmbeddingModelClass | str = (
        EmbeddingModelClass.MOCK_EMBEDDING_MODEL
    )
    vector_store: VectorStoreClass | str = VectorStoreClass.MOCK_VECTOR_STORE

    vector_store_schema_name: VectorStoreSchemaName | str = (
        VectorStoreSchemaName.EXAMPLE
    )
    # Like Collection of ChromaDB or Index of Azure AI Search

    # Text Splitter
    chunk_size: int = 1000
    chunk_overlap: int = 100

    llm_max_try_count: int = 3

    embedding_dimensions: int = 1536  # text-embedding-3-small

    number_of_chunks: int = 4

    def _after_init(self):
        logging.info(f"{self.chat_model=}")
        logging.info(f"{self.embedding_model=}")
        logging.info(f"{self.vector_store=}")
        logging.info(f"{self.vector_store_schema_name=}")

    def get_invitation_codes(self) -> list[str]:
        return self.invitation_codes_csv.split(",")


app_settings = AppSettings()
