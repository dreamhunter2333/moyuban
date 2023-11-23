from typing import List
from datetime import datetime

from dateutil.relativedelta import relativedelta
from fastapi import APIRouter
from fastapi.responses import JSONResponse, PlainTextResponse

from router.models import Holiday

from .moyu_config import MoyuConfigHelper
from .moyu_config import MO_YU_TEMPLATE, MO_YU_TEMPLATE_DAY_N, TZ, WEEK_DAYS, HOLIDAY_TITLE

router = APIRouter()


def get_salaryday(now: datetime, day: int) -> int:
    if now.day == day:
        return 0
    return (
        (
            datetime(now.year, now.month, day, tzinfo=TZ)
            + relativedelta(months=1)
            if now.day > day else
            datetime(now.year, now.month, day, tzinfo=TZ)
        )
        - datetime(now.year, now.month, now.day, tzinfo=TZ)
    ).days


@router.get("/api/moyu_info", response_class=JSONResponse, tags=["moyu"])
def get_moyu_info() -> List[Holiday]:
    return MoyuConfigHelper.get_holidays()


@router.get("/api/moyu_json", response_class=JSONResponse, tags=["moyu"])
def get_json_moyu_message(day: int = 0) -> str:
    return get_moyu_message(day)


@router.get("/api/moyu", response_class=PlainTextResponse, tags=["moyu"])
def get_moyu_message(day: int = 0) -> str:

    res = ""

    now = datetime.now(tz=TZ)
    init_time = datetime(now.year, 1, 1, tzinfo=TZ)
    delta = now - init_time

    moyu_template = MO_YU_TEMPLATE_DAY_N.format(
        year=now.year, month=now.month, day=now.day,
        weekday=WEEK_DAYS[now.weekday()],
        passdays=delta.days,
        passhours=(delta.seconds // 3600),
        salaryday=day,
        salarydayn=get_salaryday(now, day),
        day_to_weekend=5 - now.weekday() if now.weekday() < 6 else 6
    ) if day else MO_YU_TEMPLATE.format(
        year=now.year, month=now.month, day=now.day,
        weekday=WEEK_DAYS[now.weekday()],
        passdays=delta.days,
        passhours=(delta.seconds // 3600),
        salaryday1=(
            datetime(now.year, now.month, 1, tzinfo=TZ)
            + relativedelta(months=1, days=-1)
            - datetime(now.year, now.month, now.day, tzinfo=TZ)
        ).days,
        salaryday5=get_salaryday(now, 5),
        salaryday10=get_salaryday(now, 10),
        salaryday15=get_salaryday(now, 15),
        salaryday20=get_salaryday(now, 20),
        day_to_weekend=5 - now.weekday() if now.weekday() < 6 else 6
    )
    res += moyu_template

    holiday_body = ""

    for holiday in MoyuConfigHelper.get_holidays():
        f_date = holiday.date
        template = holiday.template
        if now > f_date:
            continue
        time_delta = f_date - now
        holiday_body += f"""- {template.format(
            day=time_delta.days,
            hour=(time_delta.seconds // 3600)
        )}\n"""
    if holiday_body:
        res += HOLIDAY_TITLE + holiday_body
    return res
