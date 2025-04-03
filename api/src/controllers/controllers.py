import logging as log
from typing import Any

from src.components.configs import config
from src.controllers.payload_models import BaseResponsePayload
from src.services.invitation import verify_invitation_code
from src.utils.function_app_utils import (
    log_and_get_http_response,  # noqa: F401 (imported for re-export)
    validate_request_payload,
)


def vectorize_document_controller(request: Any):
    log.info("Entering")
    from src.components.vector_store import (
        chunk_and_embed_into_collection,
    )
    from src.controllers.payload_models import (
        ResponseMessage,
        VectorizeDocumentResponsePayload,
    )

    try:
        chunk_and_embed_into_collection(
            config.input_document_path,
            config.vector_store_table_name,
        )
        response_payload = VectorizeDocumentResponsePayload(
            code=200,
            message=ResponseMessage.SUCCESS,
            vector_status=ResponseMessage.SUCCESS,
        )
    except Exception as e:
        response_payload = BaseResponsePayload(
            code=500,
            message=ResponseMessage.FAILED,
            detailed_message=repr(e),
        )
    return response_payload


def verify_invitation_code_controller(request: Any):
    log.info("Entering")
    from src.controllers.payload_models import (
        ResponseMessage,
        ValidateInvitationRequestPayload,
        ValidateInvitationResponsePayload,
    )

    try:
        request_payload, validation_error_response_payload = (
            validate_request_payload(request, ValidateInvitationRequestPayload)
        )
        if validation_error_response_payload:
            return validation_error_response_payload

        response = verify_invitation_code(request_payload)

        response_payload = ValidateInvitationResponsePayload(
            code=200,
            message=ResponseMessage.SUCCESS,
            response=response,
        )
    except Exception as e:
        response_payload = BaseResponsePayload(
            code=500,
            message=ResponseMessage.FAILED,
            detailed_message=repr(e),
        )
    return response_payload


def respond_to_chat_controller(request: Any):
    log.info("Entering")
    try:
        from src.controllers.payload_models import (
            ChatRequestPayload,
            ChatResponsePayload,
            ResponseMessage,
        )
        from src.services.chat import respond_to_chat

        request_payload, validation_error_response_payload = (
            validate_request_payload(request, ChatRequestPayload)
        )
        if validation_error_response_payload:
            return validation_error_response_payload

        response = respond_to_chat(request_payload)

        response_payload = ChatResponsePayload(
            code=200,
            message=ResponseMessage.SUCCESS,
            response=response,
        )
    except Exception as e:
        response_payload = BaseResponsePayload(
            code=500,
            message=ResponseMessage.FAILED,
            detailed_message=repr(e),
        )
    return response_payload
