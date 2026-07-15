from pathlib import Path
from typing import List

import fitz


class ExtractionService:
    """
    Extract text from a PDF while preserving page information.
    """

    @staticmethod
    def extract_text(pdf_path: Path) -> List[dict]:
        """
        Extract text page-by-page.

        Args:
            pdf_path: Path to the PDF file.

        Returns:
            List of dictionaries containing page number and text.
        """

        pages = []

        with fitz.open(pdf_path) as document:

            for page_number, page in enumerate(document, start=1):

                pages.append(
                    {
                        "document_name": pdf_path.name,
                        "page_number": page_number,
                        "text": page.get_text("text"),
                    }
                )

        return pages