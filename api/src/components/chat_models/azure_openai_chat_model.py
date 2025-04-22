import unittest

from langchain_openai import AzureChatOpenAI

from src.settings.azure_openai_settings import AzureOpenaiSettings


class AzureOpenaiChatModel(AzureChatOpenAI):
    @classmethod
    def from_settings(cls, settings: AzureOpenaiSettings, **kwargs):
        return cls(
            api_key=settings.chat_api_key.get_secret_value(),  # type: ignore
            # It seems the current version of langchain_openai still uses
            # Pydantic v1 typing, which is incompatible with `from pydantic
            # import SecretStr`.
            azure_endpoint=settings.chat_endpoint,
            azure_deployment=settings.chat_deployment,
            api_version=settings.chat_api_version,
            temperature=settings.temperature,
            **kwargs,
        )

    def invoke_string_output(self, string_input: str) -> str:
        """
        Invoke in a string-in-string-out fashion, similar to the old
        LangChain [BaseLLM](https://python.langchain.com/docs/concepts/text_llms/)
        interface.
        """
        messages = [("system", string_input)]  # Or "human"
        response_message = self.invoke(messages)
        string_output = response_message.content
        assert isinstance(string_output, str), f"{response_message=}"
        return string_output


class TestAzureOpenaiChatModel(unittest.TestCase):
    DO_MOCK_AND_SAVE_COST = True

    def test_invoke_string_output(self):
        """
        Setup Azure OpenAI settings first, probably in an env file. For
        example:

        ```dotenv
        AZURE_OPENAI_CHAT_API_KEY=ExampleApiKey
        AZURE_OPENAI_CHAT_TARGET_URI=https://example-chat-endpoint.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-01-01-preview

        # Also add below if Target URI not specified
        AZURE_OPENAI_CHAT_ENDPOINT=https://example-chat-endpoint.openai.azure.com/
        AZURE_OPENAI_CHAT_DEPLOYMENT=gpt-4o-mini
        AZURE_OPENAI_CHAT_API_VERSION=2025-01-01-preview
        ```
        """
        import logging
        from unittest.mock import patch

        from langchain_core.messages import BaseMessage

        logging.basicConfig(level=logging.DEBUG)

        azure_openai_settings = AzureOpenaiSettings()
        chat_model = AzureOpenaiChatModel.from_settings(
            azure_openai_settings, max_tokens=1
        )

        if self.DO_MOCK_AND_SAVE_COST:
            print("\nMocking enabled")
            mock_invoke = patch.object(
                AzureChatOpenAI,
                "invoke",
                return_value=BaseMessage(type="ai", content="mocked response"),
            )
            mock_invoke.start()

        response_text = chat_model.invoke_string_output("hello")

        if self.DO_MOCK_AND_SAVE_COST:
            mock_invoke.stop()

        print(f"{response_text=}")
        assert isinstance(response_text, str)


if __name__ == "__main__":
    unittest.main()
