import logging as log

from src.controllers.payload_models import ModelWithInvitationCode
from src.settings.app_settings import app_settings


def verify_invitation_code(
    request_payload: ModelWithInvitationCode,
) -> str:
    log.info("Entering")
    app_settings.reload_environment_variables()
    invitation_codes = app_settings.get_invitation_codes()
    log.info(f"{request_payload=} {invitation_codes=}")

    if request_payload.invitation_code not in invitation_codes:
        return "INVALID_INVITATION_CODE"
    return "OK"
