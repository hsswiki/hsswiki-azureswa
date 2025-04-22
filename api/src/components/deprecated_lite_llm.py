import logging as log

from api.src.configs.app_settings import app_settings

from src.utils.litellm_utils import LiteLlm
from src.utils.singleton import singleton_decorator


@singleton_decorator
def get_litellm():
    log.info(
        f"{app_settings.embedding_model_name=} {app_settings.completion_model_name=}"
    )
    return LiteLlm(
        api_key=app_settings.litellm_api_key,
        api_base=app_settings.litellm_api_base,
        embedding_model_name=app_settings.embedding_model_name,
        completion_model_name=app_settings.completion_model_name,
        completion_model_kwargs={"temperature": app_settings.temperature},
    )


@singleton_decorator
def get_litellm_chat_model():
    """Get LiteLLM with LangChain ChatModel interface."""
    log.info(f"{app_settings.completion_model_name=}")
    from langchain_community.chat_models import ChatLiteLLM

    llm = ChatLiteLLM(
        model=f"openai/{app_settings.completion_model_name}",
        api_key=app_settings.litellm_api_key,
        api_base=app_settings.litellm_api_base,
    )
    return llm
