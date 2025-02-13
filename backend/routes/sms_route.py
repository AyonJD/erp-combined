from fastapi import APIRouter, HTTPException
from typing import List
from services.sms_service import reset_passwords_and_send_sms
from utils.response import create_response

# Define the router
sms_route = APIRouter()

@sms_route.post("/send-sms")
def reset_passwords_route(phone_numbers: List[str]):
    """
    Route to reset passwords for users matching the provided phone numbers and send the new passwords via SMS.
    :param phone_numbers: List of phone numbers to search for in the database.
    :return: A response indicating success or failure.
    """
    try:
        # Call the service function
        results = reset_passwords_and_send_sms(phone_numbers)

        return create_response(
            status="Ok",
            status_code=200,
            message="Password reset process completed.",
            data=results
        )

    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(status_code=500, detail=f"An error occurred while resetting passwords: {str(e)}")