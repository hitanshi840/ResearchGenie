from pydantic import BaseModel


class DeleteDocumentResponse(BaseModel):
    message: str