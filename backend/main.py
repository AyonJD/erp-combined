from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from utils.response import create_response
# Routes import
from routes.entry import entry_route
from routes.user_route import user_route
from routes.feedback_route import feedback_route
from routes.sms_route import sms_route

app = FastAPI()

# Add CORS Middleware
origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# Custom HTTPException Handler
@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content=create_response(
            status="Error",
            status_code=exc.status_code,
            message=exc.detail,
        ),
    )

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content=create_response(
            status="Error",
            status_code=500,
            message="An unexpected error occurred.",
            data={"detail": str(exc)}
        ),
    )

# Validation Error Handler
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content=create_response(
            status="Error",
            status_code=422,
            message="Validation error",
            data={"errors": exc.errors()}
        ),
    )

# Handle routes
app.include_router(entry_route)
app.include_router(user_route)
app.include_router(feedback_route)
app.include_router(sms_route)
