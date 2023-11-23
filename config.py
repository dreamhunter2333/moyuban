import logging

from pydantic_settings import BaseSettings


logging.basicConfig(
    format="%(asctime)s: %(levelname)s: %(name)s: %(message)s",
    level=logging.INFO
)


class Settings(BaseSettings):
    holidays_file: str = "data/holidays.json"

    class Config:
        env_file = ".env"


settings = Settings()
