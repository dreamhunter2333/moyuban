# 摸鱼办

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

中文用户在电脑和手机上查看每日摸鱼提醒，并使用编码、密码生成与内容分享工具。用户已确认：首页和工具集同等重要，两者都需要方便抵达。

## Product Purpose

把每日提醒、周六及节假日倒计时、发薪日信息和轻量工具放在同一个网站，消息也可直接通过 API 以 Markdown、纯文本和 JSON 获取。

## Capabilities and Constraints

- 前端采用 Bun、Vite、React、TypeScript 和 shadcn/ui，支持深浅主题、响应式布局与 PWA。
- 后端采用 FastAPI，依赖升级已单独提交；本轮仅重构前端及升级前端依赖，保持已有业务逻辑和 API 返回格式。
- 首页和分享工具继续使用 react-markdown 与 remark-gfm，不更换 Markdown 渲染链路。
- 首页直接渲染接口返回的 Markdown 原文，不根据业务标题、段落位置或列表顺序拆分内容，不硬编码工资、假期或倒计时数据。
- 保留现有工具：内容分享、密码生成、URL 编解码、Base64 编解码。
- 保留进度页及其工作日、工作时间、日薪、发薪日设置。
- 消息接口的 show_salary=false 关闭整个工资区，周六及节假日信息继续保留。
- 生产网站为 https://moyu.awsl.icu，通过 GitHub main 分支触发 Vercel 自动部署。

## Brand Commitments

网站名为“摸鱼办”，已有鱼形标识，界面语言为中文。

## Evidence on Hand

- README.md：现有功能、生产域名和 API 使用方式。
- data/holidays.json：有来源的 2026、2027 年放假安排。
- router/moyu_config.py：每日提醒及工资区的原始文案。
- frontend/src/pages：现有页面、工具和交互。

## Product Principles

- 首页与工具入口同等容易找到。
- 信息使用真实接口数据，不为视觉效果编造倒计时或结果。
- 改善界面时保留既有功能与 Markdown 内容。
- 工具操作、设置、加载状态和错误恢复都要清楚。
