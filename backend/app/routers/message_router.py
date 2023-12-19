from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.repositories.ticket_repository import TicketRepository

router = APIRouter()
TICKET_FILEPATH = "./data/awesome_tickets.json"

# get specific message from ticket's msg_id prop
@router.get("/message")
async def get_message(
  msg_id: str,
  ticket_repository: TicketRepository = Depends(lambda: TicketRepository(filepath=TICKET_FILEPATH))
):
  message = ticket_repository.get_message(msg_id)
  return JSONResponse(message, status_code=200)

# get conversation from ticket's context_messages using ticket's id
@router.get("/messages")
async def get_conversation(
  ticket_id: str, 
  ticket_repository: TicketRepository = Depends(lambda: TicketRepository(filepath=TICKET_FILEPATH))
):
  messages = ticket_repository.get_conversation(ticket_id)
  return JSONResponse(messages, status_code=200)