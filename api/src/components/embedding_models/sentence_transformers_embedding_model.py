"""
TODO: https://python.langchain.com/docs/integrations/text_embedding/huggingfacehub/
? from langchain_huggingface.embeddings import HuggingFaceEmbeddings

"""

from langchain_core.embeddings import Embeddings
from sentence_transformers import SentenceTransformer


class SentenceTransformersEmbeddingModel(Embeddings):
    """
    A local embedding model using SentenceTransformers under LangChain's Embeddings interface.
    """

    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        """
        Initialize the SentenceTransformers model.

        Args:
            model_name (str): The name of the SentenceTransformers model to load.
        """
        self.model = SentenceTransformer(model_name)

    def embed_query(self, text: str) -> list[float]:
        """
        Embed a single query string into a vector.

        Args:
            text (str): The input text to embed.

        Returns:
            list[float]: The embedding vector for the input text.
        """
        return self.model.encode(text, convert_to_numpy=True).tolist()

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        """
        Embed a list of documents into vectors.

        Args:
            texts (list[str]): A list of input texts to embed.

        Returns:
            list[list[float]]: A list of embedding vectors for the input texts.
        """
        return self.model.encode(texts, convert_to_numpy=True).tolist()
