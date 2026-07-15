from fastapi import APIRouter

from app.backend.schemas.history import HistoryResponse
from app.backend.services.history_service import HistoryService

router = APIRouter(
    prefix="/history",
    tags=["History"],
)


@router.get("/", response_model=HistoryResponse)
async def get_history():
    """
    Get all chat history.
    """

    return HistoryResponse(
        history=HistoryService.get_all()
    )


@router.delete("/")
async def clear_history():
    """
    Clear all chat history.
    """

    HistoryService.clear()

    return {
        "message": "Chat history cleared successfully."
    }