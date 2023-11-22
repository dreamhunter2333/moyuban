import datetime
import logging

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from router.moyu_config import load_holidays_from_url
from config import settings

_logger = logging.getLogger(__name__)
scheduler = BackgroundScheduler(timezone=datetime.timezone.utc)
scheduler.configure(timezone=datetime.timezone.utc)


class CronTaskHelper:

    @staticmethod
    def init_cron_task() -> None:
        scheduler.add_job(
            load_holidays_from_url,
            trigger=CronTrigger.from_crontab(settings.holidays_file_cron),
            id="1",
            replace_existing=True
        )
        scheduler.start()


CronTaskHelper.init_cron_task()
