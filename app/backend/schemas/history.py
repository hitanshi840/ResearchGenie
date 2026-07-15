from datetime import datetime

from pydantic import BaseModel


class HistoryItem(BaseModel):
    question: str
    answer: str
    timestamp: datetime


class HistoryResponse(BaseModel):
    history: list[HistoryItem]