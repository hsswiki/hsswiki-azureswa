import logging

from src.controllers.payload_models import BaseResponsePayload
from src.utils.function_app_utils import (
    log_and_get_http_response,  # noqa: F401 (imported for re-export)
    validate_request_payload,
)


def vectorize_documents_controller(request):
    logging.info("Entering")
    from src.controllers.payload_models import (
        ResponseMessage,
        VectorizeDocumentResponsePayload,
    )
    from src.services.vectorization_service import VectorizationServiceFacade

    try:
        VectorizationServiceFacade().vectorize()
        response_payload = VectorizeDocumentResponsePayload(
            code=200,
            message=ResponseMessage.SUCCESS,
        )
    except Exception as e:
        from src.utils.python_utils import get_traceback_text

        response_payload = BaseResponsePayload(
            code=500,
            message=ResponseMessage.FAILED,
            detailed_message=repr(e) + get_traceback_text(),
        )
    return response_payload


def verify_invitation_code_controller(request):
    logging.info("Entering")
    from src.controllers.payload_models import (
        ResponseMessage,
        ValidateInvitationRequestPayload,
        ValidateInvitationResponsePayload,
    )
    from src.services.invitation import verify_invitation_code

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


def respond_to_chat_controller(request):
    logging.info("Entering")
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
