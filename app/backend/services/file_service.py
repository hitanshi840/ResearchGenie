from pathlib import Path

from fastapi import HTTPException, UploadFile

from app.backend.core.config import settings

ALLOWED_EXTENSIONS = {".pdf"}


class FileService:
    @staticmethod
    async def save_pdf(file: UploadFile) -> Path:
        """
        Validate and save an uploaded PDF file.

        Returns:
            Path: Path object pointing to the saved PDF.
        """

        extension = Path(file.filename).suffix.lower()

        if extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed.",
            )

        upload_dir = Path(settings.UPLOAD_DIR)
        upload_dir.mkdir(parents=True, exist_ok=True)

        file_path = upload_dir / file.filename

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        return file_path