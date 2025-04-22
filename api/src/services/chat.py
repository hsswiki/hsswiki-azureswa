import logging as log

from src.components.deprecated_lite_llm import (
    get_litellm,
)
from src.components.deprecated_vector_store import (
    get_chromadb_client,
    query_relevant_chunks,
)
from src.controllers.payload_models import ChatRequestPayload
from src.services.invitation import verify_invitation_code
from src.settings.app_settings import VectorStoreClass, app_settings


def respond_to_chat(request_payload: ChatRequestPayload) -> str:
    log.info("Entering")

    verification_result = verify_invitation_code(request_payload)
    if verification_result != "OK":
        return verification_result

    if app_settings.do_debug:
        return "hello"

    collection = ""
    if app_settings.vector_store_cla == VectorStoreClass.CHROMA_DB:
        chromadb_client = get_chromadb_client()
        collection = chromadb_client.get_collection(
            name=app_settings.vector_store_table_name
        )
    relevant_chunks = query_relevant_chunks(
        request_payload.input_message,
        app_settings.number_of_chunks,
        collection,
    )
    prompt = f"""
        You are an assistant for a software engineer named Shen Han (姓韩, 可以
        叫我韩先生). Your role is to answer questions from potential employers
        about Shen's background. Use the extracted chunks of information
        relevant to the question to craft your response.

        You will also be provided with the latest chat history with the user.
        Take that into consideration when crafting your response to ensure
        continuity and relevance.

        If the user asks something irrelevant or you cannot find useful chunks
        to answer the question, gently say you don't know based on your
        knowledge of Shen, suggest the user directly reach out to Shen, and
        bring the topic back to professional matters. Offer some potential
        questions that you can answer based on the chunks.

        Do not make up information, as this is a professional chat with a
        potential employer. Just do your best based on the chunks provided.

        Always respond in the same language as the input question, translating
        the information if necessary. Keep your responses concise,
        professional, and limited to a few sentences to ensure quick and easy
        communication. Output only the response text without any additional
        formatting or explanation.

        ## Input question:

        {request_payload.input_message}

        ## Chat history:

        {request_payload.chat_history}

        ## Relevant chunks:

        {relevant_chunks}
    """
    llm = get_litellm()
    response = llm.complete(prompt)

    log.info(f"{response=}")
    return response
