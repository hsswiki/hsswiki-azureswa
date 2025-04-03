import logging as log

from src.components.configs import config
from src.utils.litellm_utils import LiteLlm
from src.utils.singleton import singleton_decorator


@singleton_decorator
def get_litellm():
    log.info(f"{config.embedding_model_name=} {config.completion_model_name=}")
    return LiteLlm(
        api_key=config.litellm_api_key,
        api_base=config.litellm_api_base,
        embedding_model_name=config.embedding_model_name,
        completion_model_name=config.completion_model_name,
        completion_model_kwargs={"temperature": config.temperature},
    )


@singleton_decorator
def get_litellm_chat_model():
    """Get LiteLLM with LangChain ChatModel interface."""
    log.info(f"{config.completion_model_name=}")
    from langchain_community.chat_models import ChatLiteLLM

    llm = ChatLiteLLM(
        model=f"openai/{config.completion_model_name}",
        api_key=config.litellm_api_key,
        api_base=config.litellm_api_base,
    )
    return llm
