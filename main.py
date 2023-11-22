import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from router.moyuban import router as moyu_router
from router.moyu_config import init_config
from router.cron_jobs import CronTaskHelper

logging.basicConfig(
    format="%(asctime)s: %(levelname)s: %(name)s: %(message)s",
    level=logging.INFO
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_config()
    CronTaskHelper.init_cron_task()
    yield

app = FastAPI(title="摸鱼办", lifespan=lifespan)


class EndpointFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return all(
            path not in record.getMessage()
            for path in ["/health_check", "/docs", "/openapi.json"]
        )


# Add filter to the logger
logging.getLogger("uvicorn.access").addFilter(EndpointFilter())

if os.environ.get("DEV"):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(moyu_router, prefix="")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
