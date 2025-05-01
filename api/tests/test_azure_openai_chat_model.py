import os
from typing import TYPE_CHECKING

os.environ["chat_model"] = "AzureOpenaiChatModel"
os.environ["azure_openai_max_tokens"] = "1"


from src.components.factory_helper import (
    FactoryType,
    get_factory_from_settings,
)

if TYPE_CHECKING:
    from src.components.chat_models.factories.chat_model_abstract_factory import (
        ChatModelAbstractFactory,
    )


def test_azure_openai_chat_model():
    ChatModelFactory: type[ChatModelAbstractFactory] = (
        get_factory_from_settings(FactoryType.CHAT_MODEL)
    )
    chat_model = ChatModelFactory().create()
    response = chat_model.invoke_string_output("hello")
    print(f"{response=}")
