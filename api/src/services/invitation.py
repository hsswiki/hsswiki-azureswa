import logging as log
from typing import Literal

from src.components.configs import config
from src.controllers.payload_models import ModelWithInvitationCode


def verify_invitation_code(
    request_payload: ModelWithInvitationCode,
) -> str:
    log.info("Entering")
    config.reload_environment_variables()
    invitation_codes = config.get_invitation_codes()
    log.info(f"{request_payload=} {invitation_codes=}")

    if request_payload.invitation_code not in invitation_codes:
        return "INVALID_INVITATION_CODE"
    return "OK"
