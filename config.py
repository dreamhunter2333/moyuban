import logging

from pydantic_settings import BaseSettings


logging.basicConfig(
    format="%(asctime)s: %(levelname)s: %(name)s: %(message)s",
    level=logging.INFO
)


class Settings(BaseSettings):
    holidays_file: str = "data/holidays.json"
    holidays_file_url: str = "https://raw.githubusercontent.com/dreamhunter2333/moyuban/main/data/holidays.json"
    holidays_file_cron: str = "0 0 * * 1"
    holidays_lazy_update_interval_days: int = 7

    class Config:
        env_file = ".env"


settings = Settings()
