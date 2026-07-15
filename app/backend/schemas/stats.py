from pydantic import BaseModel


class StatsResponse(BaseModel):
    documents: int
    chunks: int
    conversations: int
    messages: int
    embedding_model: str
    llm: str