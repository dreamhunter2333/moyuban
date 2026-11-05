# 摸鱼办

一个集成各种工具的在线网站。

## 在线地址

[https://moyu.awsl.icu](https://moyu.awsl.icu)

## 技术栈

- **前端**: Bun + Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui
- **后端**: FastAPI + Python
- **部署**: Vercel + PWA

## 功能

- 📅 摸鱼日历
- 🛠️ 实用工具集（密码生成、URL/Base64 编码解码、内容分享）
- 📊 进度追踪（今日/本周/本月/本年）
- 📱 PWA 支持，可添加到桌面

## 本地开发

使用 Bun 1.4.4、Node.js 24 和 Python 3.13。在仓库根目录启动后端：

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
DEV=1 uvicorn main:app --reload --port 8000
```

另开终端启动前端，开发服务器会将 `/api` 请求代理到本地后端：

```sh
cd frontend
bun install --frozen-lockfile
bun run dev
```

前端检查与构建：`bun run check`、`bun run lint`、`bun run build`。依赖使用 `frontend/bun.lock` 锁定；TypeScript 保持在当前 ESLint 工具链支持的 6.x。

首页直接渲染接口返回的 Markdown 文本，采用 ReactMarkdown 与 remark-gfm；界面只提供通用排版，不按标题、顺序或内容拆分业务数据。

## API

API 文档: [https://moyu.awsl.icu/docs](https://moyu.awsl.icu/docs)

摸鱼和帕鲁消息接口（`/api/moyu`、`/api/moyu_txt`、`/api/moyu_json`、`/api/palworld`、`/api/palworld_txt`、`/api/palworld_json`）支持：

- `day=15`：仅显示每月 15 日发薪的倒计时；默认 `day=0` 显示常见发薪日。
- `show_salary=false`：隐藏整个工资区，保留周六及节假日信息；默认 `true`。关闭时忽略 `day`。

示例：[纯文本消息（隐藏工资区）](https://moyu.awsl.icu/api/moyu_txt?show_salary=false)。

网页可在[设置](https://moyu.awsl.icu/settings)或进度页设置中关闭“显示工资区”。偏好会保存在当前浏览器，首页请求同步传入 `show_salary=false`；发薪日设置在关闭时保留，重新开启后恢复使用。

## 节假日数据

数据位于 `data/holidays.json`，倒计时采用假期开始日期。2027 年放假及补班安排已按 2026 年 11 月 5 日发布的《国务院办公厅关于2027年部分节假日安排的通知》（国办发明电〔2026〕10号）更新。

通知全文：[新华网转载中国政府网](https://www2.xinhuanet.com/politics/20261105/f90cd6ad4df94ab4833b141e52ccfc13/c.html)；放假日历：[北京市政府转载央视新闻](https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202611/t20261105_4934226.html)。
