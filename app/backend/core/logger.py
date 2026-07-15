import time
import logging

from fastapi import Request

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)

logger = logging.getLogger("ResearchGenie")


async def logging_middleware(request: Request, call_next):
    """
    Log every incoming request and its response time.
    """

    start_time = time.perf_counter()

    response = await call_next(request)

    process_time = time.perf_counter() - start_time

    logger.info(
        "%s %s | %d | %.3fs",
        request.method,
        request.url.path,
        response.status_code,
        process_time,
    )

    return response