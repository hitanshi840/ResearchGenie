# 🤖 ResearchGenie

ResearchGenie is an AI-powered **Retrieval-Augmented Generation (RAG)** research assistant that enables users to upload PDF documents and interact with them using natural language. The system retrieves relevant document context through semantic search and generates citation-backed answers using Google Gemini.

---

## 🌐 Live Demo

**Frontend:**  
https://research-genie-three.vercel.app

**Backend API:**  
https://researchgenie.onrender.com

**Swagger Documentation:**  
https://researchgenie.onrender.com/docs

**ReDoc Documentation:**  
https://researchgenie.onrender.com/redoc

> **Note:** The backend is deployed on Render's free tier. Initial requests may experience cold starts, and occasional service restarts can occur due to free-tier memory limitations.

---

# Features

- Upload and process PDF documents
- Automatic text extraction and preprocessing
- Intelligent document chunking
- Semantic search using Sentence Transformers
- Retrieval-Augmented Generation (RAG)
- AI-powered responses using Google Gemini
- Citation-backed answers with page references
- Multi-conversation chat interface
- Document management
- Usage statistics dashboard
- Duplicate document detection
- RESTful API with FastAPI
- Interactive API documentation

---

# System Architecture

```text
                  React Frontend
                         │
                         │
                  FastAPI Backend
                         │
      ┌──────────────────┴──────────────────┐
      │                                     │
 Upload Pipeline                     Chat Pipeline
      │                                     │
PDF → Extract → Clean → Chunk → Embed → ChromaDB
                                            │
                                            │
                                    Semantic Retrieval
                                            │
                                            ▼
                                     Google Gemini
                                            │
                                            ▼
                              Answer with Source Citations
```

---

# Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React, TypeScript, Vite, Axios |
| Backend | FastAPI, Python |
| AI | Google Gemini |
| Embeddings | Sentence Transformers (all-MiniLM-L6-v2) |
| Vector Database | ChromaDB |
| PDF Processing | PyMuPDF |
| Validation | Pydantic |
| Deployment | Vercel, Render |

---

# Project Structure

```text
ResearchGenie
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── app
│   └── backend
│       ├── api
│       ├── core
│       ├── schemas
│       ├── services
│       ├── storage
│       └── main.py
│
├── data
│   ├── uploads
│   └── chroma
│
├── requirements.txt
├── README.md
└── .env
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/hitanshi840/ResearchGenie.git

cd ResearchGenie
```

## Create a virtual environment

Windows

```bash
python -m venv .venv

.venv\Scripts\activate
```

## Install backend dependencies

```bash
pip install -r requirements.txt
```

## Configure environment variables

Create a `.env` file in the project root.

```env
GOOGLE_API_KEY=your_google_api_key
GROQ_API_KEY=your_groq_api_key
```

## Run the backend

```bash
uvicorn app.backend.main:app --reload
```

Backend will be available at

```
http://127.0.0.1:8000
```

## Run the frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend will be available at

```
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/upload/` | Upload a PDF document |
| POST | `/api/v1/chat/` | Ask questions about uploaded documents |
| GET | `/api/v1/documents/` | Retrieve uploaded documents |
| DELETE | `/api/v1/documents/{document_id}` | Delete a document |
| GET | `/api/v1/history/` | Retrieve chat history |
| DELETE | `/api/v1/history/` | Clear chat history |
| POST | `/api/v1/conversations/` | Create a conversation |
| GET | `/api/v1/conversations/` | List conversations |
| DELETE | `/api/v1/conversations/{conversation_id}` | Delete a conversation |
| GET | `/api/v1/stats/` | Retrieve application statistics |

---

# Retrieval-Augmented Generation Workflow

```text
User Uploads PDF
        │
        ▼
PDF Text Extraction
        │
        ▼
Text Cleaning
        │
        ▼
Chunk Generation
        │
        ▼
Embedding Generation
        │
        ▼
Store in ChromaDB
        │
        ▼
User Query
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
Citation-backed Response
```

---

# Current Capabilities

- Multiple PDF uploads
- Semantic document search
- Citation-backed responses
- Duplicate document detection
- Multi-conversation support
- Document management
- Dashboard statistics
- FastAPI REST API
- Interactive API documentation

---

# Future Enhancements

- User authentication
- OCR support
- DOCX support
- Hybrid retrieval (BM25 + Vector Search)
- Streaming AI responses
- Redis caching
- Docker deployment
- Kubernetes deployment
- Multi-user workspaces

---

# Author

**Hitanshi**

B.Tech Computer Science Engineering (Artificial Intelligence)  
Indira Gandhi Delhi Technical University for Women (IGDTUW)

GitHub: https://github.com/hitanshi840
