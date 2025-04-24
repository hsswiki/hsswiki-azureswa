import logging


class MockEmbeddingModel:
    @classmethod
    def from_settings(cls, settings, **kwargs):
        return cls()

    def embed_query(self, text: str) -> list[float]:
        logging.info("Mocking")
        return [0.0] * 1536
