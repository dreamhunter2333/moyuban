import base64
import time
import hashlib
import hmac
import requests

from fastapi import APIRouter

from router.models import LarkWebHook
from router.moyuban import get_moyu_message

router = APIRouter()


def gen_sign(timestamp, secret):
    # 拼接timestamp和secret
    string_to_sign = '{}\n{}'.format(timestamp, secret)
    hmac_code = hmac.new(
        string_to_sign.encode("utf-8"),
        digestmod=hashlib.sha256
    ).digest()
    # 对结果进行base64处理
    sign = base64.b64encode(hmac_code).decode('utf-8')
    return sign


@router.post("/api/lark_bot", tags=["moyu"])
def get_json_res_moyu_message(lark_bot: LarkWebHook) -> bool:
    timestamp = int(time.time())
    requests.post(
        url=lark_bot.url,
        json={
            "timestamp": timestamp,
            "msg_type": "interactive",
            "sign": gen_sign(timestamp, lark_bot.secret),
            "card": {
                "config": {
                    "wide_screen_mode": True
                },
                "header": {
                    "title": {
                        "tag": "plain_text",
                        "content": "摸鱼办"
                    },
                    "template": "blue"
                },
                "elements": [
                    {
                        "tag": "markdown",
                        "content": get_moyu_message(),
                    },
                ]
            }
        }
    )
    return True
