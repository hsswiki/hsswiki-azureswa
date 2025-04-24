from src.settings.azure_openai_settings import AzureOpenaiSettings

from ..azure_openai_chat_model import AzureOpenaiChatModel
from .chat_model_abstract_factory import ChatModelAbstractFactory


class AzureOpenaiChatModelFactory(ChatModelAbstractFactory):
    def create(self):
        settings = AzureOpenaiSettings()
        chat_model = AzureOpenaiChatModel.from_settings(settings)
        return chat_model
