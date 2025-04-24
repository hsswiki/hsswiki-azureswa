from ..mock_chat_model import MockChatModel
from .chat_model_abstract_factory import ChatModelAbstractFactory


class MockChatModelFactory(ChatModelAbstractFactory):
    def create(self):
        chat_model = MockChatModel()
        return chat_model
