from enum import Enum
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

from src.utils.python_utils import get_traceback_text


class BasePayloadModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class ResponseMessage(str, Enum):
    SUCCESS = "Success"
    FAILED = "Failed"
    IN_PROGRESS = "InProgress"


# Create a type alias for the ResponseMessage literals
ResponseMessageType = Literal["Success", "Failed", "InProgress"]


class BaseResponsePayload(BasePayloadModel):
    code: int
    message: ResponseMessageType
    detailed_message: Optional[str] = None


def get_500_response_payload(exception: Exception):
    return BaseResponsePayload(
        code=500,
        message=ResponseMessage.FAILED,
        detailed_message=f"{repr(exception)} {get_traceback_text()}",
    )


class ModelWithInvitationCode(BasePayloadModel):
    invitation_code: str


class ModelWithResponse(BasePayloadModel):
    response: str


class VectorizeDocumentRequestPayload(BasePayloadModel):
    pass


class VectorizeDocumentResponsePayload(BaseResponsePayload):
    pass


class ValidateInvitationRequestPayload(
    ModelWithInvitationCode, BasePayloadModel
):
    pass


class ValidateInvitationResponsePayload(
    ModelWithResponse, BaseResponsePayload
):
    pass


class ChatRequestPayload(ModelWithInvitationCode, BasePayloadModel):
    input_message: str
    chat_history: str


class ChatResponsePayload(ModelWithResponse, BaseResponsePayload):
    quotations: list = []
