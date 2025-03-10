import jwt
import datetime
from typing import Dict
from bson import ObjectId
from database.connection import users_collection
from passlib.hash import bcrypt
from dotenv import load_dotenv
import os
import re

# Load environment variables from .env file
load_dotenv()

# Secret key for JWT
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY is not set in the environment variables.")

# Function to create a new user
def create_user(user_data: Dict) -> Dict:
    # Validate required fields
    required_fields = [
        "member_serial_number", 
        "name", 
        "designation", 
        "department", 
        "email", 
        "phone1", 
        # "address", 
        # "password"
    ]
    for field in required_fields:
        if field not in user_data or not user_data[field]:
            raise ValueError(f"Missing or empty required field: {field}")

    # Check if the user already exists by email
    if users_collection.find_one({"email": user_data["email"]}):
        raise ValueError("A user with this email already exists.")

    # Hash the password
    # user_data["password"] = bcrypt.hash(user_data["password"])

    # Add createdAt timestamp
    user_data["createdAt"] = datetime.datetime.now().isoformat()

    # Insert the user into the database
    response = users_collection.insert_one(user_data)

    # Generate JWT access token
    payload = {
        "user_id": str(response.inserted_id),
        "email": user_data["email"],
        "designation": user_data["designation"],  # Use 'designation' instead of 'role'
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token expires in 24 hours
    }
    access_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    # Return the access token and designation
    return {
        "access_token": access_token,
        "designation": user_data["designation"]  # Return 'designation' instead of 'role'
    }


# Function to login a user
def login_user(credentials: Dict) -> Dict:
    """
    Authenticate a user based on a generic identifier (member_serial_number, email, phone1, or phone2) and password.
    :param credentials: A dictionary containing an 'identifier' field and 'password'.
    :return: A dictionary containing the access token and designation.
    """
    # Extract identifier and password from credentials
    identifier = credentials.get("identifier")
    password = credentials.get("password")

    if not identifier:
        raise ValueError("Identifier is required.")
    if not password:
        raise ValueError("Password is required.")

    # Determine which field the identifier corresponds to
    query = {}
    if re.match(r"^\d+$", str(identifier)):  # Check if identifier is numeric (member_serial_number or phone)
        if len(str(identifier)) <= 6:  # Assuming member_serial_number is a short numeric value
            query["member_serial_number"] = int(identifier)
        else:  # Assume it's a phone number
            query["$or"] = [{"phone1": identifier}, {"phone2": identifier}]
    elif re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", identifier):  # Check if identifier is an email
        query["email"] = identifier
    else:
        raise ValueError("Invalid identifier format.")

    # Query the database based on the constructed query
    user = users_collection.find_one(query)
    if not user:
        raise ValueError("Invalid credentials.")

    # Verify the password
    if not bcrypt.verify(password, user["password"]):
        raise ValueError("Invalid credentials.")

    # Generate JWT access token
    payload = {
        "user_id": str(user["_id"]),
        "email": user.get("email"),  # Include email if available
        "designation": user["designation"],  # Include designation in the token
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token expires in 24 hours
    }
    access_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    # Return the access token and designation
    return {
        "access_token": access_token,
        "designation": user["designation"]
    }


def get_logged_in_user(token: str) -> Dict:
    """
    Fetch the logged-in user's details using their JWT token.
    :param token: The JWT token provided by the user.
    :return: A dictionary containing the user's details.
    """
    try:
        
        # Decode the JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        
        # Extract the user_id from the token payload
        user_id = payload.get("user_id")
        if not user_id:
            raise ValueError("Invalid token: Missing user_id.")
        
        # Query the database for the user
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise ValueError("User not found.")
        
        # Exclude sensitive fields like password
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
        user.pop("password", None)  # Remove the hashed password
        
        return user
    
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired.")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token.")
    

