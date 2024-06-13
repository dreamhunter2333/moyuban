from datetime import datetime
from typing import List
from pydantic import BaseModel, RootModel


class Holiday(BaseModel):
    date: datetime
    template: str


class LarkWebHook(BaseModel):
    url: str
    secret: str


Holidays = RootModel[List[Holiday]]
