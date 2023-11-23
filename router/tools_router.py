import secrets

from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/api/genereate_token", response_class=JSONResponse, tags=["tools"])
def generate_token(length: int = 16) -> str:
    if 0 < length > 100:
        return JSONResponse(status_code=400, content={"message": "length must be less than 100"})
    return secrets.token_urlsafe(length)
