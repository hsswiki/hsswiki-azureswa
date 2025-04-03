import logging as log
from enum import Enum

from src.utils.pydantic_utils import FrozenBaseSettings


class EmbeddingModels:
    AZURE_TEXT_EMBEDDING_3_LARGE = "azure.text-embedding-3-large"
    AZURE_TEXT_EMBEDDING_3_SMALL = "azure.text-embedding-3-small"
    AZURE_TEXT_EMBEDDING_ADA_002 = "azure.text-embedding-ada-002"


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


class VectorStoreType(str, Enum):
    AZURE_AI_SEARCH = "AZURE_AI_SEARCH"
    CHROMA_DB = "CHROMA_DB"


class Config(FrozenBaseSettings):
    invitation_codes_csv: str = ""
    do_debug: bool = True

    input_document_path: str = "./data/input/wiki.md"

    chunk_size: int = 1000
    chunk_overlap: int = 100
    llm_max_try_count: int = 3

    vector_store_table_name: str = "wiki"
    # Collection of ChromaDB or Index of Azure AI Search

    litellm_api_key: str = ""
    litellm_api_base: str = ""

    vector_store_type: VectorStoreType = VectorStoreType.CHROMA_DB

    azure_ai_search_endpoint: str = ""
    azure_ai_search_key: str = ""

    number_of_chunks: int = 10

    embedding_model_name: str = EmbeddingModels.AZURE_TEXT_EMBEDDING_3_SMALL
    completion_model_name: str = CompletionModels.AZURE_GPT_4O_MINI
    max_input_tokens: int = COMPLETION_MODEL_CONFIG[completion_model_name][
        "max_input_tokens"
    ]
    max_output_tokens: int = COMPLETION_MODEL_CONFIG[completion_model_name][
        "max_output_tokens"
    ]
    temperature: int = COMPLETION_MODEL_CONFIG[completion_model_name][
        "temperature"
    ]

    def _init_adder(self):
        log.info(f"{self.do_debug=}")
        log.info(f"{self.vector_store_type=}")

    def get_invitation_codes(self) -> list[str]:
        return self.invitation_codes_csv.split(",")


config = Config()

if __name__ == "__main__":
    """
    Unit test with cd api; python -m components.configs
    """
    import os

    config = Config()

    os.environ["VECTOR_STORE_TYPE"] = "AZURE_AI_SEARCH"
    config.reload_environment_variables()
