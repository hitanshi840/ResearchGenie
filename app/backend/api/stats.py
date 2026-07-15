from fastapi import APIRouter

from app.backend.schemas.stats import StatsResponse
from app.backend.services.chroma_service import ChromaService
from app.backend.services.history_service import HistoryService
from app.backend.services.conversation_service import ConversationService
from app.backend.core.config import settings

router = APIRouter(
    prefix="/stats",
    tags=["Statistics"],
)


@router.get("/", response_model=StatsResponse)
def get_stats():

    documents = ChromaService.list_documents()

    return StatsResponse(
        documents=len(documents),
        chunks=ChromaService.count(),
        conversations=len(
            ConversationService.list_conversations()
        ),
        messages=len(
            HistoryService.get_history()
        ),
        embedding_model=settings.EMBEDDING_MODEL,
        llm=settings.LLM_MODEL,
    )