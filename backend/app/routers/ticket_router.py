from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.repositories.ticket_repository import TicketRepository

router = APIRouter()
TICKET_FILEPATH = "./data/awesome_tickets.json"

@router.get("/tickets")
async def get_tickets(ticket_repository: TicketRepository = Depends(lambda: TicketRepository(filepath=TICKET_FILEPATH))):
  tickets = ticket_repository.get_tickets()
  return JSONResponse(tickets, status_code=200)

@router.delete("/tickets")
async def delete_ticket(
  ticket_id: str, 
  ticket_repository: TicketRepository = Depends(lambda: TicketRepository(filepath=TICKET_FILEPATH))
):
  data = ticket_repository.delete_ticket(ticket_id)
  return JSONResponse(data, status_code=200)