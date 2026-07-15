from uuid import uuid4
import hashlib

from fastapi import APIRouter, File, UploadFile

from app.backend.schemas.document import UploadResponse
from app.backend.services.file_service import FileService
from app.backend.services.extraction_service import ExtractionService
from app.backend.services.cleaning_service import CleaningService
from app.backend.services.chunking_service import ChunkingService
from app.backend.services.embedding_service import EmbeddingService
from app.backend.services.chroma_service import ChromaService

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/", response_model=UploadResponse)
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF, extract text page-by-page,
    clean it, split into chunks,
    generate embeddings, and store them in ChromaDB.
    """

    # Save uploaded PDF
    pdf_path = await FileService.save_pdf(file)

    # Generate document metadata
    document_id = str(uuid4())

    # Generate file hash
    with open(pdf_path, "rb") as pdf_file:
        file_hash = hashlib.sha256(pdf_file.read()).hexdigest()

    # Check for duplicate document
    if ChromaService.document_exists(file_hash):
        return UploadResponse(
            filename=file.filename,
            message="This PDF has already been uploaded.",
            pages=0,
        )

    # Extract text page-wise
    pages = ExtractionService.extract_text(pdf_path)

    # Clean extracted text
    cleaned_pages = CleaningService.clean_pages(pages)

    # Create chunks
    chunks = ChunkingService.create_chunks(
        pages=cleaned_pages,
        document_id=document_id,
        file_hash=file_hash,
    )

    # Generate embeddings
    embeddings = EmbeddingService.generate_embeddings(chunks)

    # Store in ChromaDB
    ChromaService.add_chunks(chunks, embeddings)

    total_chunks = ChromaService.count()

    print("\n" + "=" * 80)
    print(f"Document ID        : {document_id}")
    print(f"Pages              : {len(cleaned_pages)}")
    print(f"Chunks Created     : {len(chunks)}")
    print(f"Embeddings Created : {len(embeddings)}")

    if len(embeddings) > 0:
        print(f"Embedding Dimension: {len(embeddings[0])}")

    print(f"Total DB Chunks    : {total_chunks}")
    print("=" * 80)

    if chunks:
        print("\nFirst Chunk Metadata\n")
        print(chunks[0])

    return UploadResponse(
        filename=file.filename,
        message=(
            f"PDF processed successfully. "
            f"Generated {len(chunks)} chunks, "
            f"{len(embeddings)} embeddings, "
            f"stored in ChromaDB."
        ),
        pages=len(cleaned_pages),
    )