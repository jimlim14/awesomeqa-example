import json
from typing import Optional


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def get_tickets(self, start: Optional[int] = None, stop: Optional[int] = None) -> list[dict]:
        return self.data["tickets"][start:stop]

    def get_ticket(self, ticketId: str) -> dict:
        ticket = {}
        tickets = self.get_tickets()
        for item in tickets:
            if item['id'] == ticketId:
                ticket = item
                break
        return ticket


    def get_messages(self) -> list[dict]:
        return self.data["messages"]