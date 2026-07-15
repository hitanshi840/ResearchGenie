from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application configuration loaded from environment variables.
    """

    # ==========================
    # Application
    # ==========================
    APP_NAME: str = "ResearchGenie"
    APP_VERSION: str = "1.0.0"

    API_PREFIX: str = "/api/v1"

    # ==========================
    # Groq
    # ==========================
    GROQ_API_KEY: str = ""

    # ==========================
    # Storage
    # ==========================
    CHROMA_DB_DIR: str = "data/chroma"
    UPLOAD_DIR: str = "data/uploads"

    # ==========================
    # Embeddings
    # ==========================
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"

    # ==========================
    # Chunking
    # ==========================
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200

    # ==========================
    # Limits
    # ==========================
    MAX_FILE_SIZE_MB: int = 25

    # ==========================
    # Logging
    # ==========================
    LOG_LEVEL: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()