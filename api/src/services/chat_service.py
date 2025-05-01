import logging
from typing import TYPE_CHECKING

from src.components.factory_helper import (
    FactoryType,
    get_factory_from_settings,
)
from src.controllers.payload_models import ChatRequestPayload
from src.services.invitation import verify_invitation_code
from src.settings.app_settings import app_settings

if TYPE_CHECKING:
    from src.components.chat_models.factories.chat_model_abstract_factory import (
        ChatModelAbstractFactory,
    )
    from src.components.embedding_models.factories.embedding_model_abstract_factory import (
        EmbeddingModelAbstractFactory,
    )
    from src.components.vector_stores.factories.vector_store_abstract_factory import (
        VectorStoreAbstractFactory,
    )


class ChatServiceFacade:
    def __init__(self):
        self.app_settings = app_settings.reload_environment_variables()

        ChatModelFactory: type[ChatModelAbstractFactory] = (
            get_factory_from_settings(FactoryType.CHAT_MODEL)
        )
        self.chat_model = ChatModelFactory().create()

        EmbeddingModelFactory: type[EmbeddingModelAbstractFactory] = (
            get_factory_from_settings(FactoryType.EMBEDDING_MODEL)
        )
        self.embedding_model = EmbeddingModelFactory().create()

        VectorStoreFactory: type[VectorStoreAbstractFactory] = (
            get_factory_from_settings(FactoryType.VECTOR_STORE)
        )
        self.vector_store = VectorStoreFactory().create()

    def respond(self, request_payload: ChatRequestPayload):
        logging.info("Entering")

        verification_result = verify_invitation_code(request_payload)
        if verification_result != "OK":
            return verification_result

        embedding = self.embedding_model.embed_query(
            request_payload.input_message
        )
        relevant_documents = self.vector_store.similarity_search_by_vector(
            embedding
        )
        logging.info(f"{len(relevant_documents)=}")
        relevant_chunks = [doc.page_content for doc in relevant_documents]

        prompt = PROMPT_TEMPLATE.format(
            input_question=request_payload.input_message,
            chat_history=request_payload.chat_history,
            relevant_chunks=relevant_chunks,
        )
        logging.debug(f"{prompt=}")

        response = self.chat_model.invoke_string_output(prompt)
        logging.info(f"{response=}")

        return response


PROMPT_TEMPLATE = """
    You are an assistant for a software engineer named Shen Han (韩绅 in
    Chinese, 韓紳 in Japanese). Your role is to answer questions from potential
    employers about Shen's background. Use the extracted chunks of information
    relevant to the question to craft your response.

    You will also be provided with the latest chat history with the user. Take
    that into consideration when crafting your response to ensure continuity
    and relevance.

    If the user asks something irrelevant to Shen or you cannot find useful
    chunks to answer the question, gently say you don't know based on your
    knowledge, suggest the user directly reach out to Shen, and bring the topic
    back to professional matters. Offer some potential questions that you can
    answer based on the chunks. Do not make up information, as this is a
    professional chat with a potential employer. Just do your best based on the
    chunks provided.

    Always respond in the same language as the input question, translating the
    information if necessary. Keep your responses concise, professional, and
    limited to a few sentences to ensure quick and easy communication. Output
    only the response text without any additional formatting or explanation.

    ## Chat history:

    {chat_history}

    ## Relevant chunks:

    {relevant_chunks}

    ## Input question:

    {input_question}
"""
