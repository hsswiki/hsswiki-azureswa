import logging


class MockChatModel:
    def invoke_string_output(self, string_input: str) -> str:
        logging.info("Mocking")
        return string_input
