from pydantic import BaseModel


class DocumentInfo(BaseModel):
    document_id: str
    document_name: str
    pages: int
    chunks: int