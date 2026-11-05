import logging

from pydantic_settings import BaseSettings, SettingsConfigDict


logging.basicConfig(
    format="%(asctime)s: %(levelname)s: %(name)s: %(message)s",
    level=logging.INFO
)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")
    holidays_file: str = "data/holidays.json"


settings = Settings()
