from datetime import datetime
from typing import List
from pydantic import BaseModel, RootModel


class Holiday(BaseModel):
    date: datetime
    template: str


Holidays = RootModel[List[Holiday]]
