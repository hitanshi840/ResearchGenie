from uuid import uuid4

from pydantic import BaseModel, Field


class Conversation(BaseModel):
    conversation_id: str = Field(
        default_factory=lambda: str(uuid4())
    )
    title: str = "New Conversation"


class ConversationResponse(BaseModel):
    conversation_id: str
    title: str


class DeleteConversationResponse(BaseModel):
    message: str