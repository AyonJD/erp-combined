import random
from passlib.hash import bcrypt
from database.connection import users_collection
from helper.helper import SMSService  # Import the SMSService class

def reset_passwords_and_send_sms(phone_numbers: list):
    """
    Reset passwords for users matching the provided phone numbers and send the new passwords via SMS.
    :param phone_numbers: List of phone numbers to search for in the database.
    :return: A dictionary containing the results of the operation.
    """
    sms_service = SMSService()  # Instantiate the SMSService
    results = {"success": [], "failed": []}

    # Query the database for users matching the provided phone numbers
    query = {
        "$or": [
            {"phone1": {"$in": phone_numbers}},
            {"phone2": {"$in": phone_numbers}}
        ]
    }
    users = users_collection.find(query)

    for user in users:
        try:
            # Generate a random 6-digit password
            plain_password = str(random.randint(100000, 999999))

            # Hash the password
            hashed_password = bcrypt.hash(plain_password)

            # Update the user's password in the database
            users_collection.update_one(
                {"_id": user["_id"]},
                {"$set": {"password": hashed_password}}
            )

            # Prepare the SMS message
            sms_message = (
                f"Dear User,\n"
                f"Your account details:\n"
                f"Member Serial Number: {user.get('member_serial_number')}\n"
                f"Email: {user.get('email')}\n"
                f"Phone 1: {user.get('phone1')}\n"
                f"Phone 2: {user.get('phone2')}\n"
                f"Your new Password is: {plain_password}\n"
                f"Please keep it safe."
            )

            # Send the SMS to the user's phone number
            phone_number = user.get("phone1") or user.get("phone2")
            sms_service.send(phone_number, sms_message)

            # Add success result
            results["success"].append({
                "user_id": str(user["_id"]),
                "phone_number": phone_number,
                "message": "Password reset and SMS sent successfully."
            })

        except Exception as e:
            # Add failure result
            results["failed"].append({
                "user_id": str(user["_id"]),
                "phone_number": user.get("phone1") or user.get("phone2"),
                "error": str(e)
            })

    return results