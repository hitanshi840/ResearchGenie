from typing import Dict

from app.backend.services.chroma_service import ChromaService
from app.backend.services.embedding_service import EmbeddingService


class RetrievalService:
    """
    Service responsible for retrieving the most relevant
    document chunks from ChromaDB.
    """

    @staticmethod
    def retrieve(query: str, top_k: int = 5) -> Dict:
        """
        Retrieve the most relevant chunks for a user query.
        """

        if not query.strip():
            raise ValueError("Query cannot be empty.")

        # Generate embedding for the user's question
        query_embedding = EmbeddingService.generate_query_embedding(query)

        # Search ChromaDB
        results = ChromaService.search(
            embedding=query_embedding,
            top_k=top_k,
        )

        return results