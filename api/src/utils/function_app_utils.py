import logging as log
from os import getenv
from typing import (  # Added Union for compatibility with Python 3.9
    Any,
    Optional,
    Type,
    TypeVar,
    Union,
)

import azure.functions as func
from pydantic import BaseModel, ValidationError

from src.controllers.payload_models import BaseResponsePayload, ResponseMessage

T = TypeVar("T", bound=BaseModel)


def validate_request_payload(
    original_request: Union[
        func.HttpRequest, dict[str, Any]
    ],  # Updated for Python 3.9 compatibility
    request_payload_model: Type[T],
) -> tuple[T, Optional[BaseResponsePayload]]:
    try:
        if isinstance(original_request, func.HttpRequest):
            log.info(f"{original_request.get_body()=}")
            request_payload: dict = original_request.get_json()
        else:
            request_payload = original_request
        log.info(f"{request_payload=}")

        model = request_payload_model(**request_payload)
        return model, None

    except ValidationError as e:
        log.error(repr(e))
        validation_error_response_payload = BaseResponsePayload(
            code="400",
            message=ResponseMessage.FAILED,
            detailed_message=repr(e),
        )
        return request_payload_model(), validation_error_response_payload


def log_and_get_http_response(
    response_payload: BaseResponsePayload,
) -> func.HttpResponse:
    status_code = int(response_payload.code)
    if 200 <= status_code < 300:
        log.info(f"{response_payload=}")
    elif 400 <= status_code < 500:
        log.warning(f"{response_payload=}")
    elif status_code >= 500:
        log.error(f"{response_payload=}")
    else:
        log.error(f"Uncaught {status_code=} {response_payload=}")
    response_json = response_payload.model_dump_json(by_alias=True)
    return func.HttpResponse(response_json, status_code=status_code)


def get_is_in_function_app():
    is_in_function_app = getenv("PYDEVD_DISABLE_FILE_VALIDATION") is not None
    log.info(f"{is_in_function_app=}")
    return is_in_function_app
