from typing import List

from fastapi import APIRouter, HTTPException

from app.backend.schemas.document_list import DocumentInfo
from app.backend.schemas.delete_document import DeleteDocumentResponse
from app.backend.services.chroma_service import ChromaService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


# ==========================================================
# List Documents
# ==========================================================

@router.get("/", response_model=List[DocumentInfo])
async def list_documents():
    """
    Return all uploaded documents.
    """

    return ChromaService.get_documents()


# ==========================================================
# Dashboard Statistics
# ==========================================================

@router.get("/statistics")
async def get_statistics():
    """
    Return dashboard statistics.
    """

    return ChromaService.get_statistics()


# ==========================================================
# Delete Document
# ==========================================================

@router.delete(
    "/{document_id}",
    response_model=DeleteDocumentResponse,
)
async def delete_document(document_id: str):
    """
    Delete a document and all of its chunks
    from ChromaDB.
    """

    deleted = ChromaService.delete_document(
        document_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    return DeleteDocumentResponse(
        message="Document deleted successfully."
    )