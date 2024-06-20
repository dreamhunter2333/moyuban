import os
import logging

from typing import List
from datetime import timedelta, timezone
from config import settings

from router.models import Holiday, Holidays

_logger = logging.getLogger(__name__)
TZ = timezone(timedelta(hours=8))


MO_YU_TEMPLATE = """
# 【摸鱼办】提醒您: {year} 年 已经过去 {passdays} 天 {passhours} 小时

今天是 {year}年{month}月{day}日, 星期{weekday}

你好, 摸鱼人！工作再忙, 一定不要忘记摸鱼哦！

有事没事起身去茶水间, 去厕所, 去走廊走走, 去找同事聊聊八卦别老在工位上坐着, 钱是老板的但命是自己的。

## 【工资】

- 距离【月底发工资】: {salaryday1} 天
- 距离【05号发工资】: {salaryday5} 天
- 距离【10号发工资】: {salaryday10} 天
- 距离【15号发工资】: {salaryday15} 天
- 距离【20号发工资】: {salaryday20} 天
- 距离【周六】还有 {day_to_weekend} 天
"""

MO_YU_TEMPLATE_DAY_N = """
# 【摸鱼办】提醒您: {year} 年 已经过去 {passdays} 天 {passhours} 小时

今天是 {year}年{month}月{day}日, 星期{weekday}

你好, 摸鱼人！工作再忙, 一定不要忘记摸鱼哦！

有事没事起身去茶水间, 去厕所, 去走廊走走, 去找同事聊聊八卦别老在工位上坐着, 钱是老板的但命是自己的。

## 【工资】

- 距离【 {salaryday} 号发工资】: {salarydayn} 天
- 距离【周六】还有 {day_to_weekend} 天
"""

HOLIDAY_TITLE = """
## 【节假日】
"""

MO_YU_TEMPLATE_TXT = """【摸鱼办】提醒您:
{year} 年 已经过去 {passdays} 天 {passhours} 小时, 今天是 {year}年{month}月{day}日, 星期{weekday}
你好, 摸鱼人！工作再忙, 一定不要忘记摸鱼哦！有事没事起身去茶水间, 去厕所, 去走廊走走, 去找同事聊聊八卦别老在工位上坐着, 钱是老板的但命是自己的。
【工资】
- 距离【月底发工资】: {salaryday1} 天
- 距离【05号发工资】: {salaryday5} 天
- 距离【10号发工资】: {salaryday10} 天
- 距离【15号发工资】: {salaryday15} 天
- 距离【20号发工资】: {salaryday20} 天
- 距离【周六】还有 {day_to_weekend} 天"""

MO_YU_TEMPLATE_DAY_N_TXT = """
【摸鱼办】提醒您:
{year} 年 已经过去 {passdays} 天 {passhours} 小时, 今天是 {year}年{month}月{day}日, 星期{weekday}
你好, 摸鱼人！工作再忙, 一定不要忘记摸鱼哦！有事没事起身去茶水间, 去厕所, 去走廊走走, 去找同事聊聊八卦别老在工位上坐着, 钱是老板的但命是自己的。
【工资】
- 距离【 {salaryday} 号发工资】: {salarydayn} 天
- 距离【周六】还有 {day_to_weekend} 天"""

PALU_TEMPLATE = """
# 【帕鲁综合办】提醒您: {year} 年 已经过去 {passdays} 天 {passhours} 小时

今天是 {year}年{month}月{day}日, 星期{weekday}

你好，小帕鲁，工作再累，一定不要忘记摸鱼哦 !
有事没事起身去茶水间去廊道去天台走走，别老在工位上坐着。
多喝点水，钱是老板的，但命是自己的 !

## 【工资】

- 距离【月底发工资】: {salaryday1} 天
- 距离【05号发工资】: {salaryday5} 天
- 距离【10号发工资】: {salaryday10} 天
- 距离【15号发工资】: {salaryday15} 天
- 距离【20号发工资】: {salaryday20} 天
- 距离【周六】还有 {day_to_weekend} 天
"""

PALU_TEMPLATE_DAY_N = """
# 【帕鲁综合办】提醒您: {year} 年 已经过去 {passdays} 天 {passhours} 小时

今天是 {year}年{month}月{day}日, 星期{weekday}

你好，小帕鲁，工作再累，一定不要忘记摸鱼哦 !
有事没事起身去茶水间去廊道去天台走走，别老在工位上坐着。
多喝点水，钱是老板的，但命是自己的 !

## 【工资】

- 距离【 {salaryday} 号发工资】: {salarydayn} 天
- 距离【周六】还有 {day_to_weekend} 天
"""

PALU_TEMPLATE_TIPS = """
## [友情提示]

三甲医院 ICU 躺一天平均费用大概一万块。
你晚一天进 ICU, 就等于为你的家庭多赚一万块。少上班，多聊天。
"""

HOLIDAY_TITLE_TXT = """
【节假日】
"""

WEEK_DAYS = "一二三四五六日"


HOLIDAYS = Holidays([])


class MoyuConfigHelper:

    @classmethod
    def get_holidays(cls) -> List[Holiday]:
        return HOLIDAYS.root

    @classmethod
    def load_holidays(cls) -> None:
        if not os.path.exists(settings.holidays_file):
            return
        global HOLIDAYS
        try:
            with open(settings.holidays_file, "r") as f:
                HOLIDAYS = Holidays.model_validate_json(f.read())
            _logger.info(
                f"load holidays success: {HOLIDAYS.model_dump_json(indent=2)}"
            )
        except Exception as e:
            _logger.exception("load holidays error: %s", e)


MoyuConfigHelper.load_holidays()
