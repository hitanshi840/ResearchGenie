from uuid import uuid4
from typing import List, Dict

from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.backend.core.config import settings


class ChunkingService:
    """
    Service responsible for splitting cleaned pages into chunks
    while preserving metadata required for retrieval and citations.
    """

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            "",
        ],
    )

    @classmethod
    def create_chunks(
        cls,
        pages: List[Dict],
        document_id: str,
        file_hash: str,
    ) -> List[Dict]:
        """
        Split cleaned pages into chunks while preserving metadata.
        """

        chunks = []

        for page in pages:

            split_chunks = cls.text_splitter.split_text(page["text"])

            for index, chunk in enumerate(split_chunks):

                chunks.append(
                    {
                        "document_id": document_id,
                        "document_name": page["document_name"],
                        "page_number": page["page_number"],
                        "chunk_id": str(uuid4()),
                        "chunk_index": index,
                        "section_title": "",
                        "source_type": "pdf",
                        "file_hash": file_hash,
                        "text": chunk,
                    }
                )

        return chunks