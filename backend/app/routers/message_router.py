from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.repositories.ticket_repository import TicketRepository

router = APIRouter()
TICKET_FILEPATH = "./data/awesome_tickets.json"

# get specific message from ticket's msg_id prop
@router.get("/message")
async def get_message(
  msgId: str,
  ticket_repository: TicketRepository = Depends(lambda: TicketRepository(filepath=TICKET_FILEPATH))
):
  message = ticket_repository.get_message(msgId)
  return JSONResponse(message, status_code=200)