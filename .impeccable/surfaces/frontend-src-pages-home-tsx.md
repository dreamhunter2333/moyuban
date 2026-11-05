---
version: 1
slug: "frontend-src-pages-home-tsx"
primary_target: "frontend/src/pages/home.tsx"
related_targets: ["frontend/src/components/layout.tsx","frontend/src/components/header.tsx","frontend/src/index.css","frontend/src/pages/tools.tsx","frontend/src/pages/progress.tsx","frontend/src/pages/settings.tsx"]
---

# 摸鱼办应用界面

模式：Operate。范围：首页、工具、进度、设置、共享导航与组件。首页和工具入口同等重要。所有动态提醒由 API 返回 Markdown 原文，保持 react-markdown + remark-gfm，不按标题或节点位置拆分内容。

## Direction contract

THESIS: 一个清晰的日常索引，让提醒与实际工具随手可达。

OWN-WORLD: 暖杏色应用导航、近白工作区、深褐文字和酒红色操作；标准 shadcn 表单和按钮，以细分隔与一致的行节奏呈现信息。深色主题延续暖灰与浅杏色强调。

STORY: 用户从持续可见的导航进入首页或工具；首页左侧直接阅读接口 Markdown，右侧直接进入现有四种工具；设置中的工资开关会同步保存并传入请求。

FIRST VIEWPORT: 桌面左侧固定 224px 导航，右侧弹性工作区；首页是完整 Markdown 阅读区域和工具索引，工具页是清楚的分类列表，编辑器保持完整可用宽度。手机使用紧凑导航，并保持工具入口可见。标志性细节是同类工具在首页与工具页保持一致的索引行与定位反馈，不伪造指标。

FORM: 用户选择“日常索引”，来源为有序候选第 4 项的财经报刊信息索引；只借用排版、色彩与密度，保留标准应用导航和控件。seed:ed6ccb6a0bdf3fbf。代码优先，无批准效果图。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## QUALITY BAR

- 日常索引来自报刊信息索引的排版秩序：暖杏色导航、酒红色操作、自托管思源宋体标题与清楚的分隔行，表单正文保持无衬线字体。
- 桌面首屏同时呈现真实提醒与四个工具入口；手机持续可见工具入口，不需读完提醒才能进入工具。
- Markdown 只做通用排版，任意标题、列表、表格和工资区开关都自然排列，不依赖业务文案或节点位置。
- 编辑器与预览使用单层工作表面；浅色与深色主题、键盘焦点、加载和错误状态均延续同一套颜色与控件。
- 320px 至桌面宽度均可操作且无页面横向溢出；工资偏好刷新后保留，两个设置入口共享状态，既有工具行为保留。
