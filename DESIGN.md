---
name: "摸鱼办 · 日常索引"
description: "暖杏色导航、近白工作区与酒红操作构成的中文日常工具界面。"
colors:
  background: "#faf7f2"
  foreground: "#342b27"
  card: "#fffdf9"
  card-foreground: "#342b27"
  popover: "#fffdf9"
  popover-foreground: "#342b27"
  primary: "#873e4a"
  primary-foreground: "#fffdf9"
  secondary: "#f2e6dc"
  secondary-foreground: "#4d3b31"
  muted: "#f4eee7"
  muted-foreground: "#74675d"
  accent: "#ead9cd"
  accent-foreground: "#4d3b31"
  destructive: "#b42332"
  destructive-foreground: "#fffdf9"
  border: "#e0d3c8"
  input: "#978376"
  ring: "#873e4a"
  success: "#267045"
  warning: "#85551b"
  sidebar: "#f1e0d2"
  sidebar-foreground: "#514035"
  sidebar-accent: "#e6cfc0"
  sidebar-border: "#dbc5b4"
  dark-background: "#171515"
  dark-foreground: "#eee5de"
  dark-card: "#211e1d"
  dark-card-foreground: "#eee5de"
  dark-popover: "#292321"
  dark-popover-foreground: "#eee5de"
  dark-primary: "#e9a8af"
  dark-primary-foreground: "#2c171c"
  dark-secondary: "#352c28"
  dark-secondary-foreground: "#eee5de"
  dark-muted: "#2c2724"
  dark-muted-foreground: "#b9aaa0"
  dark-accent: "#44332f"
  dark-accent-foreground: "#eee5de"
  dark-destructive: "#ff9da3"
  dark-destructive-foreground: "#2c171c"
  dark-border: "#41352e"
  dark-input: "#8b786c"
  dark-ring: "#e9a8af"
  dark-success: "#8dcba0"
  dark-warning: "#e1ba79"
  dark-sidebar: "#2b221e"
  dark-sidebar-foreground: "#e5d6cb"
  dark-sidebar-accent: "#43322b"
  dark-sidebar-border: "#49372c"
typography:
  headline:
    fontFamily: "\"Noto Serif SC\", \"Noto Serif CJK SC\", \"Songti SC\", SimSun, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-0.025em"
  markdown-heading:
    fontFamily: "\"Noto Serif SC\", \"Noto Serif CJK SC\", \"Songti SC\", SimSun, serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.6
  title:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.375
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4285714286
  caption:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.3333333333
rounded:
  row: "0.25rem"
  sm: "0.5rem"
  md: "0.625rem"
  lg: "0.75rem"
  xl: "1rem"
  badge: "2rem"
spacing:
  space-1: "0.25rem"
  space-1-5: "0.375rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-5: "1.25rem"
  space-6: "1.5rem"
  space-7: "1.75rem"
  space-8: "2rem"
  space-10: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 1rem"
    height: "2.75rem"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 1rem"
    height: "2.75rem"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 1rem"
    height: "2.75rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 1rem"
    height: "2.75rem"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 0.75rem"
    height: "2.75rem"
    width: "100%"
  navigation-link:
    textColor: "{colors.sidebar-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 0.875rem"
    height: "2.75rem"
    width: "100%"
  badge-outline:
    textColor: "{colors.foreground}"
    rounded: "{rounded.badge}"
    padding: "0.125rem 0.5rem"
    height: "1.25rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.xl}"
    padding: "1rem 0"
  tool-index-row:
    textColor: "{colors.foreground}"
    rounded: "{rounded.row}"
    padding: "1.25rem 0.5rem"
  salary-switch:
    backgroundColor: "{colors.primary}"
    height: "18.4px"
    width: "32px"
---

# Design System: 摸鱼办

## Overview

**Creative North Star: "日常索引"**

以暖杏色导航承载稳定的应用入口，以近白工作区承载每日信息和实际工具。深褐文字、宋体标题和酒红操作提供报刊索引的秩序；表单保持标准 shadcn 控件的清晰边界与熟悉行为。

密度来自分隔行、紧凑说明和一致留白，层级来自颜色与排版。深色主题保留相同语义和布局，只切换到暖黑底、暖灰表面与浅粉红操作。实现代码是本记录的视觉依据，方向探索 HTML 不是批准效果图。

**Key Characteristics:**

- 暖色导航与独立工作区。
- 标题宋体、正文无衬线，数字按需等宽。
- 索引行共享图标、说明、箭头与定位反馈。
- 应用页面共享标题、操作区与复制反馈。
- 细边界、低浮起、完整的深浅主题与键盘状态。

## Colors

暖纸色与深褐色承担阅读，酒红承担操作；浅深主题的全部实际 CSS 颜色在 frontmatter 中逐一记录，`dark-` 前缀对应 `.dark` 的同名变量。

### Primary

- **酒红操作 / 暖粉操作**（primary / dark-primary）：主按钮、当前导航、链接、焦点、文字选区与光标。反色文字使用 primary-foreground。
- **异常红**（destructive）：错误文字、无效字段边界和错误提示的浅色背景；不是常规强调色。

### Secondary

- **暖杏辅助**（secondary、accent）：次操作和交互底色；secondary-foreground / accent-foreground 承担对应文字。
- **状态绿 / 琥珀**（success、warning）：现有语义状态变量，供有明确状态含义的反馈使用，不作为品牌装饰色。

### Neutral

- **暖纸 / 暖黑**（background）：应用工作区背景。
- **近白纸 / 暖灰纸**（card、popover）：内容容器和浮层，分别配套各自 foreground。
- **深褐 / 米灰文字**（foreground）：正文与标题；muted-foreground 承担说明，muted 承担轻底色和骨架。
- **浅杏导航**（sidebar）：专用导航表面，sidebar-foreground、sidebar-accent、sidebar-border 分别承担文字、悬停和分隔。
- **纸边 / 字段边**（border、input）：内容分隔比字段描边更轻；ring 指示键盘定位。

**The Semantic Theme Rule.** 新增界面使用语义颜色变量；浅深主题共同切换文字、表面、边界与操作色。

颜色来源为 `frontend/src/index.css`。sidecar 的八级色阶是基于已实现颜色生成的预览辅助，不是新增的 CSS 色板。二维码输出保留白色底以保证扫描；不扩展为深色主题的一般表面。

## Typography

**Display Font:** Noto Serif SC；回退为 Noto Serif CJK SC、Songti SC、SimSun、serif。作用于 h1、h2 和导航品牌。

**Body Font:** 系统无衬线字体栈，包含 PingFang SC 与 Microsoft YaHei。

**Label/Mono Font:** 标签沿用正文栈；编辑器、文本编码结果和分享链接按现有 `font-mono` 使用 Tailwind 的系统等宽字体栈。Markdown 和时间读数按需使用 tabular-nums。

**Character:** 标题沉稳，正文直接，表单依靠字号与字重表达功能。没有巨型展示字层级。

### Hierarchy

- **Headline**：普通页面统一由 PageHeading 使用 headline token，手机和桌面均为（1.5rem / 600 / 1.5）。Markdown h1 行高略放宽（1.55），手机降至（1.25rem），不受应用页面标题组件影响。
- **Markdown heading**：h2 使用 markdown-heading；h3 为无衬线（1rem / 600 / 1.6）。
- **Title**：卡片默认 title token，部分分区标题使用（1.125rem）；索引行标题为（0.875rem / 550），工具页提升至（1rem）。
- **Body**：Markdown 使用 body token 并允许内容宽度自然伸展；全局正文行高（1.65），页面说明为（0.875rem / 1.8）。
- **Label / Caption**：按钮为 label；辅助标签和页脚为 caption；索引说明为（0.8125rem / 1.7）。
- **Brand**：品牌手机（1.125rem），桌面（1.25rem），CSS 请求字重（650），字距（-0.025em）；实际自托管字体文件只有 600 字重，不额外下载字体。

**The Reading Type Rule.** 品牌和一级、二级标题使用衬线字体，正文与表单保持无衬线；等宽字体只服务编辑内容和结果。

字体出处：`frontend/public/fonts/noto-serif-sc-600.woff2`，实际（59,480 bytes），来源为 [Google Fonts Noto Serif SC](https://github.com/google/fonts/tree/main/ofl/notoserifsc)。`frontend/public/fonts/README.md` 记录自托管子集含现有界面、消息模板汉字及 ASCII；缺字使用 CSS 回退。授权为同目录 `OFL.txt` 的 SIL Open Font License，`@font-face` 使用（600、normal、font-display: swap）。鱼形品牌来自现有 Lucide Fish SVG；不将 PWA 图标或方向探索图当作排版依据。

## Layout

应用使用导航与工作区的稳定关系。低于（768px）导航为顶部 sticky 横栏，工具入口始终可直接访问；展开菜单是两列。达到（768px）采用（14rem / 224px）导航与弹性工作区，导航 sticky、高（100dvh），操作放在底部。

工作区最大宽（88rem），基础内边距为纵向（1.5rem）、横向（1rem）；（640px）起为（2rem 1.5rem），（1180px）起为（2.5rem）。基础留白以（0.25rem）为节拍，实际复用的细分与层级见 spacing tokens。设置区域限制（42rem），进度页在（768px）起变为两列。

首页在（1180px）起采用弹性正文与（17rem）工具索引列、间距（2rem），索引 sticky 顶距（2.5rem）；更窄时顺序堆叠。正文容器基础内边距（1.25rem），（640px）起（2rem）。工具列表复用索引行，普通最小行高（5.75rem），工具页纵向留白（1.75rem）。这些是已实现的表面规则，不要求其他页面复制首页列式。

长文使用 overflow-wrap，表格与代码块在自身范围横向滚动，图片和视频不超过内容宽度。编辑器使用可用工作区宽度，工具容器最小高度（24rem）。首页与分享中的 Markdown 都直接由 ReactMarkdown + remark-gfm 处理，不按业务内容做布局判断。

## Elevation & Depth

界面以色面、细分隔和轻环形边界建立层级。普通卡片使用 foreground（10%）的一像素外环；首页阅读区和工具列表使用 border 一像素描边。没有常驻的悬浮卡片阴影。标签页选中项采用 Tailwind shadow-sm（`0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`）；只表示局部选中层。

**The Single Surface Rule.** 编辑与预览共用单层工作表面，以留白和分隔表达内部层级。

全局可见焦点为 ring 色两像素轮廓、四像素偏移；shadcn 控件另用三像素半透明 ring 与边界变色。按钮按下下移一像素。常规过渡使用（150ms），shadcn 使用 Tailwind 标准缓动，索引行使用 CSS 默认 ease。减少动态效果偏好将过渡归零，动画缩短至（0.01ms）并只运行一次。

## Shapes

圆角层级见 rounded tokens：索引行小圆角，输入与按钮中等圆角，页面与卡片大圆角。徽标使用更圆的两端（2rem）；开关与进度条采用全圆边。直线分隔横贯索引行，避免把每一行再做独立卡片。图标为 Lucide 线性 SVG，普通控件（1rem），工具入口（1.25rem），品牌（1.75rem）。

## Components

### Buttons

主操作为酒红填充与反色文字，默认高度（2.75rem）、水平内边距（1rem）、lg 圆角。悬停主色透明度（80%）；outline 使用页面底色与边界，悬停使用 muted；secondary 使用暖杏底，悬停混合 foreground（5%）；ghost 常态透明。小按钮（2.25rem），普通图标按钮为（2.75rem）方形。禁用不可交互且透明度（50%），无效状态使用 destructive 边界和环。组件库含 destructive/link 变体，当前核心页面主要使用 default、outline、secondary、ghost。

### Chips

进度百分比使用 outline Badge：细边、caption 字号、（1.25rem）基础高度、badge 圆角。时间徽标使用 secondary 底与数字等宽，页面局部加大内边距。它们显示状态，不伪装可点击操作。

### Cards / Containers

shadcn Card 使用 card 表面、xl 圆角、一像素轻环形边界。默认纵向内边距、子项间距及内容水平内边距均为（1rem）；sm 为（0.75rem）。标题默认无衬线中等字重。首页阅读和工具索引采用边框容器，保持相同纸面语言。分享编辑和预览在同一个 Card 内切换。

### Inputs / Fields

Input 高度（2.75rem），字段描边使用 input，内边距（0.5rem 0.75rem），lg 圆角；手机文字（1rem），桌面（768px）起（0.875rem）。Textarea 最小高度（4rem），水平内边距（0.625rem），其余状态与 Input 一致。深色字段采用 input（30%）底色。占位符使用 muted-foreground；focus 使用 ring；aria-invalid 使用 destructive；禁用有弱化底色和（50%）透明度。

工资开关默认（32px × 18.4px），圆形滑块（16px）；选中 primary、未选中 input，具有扩大后的透明命中范围。设置页与进度页的设置面板共用 SalarySettings；关闭工资显示时发薪日输入为禁用样式，不删除既有偏好。

### Navigation

桌面与手机使用同一导航条目。每项至少（2.75rem）高，水平内边距（0.875rem）；默认 sidebar-foreground，悬停 sidebar-accent，`aria-current="page"` 使用 primary 及反色文字。手机菜单具有展开状态和关联控制属性，工具入口在菜单收起时仍可见。页面保留键盘跳到主要内容链接。

### Tool index

首页与工具页共享图标、标题、说明和尾部箭头。行底是一像素分隔，悬停 muted，按下 accent，箭头使用 primary；整行具有链接与焦点反馈。不把行尾箭头单独做第二个操作。

### Reading and feedback

Markdown 只施加通用 h1/h2/h3、链接、表格、代码、引用和媒体排版。加载以 muted 骨架和状态语义表达；错误以 destructive 文字和 alert 表达；分享空预览使用 muted-foreground；复制成功用 Check 图标与可访问标签反馈。标签页选中项使用页面表面与轻阴影，禁用和键盘焦点沿用标准控件状态。

### Shared page controls

`components/page-heading.tsx` 统一工具布局、工具集、分享、进度、设置和关于页的标题。可选前置返回按钮、说明和操作区；窄屏操作区自然换行，标题与操作之间保持（1rem）间距，分区下留白（1.75rem）。

`components/copy-button.tsx` 在五处复制入口复用 shadcn 图标按钮，提供（44px × 44px）操作区和一致的 Copy / Check 反馈。复制文本、成功状态和事件仍由原页面传入，不接管业务状态。两个设置入口使用 fieldset / legend 标注工作日分组，选项标签高度至少（44px）。

分享标签栏根据（44px）选项和内边距自动计算高度，避免选中项越界；分享编辑器最小高度（16rem），Base64 双侧编辑器最小高度（12rem），随内容增长。

## Do's and Don'ts

### Do:

- **Do** 使用语义变量，让导航、工作区、焦点与错误反馈随主题一起切换。
- **Do** 保留标题衬线与表单无衬线的分工，长文使用通用 Markdown 排版。
- **Do** 在首页与工具页复用同一种索引行，在手机导航保留直接工具入口。
- **Do** 用真实加载、错误、空内容、复制成功与禁用状态解释当前操作。

### Don't:

- **Don't** 根据业务标题、段落位置或列表顺序给 API Markdown 硬拆版式。
- **Don't** 为视觉效果编造工资、倒计时、工具结果或进度数值。
- **Don't** 给分享预览额外嵌套第二层卡片。
- **Don't** 将单页遗留阈值色、方向草图或未实现的状态提升为全局规范。

未规范化、未修复：进度页现存 green-500 / blue-500 / red-500 阈值配色只属于该页面的既有行为，不成为全局品牌或状态色；本记录不修改实现。未发现需写成规范的 craft-floor 拒绝项。

依据：`frontend/src/index.css`、共享导航与工具布局、`components/ui`、首页/工具/进度/设置/分享源码、字体 README/OFL。共享标题与复制控件已按生产构建检查 320 / 390 / 1440px 布局和键盘、复制、预览、设置交互。
