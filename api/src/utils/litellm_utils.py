"""

```python
EMBEDDING_MODEL_NAME = "azure.text-embedding-ada-002"
COMPLETION_MODEL_NAME = "azure.gpt-4o-mini"

llm = LiteLlm(
    embedding_model_name=EMBEDDING_MODEL_NAME,
    completion_model_name=COMPLETION_MODEL_NAME,
)
```
"""

import logging as log
from typing import Any, Optional

import litellm
from litellm import aembedding, completion, embedding
from litellm.utils import token_counter


class LiteLlm:
    def __init__(
        self,
        api_key: str,
        api_base: str,
        embedding_model_name=None,
        completion_model_name=None,
        completion_model_kwargs: Optional[dict[str, Any]] = None,
    ):
        litellm.suppress_debug_info = True
        litellm.api_key = api_key
        litellm.api_base = api_base
        self.embedding_model_name = embedding_model_name
        self.completion_model_name = completion_model_name
        self.completion_model_kwargs = (
            completion_model_kwargs if completion_model_kwargs else {}
        )

    def embed(self, text: str) -> list[float]:
        embedding_response = embedding(
            model=f"openai/{self.embedding_model_name}",
            input=[text],
        )
        embedding_result = embedding_response["data"][0]["embedding"]
        return embedding_result

    async def async_embed(self, text: str):
        """
        Doc: https://docs.litellm.ai/docs/embedding/async_embedding

        Example usage:

        ```python
        chunks = ['a', 'b']

        async def embedding_worker(chunk, correlation_id):
            # log_correlation_id_context_var.set(correlation_id)
            embedding = await llm.async_embed(chunk)
            return embedding


        async def gather_main_coroutine_results():
            worker_args = [(chunk, f'embed_chunk{i}/{len(chunks)}')
                        for i, chunk in enumerate(chunks, start=1)]
            futures = [embedding_worker(*args) for args in worker_args]
            results: list = await asyncio.gather(
                *futures,
                return_exceptions=True,  # If raise, return Exception.
            )
            return results

        embedding_responses = asyncio.run(gather_main_coroutine_results())
        embeddings = [v['data'][0]['embedding'] for v in embedding_responses]
        ```
        """
        async_response = await aembedding(
            model=f"openai/{self.embedding_model_name}",
            input=[text],
        )
        return async_response

    def complete(self, text: str) -> str:
        messages = [{"role": "user", "content": text}]
        log.info(f"prompt {text[:300]=}")
        log.debug(f"prompt whole {messages=}")
        response = completion(
            model=f"openai/{self.completion_model_name}",
            messages=messages,
            **self.completion_model_kwargs,
        )
        llm_response_text = response.choices[0].message.content  # type: ignore
        log.info(f"{llm_response_text=}")
        if not isinstance(llm_response_text, str):
            raise ValueError(
                f"Not string {type(llm_response_text)=} {llm_response_text=}"
            )
        return llm_response_text

    def count_token(self, text: str) -> int:
        token_count = token_counter(
            model=f"openai/{self.embedding_model_name}",
            messages=[{"role": "user", "content": text}],
        )
        log.info(f"{text[:10]=} {token_count=}")
        return token_count


from langchain_core.embeddings import Embeddings


class LiteLlmEmbeddings(Embeddings):
    """
    LiteLLM embedding under LangChain Embeddings interface.
    """

    def __init__(self, model: str = "openai/azure.text-embedding-ada-002"):
        self.model = model

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        litellm_embedding_response = embedding(
            model=self.model,
            input=["text"],
        )
        embeddings: list[list[float]] = [
            data["embedding"] for data in litellm_embedding_response.data
        ]
        return embeddings

    def embed_query(self, text) -> list[float]:
        return self.embed_documents([text])[0]
