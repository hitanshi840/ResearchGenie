from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.backend.core.config import settings
from app.backend.core.exceptions import register_exception_handlers

from app.backend.api.upload import router as upload_router
from app.backend.api.chat import router as chat_router
from app.backend.api.documents import router as documents_router
from app.backend.api.history import router as history_router
from app.backend.api.conversations import router as conversations_router
from app.backend.api.stats import router as stats_router
from app.backend.core.logger import logging_middleware


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    summary="AI-powered Research Assistant using Retrieval-Augmented Generation",
    description="""
# 🤖 ResearchGenie

ResearchGenie is an AI-powered Research Assistant built using
**Retrieval-Augmented Generation (RAG)**.

It allows users to upload PDF documents and ask natural language
questions while receiving accurate answers grounded in the uploaded
documents.

---

## ✨ Features

- 📄 Upload PDF documents
- 📝 Automatic text extraction
- ✂️ Intelligent text chunking
- 🧠 Semantic search using BGE-M3 embeddings
- ⚡ Gemini 2.5 Flash Lite powered answers
- 💬 Chat with your documents
- 📚 Conversation history
- 🗂 Document management
- 📊 System statistics
- 🚫 Duplicate PDF detection
- 📍 Source citation with page numbers

---

## 🛠 Tech Stack

- FastAPI
- ChromaDB
- Sentence Transformers
- Google Gemini API
- PyMuPDF
- Python

---

## 🚀 Workflow

1. Upload PDF
2. Extract Text
3. Clean Text
4. Chunk Text
5. Generate Embeddings
6. Store in ChromaDB
7. Ask Questions
8. Retrieve Relevant Chunks
9. Generate AI Answer
10. Return Sources

---

Made with ❤️ using FastAPI & RAG.
""",
    contact={
        "name": "ResearchGenie",
        "url": "https://github.com/yourusername/ResearchGenie",
        "email": "support@researchgenie.ai",
    },
    license_info={
        "name": "MIT License",
    },
    openapi_tags=[
        {
            "name": "Upload",
            "description": "Upload and process PDF documents.",
        },
        {
            "name": "Chat",
            "description": "Ask questions about uploaded documents using RAG.",
        },
        {
            "name": "Documents",
            "description": "List and delete uploaded documents.",
        },
        {
            "name": "History",
            "description": "Retrieve and clear chat history.",
        },
        {
            "name": "Conversations",
            "description": "Create and manage conversations.",
        },
        {
            "name": "Statistics",
            "description": "View ResearchGenie usage statistics.",
        },
        {
            "name": "System",
            "description": "Application status endpoints.",
        },
    ],

    # Swagger & OpenAPI
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# Register global exception handlers
register_exception_handlers(app)

# Register logging middleware
app.middleware("http")(logging_middleware)

# -------------------------------------------------
# CORS
# -------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


API_PREFIX = "/api/v1"
# -------------------------------------------------
# API Routers
# -------------------------------------------------

app.include_router(upload_router, prefix=API_PREFIX)
app.include_router(chat_router, prefix=API_PREFIX)
app.include_router(documents_router, prefix=API_PREFIX)
app.include_router(history_router, prefix=API_PREFIX)
app.include_router(conversations_router, prefix=API_PREFIX)
app.include_router(stats_router, prefix=API_PREFIX)

# -------------------------------------------------
# System Endpoints
# -------------------------------------------------

@app.get("/", tags=["System"], summary="Welcome")
def root():
    """
    Root endpoint.
    """
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "message": "Welcome to ResearchGenie 🚀",
    }


@app.get("/health", tags=["System"], summary="Health Check")
def health():
    """
    Health check endpoint.
    """
    return {
        "status": "healthy",
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }