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


class CompletionModels:
    AZURE_GPT_4O_MINI = "azure.gpt-4o-mini"
    AZURE_O1 = "azure.o1"


COMPLETION_MODEL_CONFIG = {
    CompletionModels.AZURE_GPT_4O_MINI: {
        "max_input_tokens": 128000,
        "max_output_tokens": 16384,
        "temperature": 0,
    },
    CompletionModels.AZURE_O1: {
        "max_input_tokens": 128000,
        "max_output_tokens": 32768,
        "temperature": 1,  # Must be 1 for o1. Otherwise will raise error.
    },
}


class AppSettings(FrozenBaseSettings):
    is_local: bool = False

    invitation_codes_csv: str = ""
    do_debug: bool = True

    input_file_path: str = "./data/input/wiki.md"

    # Factory settings
    chat_model: ChatModelClass | str = ChatModelClass.AZURE_OPENAI_CHAT_MODEL
    embedding_model: EmbeddingModelClass | str = (
        EmbeddingModelClass.AZURE_OPENAI_EMBEDDING_MODEL
    )
    vector_store: VectorStoreClass | str = VectorStoreClass.AZURE_AI_SEARCH

    # Text Splitter settings
    chunk_size: int = 1000
    chunk_overlap: int = 100

    llm_max_try_count: int = 3

    vector_store_table_name: str = "wiki"
    # Collection of ChromaDB or Index of Azure AI Search

    embedding_dimensions: int = 1536

    number_of_chunks: int = 10

    # embedding_model_name: str = (
    #     EmbeddingModelClass.AZURE_TEXT_EMBEDDING_3_SMALL
    # )
    # completion_model_name: str = CompletionModels.AZURE_GPT_4O_MINI
    # max_input_tokens: int = COMPLETION_MODEL_CONFIG[completion_model_name][
    #     "max_input_tokens"
    # ]
    # max_output_tokens: int = COMPLETION_MODEL_CONFIG[completion_model_name][
    #     "max_output_tokens"
    # ]
    # temperature: int = COMPLETION_MODEL_CONFIG[completion_model_name][
    #     "temperature"
    # ]

    def _after_init(self):
        logging.info(f"{self.is_local=}")
        logging.info(f"{self.do_debug=}")
        logging.info(f"{self.chat_model=}")
        logging.info(f"{self.embedding_model=}")
        logging.info(f"{self.vector_store=}")

    def get_invitation_codes(self) -> list[str]:
        return self.invitation_codes_csv.split(",")


app_settings = AppSettings()

if __name__ == "__main__":
    """
    Unit test with

    ```shell
    cd api
    python -m src.settings.app_settings
    ```
    """
    import importlib
    import os

    importlib.reload(logging)
    logging.basicConfig(level=logging.DEBUG)

    my_app_settings = AppSettings()
    assert my_app_settings.is_local

    os.environ["IS_LOCAL"] = "False"
    my_app_settings = my_app_settings.reload_environment_variables()
    assert not my_app_settings.is_local
