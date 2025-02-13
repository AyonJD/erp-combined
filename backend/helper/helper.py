import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class SMSService:
    def __init__(self):
        self.apiKey = os.getenv("SMS_API_KEY")  # Load API key from environment variables
        self.sender_id = os.getenv("SMS_SENDER_ID")  # Load sender ID from environment variables

        if not self.apiKey or not self.sender_id:
            raise ValueError("SMS_API_KEY or SMS_SENDER_ID is not set in the environment variables.")

    def send(self, phone_number: str, message: str):
        """
        Send an SMS to a single phone number.
        :param phone_number: The recipient's phone number.
        :param message: The message to send.
        """
        post_url = f"http://bulksmsbd.net/api/smsapi?api_key={self.apiKey}&type=text&number={phone_number}&senderid={self.sender_id}&message={message}"
        
        try:
            response = requests.post(post_url)
            print(f"SMS sent to {phone_number}. Response: {response.text}")
        except Exception as e:
            print(f"Failed to send SMS to {phone_number}. Error: {str(e)}")