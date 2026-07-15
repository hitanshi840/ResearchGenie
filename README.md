# 🤖 ResearchGenie

An AI-powered Research Assistant built using **Retrieval-Augmented Generation (RAG)** that allows users to upload PDF documents and ask natural language questions while receiving context-aware answers grounded in the uploaded documents.

---

## 🚀 Features

- 📄 Upload PDF documents
- 🧹 Automatic text extraction & cleaning
- ✂️ Intelligent text chunking
- 🧠 Semantic search using BGE-M3 embeddings
- 🤖 AI-powered answers using Google Gemini
- 📚 Retrieval-Augmented Generation (RAG)
- 📍 Source citations with page numbers
- 💬 Conversation history
- 🗂 Document management
- 📊 Usage statistics
- 🚫 Duplicate PDF detection
- ⚡ FastAPI REST API
- 📖 Interactive Swagger & ReDoc documentation

---

# 🏗 Architecture

```
                 +----------------+
                 |     Client     |
                 +-------+--------+
                         |
                         |
                  FastAPI Backend
                         |
        +----------------+----------------+
        |                                 |
        |                                 |
   Upload Pipeline                 Chat Pipeline
        |                                 |
        |                                 |
 PDF → Extract → Clean → Chunk → Embed → ChromaDB
                                         |
                                         |
                                  Semantic Search
                                         |
                                         |
                                   Google Gemini
                                         |
                                         |
                                   Final Response
```

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| FastAPI | Backend API |
| ChromaDB | Vector Database |
| Sentence Transformers | Embeddings |
| BGE-M3 | Embedding Model |
| Google Gemini | Large Language Model |
| PyMuPDF | PDF Extraction |
| Pydantic | Validation |
| Python | Programming Language |

---

# 📂 Project Structure

```
ResearchGenie
│
├── app
│   ├── backend
│   │   ├── api
│   │   ├── core
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   │
│   └── storage
│
├── uploaded_files
├── chroma_db
├── requirements.txt
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/researchgenie.git

cd researchgenie
```

---

## Create Virtual Environment

Windows

```bash
python -m venv .venv
```

Activate

```bash
.venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file

```
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

## Run Server

```bash
python -m uvicorn app.backend.main:app --reload
```

---

# 📖 API Documentation

Swagger UI

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

# 📌 API Endpoints

## Upload

```
POST /upload/
```

Upload a PDF document.

---

## Chat

```
POST /chat/
```

Ask questions about uploaded documents.

---

## Documents

```
GET /documents/
DELETE /documents/{document_id}
```

Manage uploaded documents.

---

## History

```
GET /history/
DELETE /history/
```

Retrieve and clear chat history.

---

## Conversations

```
POST /conversations/
GET /conversations/
DELETE /conversations/{conversation_id}
```

Manage conversations.

---

## Statistics

```
GET /stats/
```

Retrieve application statistics.

---

# 🔄 RAG Workflow

```
User Uploads PDF
        │
        ▼
Text Extraction
        │
        ▼
Cleaning
        │
        ▼
Chunking
        │
        ▼
Embedding Generation
        │
        ▼
Store in ChromaDB
        │
        ▼
User asks Question
        │
        ▼
Semantic Retrieval
        │
        ▼
Relevant Context
        │
        ▼
Google Gemini
        │
        ▼
Answer + Sources
```

---

# ✨ Current Features

- Upload multiple PDF documents
- Duplicate detection
- Intelligent retrieval
- Source citation
- Conversation history
- Document deletion
- Statistics dashboard
- OpenAPI documentation
- Fast semantic search

---

# 🔮 Future Improvements

- Authentication
- User accounts
- Streaming AI responses
- OCR support
- DOCX support
- Multi-user workspace
- Hybrid Search (BM25 + Vector Search)
- Redis caching
- Docker deployment
- Kubernetes deployment

---

# 👨‍💻 Author

**Hitanshi**

Built as an end-to-end AI Research Assistant using FastAPI, ChromaDB, Google Gemini, and Retrieval-Augmented Generation (RAG).

---

# ⭐ If you like this project

Please consider giving it a ⭐ on GitHub.
