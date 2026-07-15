import re
from typing import List, Dict


class CleaningService:
    """
    Service responsible for cleaning extracted PDF text
    while preserving page information.
    """

    @staticmethod
    def clean_pages(pages: List[Dict]) -> List[Dict]:
        """
        Clean text for each page individually.

        Args:
            pages: List of dictionaries containing
                   page_number and text.

        Returns:
            Cleaned list of page dictionaries.
        """

        cleaned_pages = []

        for page in pages:

            cleaned_text = re.sub(r"\s+", " ", page["text"]).strip()

            cleaned_pages.append(
                {
                    "document_name": page["document_name"],
                    "page_number": page["page_number"],
                    "text": cleaned_text,
                }
            )

        return cleaned_pages