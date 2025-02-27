from app.repositories.ticket_repository import TicketRepository
import uvicorn
from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.routers import ticket_router, message_router, user_router

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ticket_router.router, tags=["tickets"])
app.include_router(message_router.router, tags=["messages"])
app.include_router(user_router.router, tags=["users"])

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
