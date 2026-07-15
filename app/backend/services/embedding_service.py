from sentence_transformers import SentenceTransformer

from app.backend.core.config import settings


class EmbeddingService:
    """
    Generates embeddings using BAAI/bge-m3.
    """

    _model = None

    @classmethod
    def load_model(cls):
        """
        Load the embedding model once.
        """

        if cls._model is None:
            print("Loading embedding model...")
            cls._model = SentenceTransformer(
                settings.EMBEDDING_MODEL
            )

        return cls._model

    @classmethod
    def generate_embeddings(cls, chunks):
        """
        Generate embeddings for document chunks.
        """

        model = cls.load_model()

        texts = [
            chunk["text"]
            for chunk in chunks
        ]

        embeddings = model.encode(
            texts,
            convert_to_numpy=True,
            normalize_embeddings=True,
            show_progress_bar=True,
        )

        return embeddings

    @classmethod
    def generate_query_embedding(cls, query: str):
        """
        Generate embedding for a user's question.
        """

        model = cls.load_model()

        embedding = model.encode(
            query,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )

        return embedding