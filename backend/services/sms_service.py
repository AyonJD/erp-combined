from typing import  List
from helper.helper import SMSService

# Function to send SMS to multiple phone numbers
def send_sms(phone_numbers: List[str], message: str):
    """
    Send SMS to multiple phone numbers.
    :param phone_numbers: List of phone numbers to send SMS to.
    :param message: The message to send.
    :return: None
    """
    sms_service = SMSService()  # Instantiate SMSService
    for phone_number in phone_numbers:
        sms_service.send(phone_number, message)