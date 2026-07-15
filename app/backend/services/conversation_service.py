from typing import List

from app.backend.schemas.conversation import Conversation


class ConversationService:
    """
    Stores conversation metadata.

    Later this can be replaced by SQLite or PostgreSQL
    without changing the API.
    """

    _conversations: List[Conversation] = []

    @classmethod
    def create(cls) -> Conversation:

        conversation = Conversation()

        cls._conversations.append(conversation)

        return conversation

    @classmethod
    def get_all(cls):

        return cls._conversations

    @classmethod
    def exists(cls, conversation_id: str):

        return any(
            c.conversation_id == conversation_id
            for c in cls._conversations
        )

    @classmethod
    def delete(cls, conversation_id: str):

        cls._conversations = [
            c
            for c in cls._conversations
            if c.conversation_id != conversation_id
        ]