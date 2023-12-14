from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.repositories.ticket_repository import TicketRepository

router = APIRouter()
TICKET_FILEPATH = "./data/awesome_tickets.json"

@router.get("/tickets/")
async def get_tickets(
  start: int, 
  stop: int, 
  ticket_repository: TicketRepository = Depends(lambda: TicketRepository(filepath=TICKET_FILEPATH))
):
  tickets = ticket_repository.get_tickets(start, stop)
  return JSONResponse(tickets, status_code=200)

@router.get("/tickets")
async def get_ticket(
  ticketId: str, 
  ticket_repository: TicketRepository = Depends(lambda: TicketRepository(filepath=TICKET_FILEPATH))
):
  print(ticketId)
  ticket = ticket_repository.get_ticket(ticketId)
  return JSONResponse(ticket, status_code=200)