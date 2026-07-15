from fastapi import APIRouter, HTTPException

from app.backend.schemas.conversation import (
    ConversationResponse,
    DeleteConversationResponse,
)
from app.backend.services.conversation_service import ConversationService

router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"],
)


@router.post("/", response_model=ConversationResponse)
async def create_conversation():
    """
    Create a new conversation.
    """

    conversation = ConversationService.create()

    return ConversationResponse(
        conversation_id=conversation.conversation_id,
        title=conversation.title,
    )


@router.get("/", response_model=list[ConversationResponse])
async def list_conversations():
    """
    List all conversations.
    """

    conversations = ConversationService.get_all()

    return [
        ConversationResponse(
            conversation_id=c.conversation_id,
            title=c.title,
        )
        for c in conversations
    ]


@router.delete(
    "/{conversation_id}",
    response_model=DeleteConversationResponse,
)
async def delete_conversation(conversation_id: str):
    """
    Delete a conversation.
    """

    if not ConversationService.exists(conversation_id):
        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    ConversationService.delete(conversation_id)

    return DeleteConversationResponse(
        message="Conversation deleted successfully."
    )