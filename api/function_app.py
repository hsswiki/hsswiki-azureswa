import json
import logging
import os

import azure.functions as func

try:
    from src.utils.logging_utils import format_root_logger

    format_root_logger(
        log_level=logging.INFO,
        # do_file_handler=bool(os.environ.get("IS_LOCAL")),
    )
except Exception as e:
    logging.error(repr(e))

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)
# It seems all 3 auth levels are the same. The API can always be accessed
# publicly without any header.


@app.route(route="documents/vectorize", methods=["GET"])
def vectorize_document_route(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Entering")
    try:
        from src.controllers.controllers import (
            log_and_get_http_response,
            vectorize_documents_controller,
        )

        response_payload = vectorize_documents_controller(req)
        return log_and_get_http_response(response_payload)
    except Exception as e:
        return get_uncaught_error_response(e)


@app.route(route="invitations/verify", methods=["POST"])
def verify_invitation_code_route(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Entering")
    try:
        from src.controllers.controllers import (
            log_and_get_http_response,
            verify_invitation_code_controller,
        )

        response_payload = verify_invitation_code_controller(req)
        return log_and_get_http_response(response_payload)
    except Exception as e:
        return get_uncaught_error_response(e)


@app.route(route="chat/respond", methods=["POST"])
def respond_to_chat_route(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Entering")
    try:
        from src.controllers.controllers import (
            log_and_get_http_response,
            respond_to_chat_controller,
        )

        response_payload = respond_to_chat_controller(req)
        return log_and_get_http_response(response_payload)
    except Exception as e:
        return get_uncaught_error_response(e)


@app.route(route="ping")
async def ping(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Entering")
    try:
        req.get_json()  # Returns loaded JSON like dict, etc.
    except ValueError:
        return func.HttpResponse("Pong", status_code=200)
    return func.HttpResponse(req.get_body(), status_code=200)


# Test


@app.route(route="testAuthLevelAnonymous", auth_level=func.AuthLevel.ANONYMOUS)
async def testAuthLevelAnonymous(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Entering")
    try:
        req.get_json()  # Returns loaded JSON like dict, etc.
    except ValueError:
        return func.HttpResponse("Pong", status_code=200)
    return func.HttpResponse(req.get_body(), status_code=200)


@app.route(route="testAuthLevelFunction", auth_level=func.AuthLevel.FUNCTION)
async def testAuthLevelFunction(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Entering")
    try:
        req.get_json()  # Returns loaded JSON like dict, etc.
    except ValueError:
        return func.HttpResponse("Pong", status_code=200)
    return func.HttpResponse(req.get_body(), status_code=200)


@app.route(route="testAuthLevelAdmin", auth_level=func.AuthLevel.ADMIN)
async def testAuthLevelAdmin(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Entering")
    try:
        req.get_json()  # Returns loaded JSON like dict, etc.
    except ValueError:
        return func.HttpResponse("Pong", status_code=200)
    return func.HttpResponse(req.get_body(), status_code=200)


###############################################################################
#  Helpers
###############################################################################


def get_uncaught_error_response_payload(exception: Exception):
    from src.utils.python_utils import get_traceback_text

    response_payload = {
        "code": 500,
        "message": "An uncaught error occurred. Please check the log.",
        "detailedMessage": f"{repr(exception)}: {get_traceback_text()}",
    }
    logging.error(f"{response_payload=}")
    return response_payload


def get_uncaught_error_response(exception: Exception):
    response_payload = get_uncaught_error_response_payload(exception)
    return func.HttpResponse(json.dumps(response_payload), status_code=500)
