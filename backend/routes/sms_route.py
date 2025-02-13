from fastapi import APIRouter, HTTPException
from typing import List
from services.sms_service import send_sms
from utils.response import create_response

# Define the router
sms_route = APIRouter()

@sms_route.post("/send-sms")
def send_sms_route(phone_numbers: List[str], message: str):
    """
    Route to send SMS messages to multiple phone numbers.
    :param phone_numbers: List of phone numbers to send SMS to.
    :param message: The message to send.
    :return: A response indicating success or failure.
    """
    try:
        # Call the send_sms function
        send_sms(phone_numbers, message)

        # Return a success response
        return create_response(
            status="Ok",
            status_code=200,
            message="SMS sent successfully to all recipients.",
            data={"recipients": phone_numbers}
        )

    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(status_code=500, detail=f"An error occurred while sending SMS: {str(e)}")