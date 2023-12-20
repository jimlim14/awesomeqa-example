import json
from typing import Optional
from typing import List

class TicketRepository:
    def __init__(self, filepath: str):
        self.filepath = filepath
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def get_tickets(self, start: Optional[int] = None, stop: Optional[int] = None) -> list[dict]:
        return self.data["tickets"][start:stop]

    def delete_ticket(self, ticket_id: str) -> List[dict]:
        updated_tickets = [ticket for ticket in self.data["tickets"] if ticket["id"] != ticket_id]
        self.data["tickets"] = updated_tickets
        self._save_changes()
        return self.data["tickets"]

    def _save_changes(self):
        with open(self.filepath, 'w') as json_file:
            json.dump(self.data, json_file, indent=2)

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

    def get_users(self) -> dict:
        users = {}
        messages = self.data["messages"]
        for message in messages:
            if message["author_id"] not in users:
                users[message["author_id"]] = message["author"]
        return users

    def get_user(self, user_id: str) -> dict:
        users = self.get_users()
        return users[user_id]