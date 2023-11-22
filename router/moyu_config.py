import os
import logging
from typing import List
import requests

from datetime import timedelta, timezone
from config import settings

from router.models import Holiday, Holidays

_logger = logging.getLogger(__name__)
TZ = timezone(timedelta(hours=8))


MO_YU_TEMPLATE = """
【摸鱼办】提醒您:

 今天是 {year}年{month}月{day}日, 星期{weekday}
 你好, 摸鱼人！工作再忙, 一定不要忘记摸鱼哦！
 有事没事起身去茶水间, 去厕所, 去走廊走走, 去找同事聊聊八卦别老在工位上坐着, 钱是老板的但命是自己的。

 温馨提示:
 {year}年 已经过去 {passdays} 天 {passhours} 小时
 距离【月底发工资】: {salaryday1} 天
 距离【05号发工资】: {salaryday5} 天
 距离【10号发工资】: {salaryday10} 天
 距离【15号发工资】: {salaryday15} 天
 距离【20号发工资】: {salaryday20} 天
 距离【周六】还有 {day_to_weekend} 天
"""

MO_YU_TEMPLATE_DAY_N = """
【摸鱼办】提醒您:

 今天是 {year}年{month}月{day}日, 星期{weekday}
 你好, 摸鱼人！工作再忙, 一定不要忘记摸鱼哦！
 有事没事起身去茶水间, 去厕所, 去走廊走走, 去找同事聊聊八卦别老在工位上坐着, 钱是老板的但命是自己的。

 温馨提示:
 {year}年 已经过去 {passdays} 天 {passhours} 小时
 距离【 {salaryday} 号发工资】: {salarydayn} 天
 距离【周六】还有 {day_to_weekend} 天
"""


WEEK_DAYS = "一二三四五六日"


HOLIDAYS = Holidays([])


def get_holidays() -> List[Holiday]:
    return HOLIDAYS.root


def load_holidays() -> None:
    if not os.path.exists(settings.holidays_file):
        return
    global HOLIDAYS
    try:
        with open(settings.holidays_file, "r") as f:
            HOLIDAYS = Holidays.model_validate_json(f.read())
        _logger.info(f"load holidays success: {HOLIDAYS}")
    except Exception as e:
        _logger.exception("load holidays error: %s", e)


def load_holidays_from_url() -> None:
    global HOLIDAYS
    try:
        res = requests.get(settings.holidays_file_url)
        if res.status_code != 200:
            _logger.error(
                f"load holidays from url error: {res.status_code}")
            return
        HOLIDAYS = Holidays.model_validate_json(res.text)
        _logger.info(f"load holidays from url success: {HOLIDAYS}")
    except Exception as e:
        _logger.exception("load holidays from url error: %s", e)


def init_config() -> None:
    load_holidays()
    load_holidays_from_url()
