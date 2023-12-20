from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.repositories.ticket_repository import TicketRepository

router = APIRouter()
TICKET_FILEPATH = "./data/awesome_tickets.json"

@router.get("/user")
async def get_user(
  user_id: str,
  ticket_repository: TicketRepository = Depends(lambda: TicketRepository(filepath=TICKET_FILEPATH))
):
  user = ticket_repository.get_user(user_id)
  return user