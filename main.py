import os
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router.moyuban import router as moyu_router
from router.tools_router import router as tools_router

app = FastAPI(title="摸鱼办")


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
app.include_router(tools_router, prefix="")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
