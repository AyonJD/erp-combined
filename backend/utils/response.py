from fastapi.responses import JSONResponse

def create_response(status: str, status_code: int, message: str, data: dict = None):
    """
    Utility function to create a standardized JSON response.
    :param status: The status of the response (e.g., "Ok", "Error").
    :param status_code: The HTTP status code.
    :param message: A descriptive message.
    :param data: Optional data to include in the response.
    :return: A JSONResponse object.
    """
    response_content = {
        "status": status,
        "status_code": status_code,
        "message": message,
        "data": data or None
    }
    return JSONResponse(content=response_content, status_code=status_code)