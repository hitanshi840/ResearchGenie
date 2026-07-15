from groq import Groq

from app.backend.core.config import settings


class LLMService:
    """
   Handles interaction with the Groq API.
    """

    _client = Groq(
        api_key=settings.GROQ_API_KEY
    )

    MODEL_NAME = "llama-3.3-70b-versatile"

    @classmethod
    def generate_answer(cls, question: str, context: str) -> str:
        """
        Generate an answer using retrieved document context.
        """

        prompt = f"""
You are ResearchGenie, an intelligent AI Research Assistant.

Answer ONLY using the provided context.

Rules:
- Do NOT hallucinate.
- Do NOT invent information.
- If the answer is not present in the context, reply exactly:
"I couldn't find this information in the uploaded documents."
- Be concise.
- Use bullet points whenever appropriate.

=========================
Context
=========================

{context}

=========================
Question
=========================

{question}

=========================
Answer
=========================
"""

        try:

            response = cls._client.chat.completions.create(
                model=cls.MODEL_NAME,
                messages=[
                    {
                        "role": "system",
                        "content": "You answer questions strictly from the provided document context."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.1,
                max_tokens=1024,
            )

            return response.choices[0].message.content.strip()

        except Exception as e:

            return f"Error: {str(e)}"