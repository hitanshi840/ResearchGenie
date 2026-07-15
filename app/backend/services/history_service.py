from datetime import datetime


class HistoryService:
    """
    Stores chat history in memory.
    """

    _history = []

    @classmethod
    def add(
        cls,
        question: str,
        answer: str,
    ):
        cls._history.append(
            {
                "question": question,
                "answer": answer,
                "timestamp": datetime.now(),
            }
        )

    @classmethod
    def get_all(cls):
        return cls._history

    @classmethod
    def clear(cls):
        cls._history.clear()