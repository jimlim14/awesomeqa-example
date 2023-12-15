import json
from typing import Optional
from typing import List

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

    def get_message(self, msgId: str) -> dict:
        message = {}
        messages = self.data["messages"]
        for message in messages:
            if message["id"] == msgId:
                message = message
                break
        return message

    def get_conversation(self, ticketId: str) -> List[dict]:
        conversation = []
        context_messages = []
        tickets = self.get_tickets()
        messages = self.data["messages"]
        for ticket in tickets:
            if ticket['id'] == ticketId:
                context_messages = ticket["context_messages"]

        for message in messages:
            if message["id"] in context_messages:
                conversation.append(message)
        return conversation