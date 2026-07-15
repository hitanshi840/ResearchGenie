import os

import chromadb

from app.backend.core.config import settings


class ChromaService:
    """
    Handles storing and retrieving document chunks
    from the Chroma vector database.
    """

    _client = chromadb.PersistentClient(
        path=settings.CHROMA_DB_DIR
    )

    _collection = _client.get_or_create_collection(
        name="research_documents"
    )

    # ==========================================================
    # Add Chunks
    # ==========================================================

    @classmethod
    def add_chunks(cls, chunks, embeddings):
        """
        Store document chunks and embeddings in ChromaDB.
        """

        ids = []
        documents = []
        metadatas = []
        vectors = []

        for chunk, embedding in zip(chunks, embeddings):

            ids.append(chunk["chunk_id"])
            documents.append(chunk["text"])
            vectors.append(embedding.tolist())

            metadata = {}

            # Chroma only accepts primitive metadata types
            for key, value in chunk.items():

                if key == "text":
                    continue

                if value is None:
                    metadata[key] = ""

                elif isinstance(
                    value,
                    (str, int, float, bool),
                ):
                    metadata[key] = value

                else:
                    metadata[key] = str(value)

            metadatas.append(metadata)

        cls._collection.add(
            ids=ids,
            documents=documents,
            embeddings=vectors,
            metadatas=metadatas,
        )

    # ==========================================================
    # Search
    # ==========================================================

    @classmethod
    def search(cls, embedding, top_k=5):
        """
        Search the most relevant chunks.
        """

        return cls._collection.query(
            query_embeddings=[embedding.tolist()],
            n_results=top_k,
            include=[
                "documents",
                "metadatas",
                "distances",
            ],
        )

    # ==========================================================
    # Duplicate Check
    # ==========================================================

    @classmethod
    def document_exists(cls, file_hash: str) -> bool:
        """
        Check whether a document with the same file hash
        already exists in ChromaDB.
        """

        results = cls._collection.get(
            where={"file_hash": file_hash}
        )

        return len(results["ids"]) > 0

    # ==========================================================
    # List Documents
    # ==========================================================

    @classmethod
    def get_documents(cls):
        """
        Return all uploaded documents with summary information.
        """

        results = cls._collection.get(
            include=["metadatas"]
        )

        documents = {}

        for metadata in results["metadatas"]:

            document_id = metadata["document_id"]

            if document_id not in documents:

                documents[document_id] = {
                    "document_id": document_id,
                    "document_name": metadata["document_name"],
                    "pages": set(),
                    "chunks": 0,
                }

            documents[document_id]["pages"].add(
                metadata["page_number"]
            )

            documents[document_id]["chunks"] += 1

        output = []

        for doc in documents.values():

            output.append(
                {
                    "document_id": doc["document_id"],
                    "document_name": doc["document_name"],
                    "pages": len(doc["pages"]),
                    "chunks": doc["chunks"],
                }
            )

        output.sort(
            key=lambda document: document["document_name"].lower()
        )

        return output

    # ==========================================================
    # Statistics
    # ==========================================================

    @classmethod
    def get_statistics(cls):
        """
        Returns dashboard statistics.
        """

        documents = cls.get_documents()

        total_documents = len(documents)

        total_pages = sum(
            document["pages"]
            for document in documents
        )

        total_chunks = sum(
            document["chunks"]
            for document in documents
        )

        storage_bytes = 0

        upload_directory = settings.UPLOAD_DIR

        if os.path.exists(upload_directory):

            for root, _, files in os.walk(
                upload_directory
            ):
                for file in files:
                    path = os.path.join(root, file)

                    storage_bytes += os.path.getsize(
                        path
                    )

        return {
            "documents": total_documents,
            "pages": total_pages,
            "chunks": total_chunks,
            "storage": storage_bytes,
        }

    # ==========================================================
    # Delete Document
    # ==========================================================

    @classmethod
    def delete_document(cls, document_id: str):
        """
        Delete all chunks belonging to a document.
        """

        results = cls._collection.get(
            where={
                "document_id": document_id
            }
        )

        ids = results["ids"]

        if not ids:
            return False

        cls._collection.delete(ids=ids)

        return True

    # ==========================================================
    # Total Chunks
    # ==========================================================

    @classmethod
    def count(cls):
        """
        Total chunks stored.
        """

        return cls._collection.count()