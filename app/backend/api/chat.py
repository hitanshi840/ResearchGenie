from fastapi import APIRouter

from app.backend.schemas.chat import (
    ChatRequest,
    ChatResponse,
    Source,
)
from app.backend.services.retrieval_service import RetrievalService
from app.backend.services.llm_service import LLMService
from app.backend.services.history_service import HistoryService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Ask questions about uploaded documents.
    """

    # Retrieve relevant chunks
    results = RetrievalService.retrieve(
        request.question,
        top_k=5,
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    # Debug (remove later)
    print("\nDistances:", distances)

    if not documents:
        return ChatResponse(
            answer="I couldn't find this information in the uploaded documents.",
            sources=[],
        )

    # Build context for the LLM
    context = "\n\n".join(documents)

    # Generate answer
    answer = LLMService.generate_answer(
        question=request.question,
        context=context,
    )

    # Save chat history
    HistoryService.add(
        question=request.question,
        answer=answer,
    )

    # Build source list
    sources = []

    for metadata, distance in zip(metadatas, distances):

        # Convert distance into a readable similarity score
        confidence = round(100 / (1 + distance), 2)

        sources.append(
            Source(
                document=metadata.get("document_name", "Unknown"),
                page=int(metadata.get("page_number", 0)),
                score=confidence,
            )
        )

    return ChatResponse(
        answer=answer,
        sources=sources,
    )