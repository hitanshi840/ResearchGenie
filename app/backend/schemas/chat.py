from pydantic import BaseModel
from typing import List


class ChatRequest(BaseModel):
    question: str


class Source(BaseModel):
    document: str
    page: int
    score: float


class ChatResponse(BaseModel):
    answer: str
    sources: List[Source] = []