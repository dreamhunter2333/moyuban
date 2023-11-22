from datetime import datetime
from dateutil.relativedelta import relativedelta

from fastapi import APIRouter
from fastapi.responses import PlainTextResponse

from .moyu_config import get_holidays, MO_YU_TEMPLATE, MO_YU_TEMPLATE_DAY_N, TZ, WEEK_DAYS

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

    for holiday in get_holidays():
        f_date = holiday.date
        template = holiday.template
        if now > f_date:
            continue
        time_delta = f_date - now
        res += f"""\n{template.format(
            day=time_delta.days,
            hour=(time_delta.seconds // 3600)
        )}\n"""
    return res
