# Energy Diary

A personal, energy-aware daily planner that combines tasks, mood tracking, calendar review, and monthly analytics.

## Features

- Calendar-first month view with per-day energy and mood status
- Bilingual UI toggle (中文 / English)
- Daily page: tasks on top, diary and memos below
- Tasks support projects, priorities, and energy direction (consume or recover)
- Daily energy cap works as a net budget; recovered energy can be reused
- Quick mood logging with kaomoji, daily mood summary, and mood timeline
- Monthly report with separate consume/recover lines and mood points
- Fully local and offline when opened as a static page
- Optional LAN sync so phone and computer share the same data file

## Tech

- Vanilla HTML / CSS / JavaScript, no front-end dependencies
- LocalStorage for local persistence
- Optional Python HTTP server for shared data across devices

## Run Locally

Open `index.html` directly in a browser, or start the sync server:

```bash
python server.py
```

Then visit `http://localhost:8765/energy-diary/`.

## Notes

- `data.json` contains personal data and is intentionally gitignored.
- The static build works on GitHub Pages; the sync server is optional.

# 能量手账

一个本地优先的个人效率工具，把待办、心情、日历和月报放在同一套精力模型里。

## 功能

- 日历为主界面，每天显示净消耗/净恢复、状态标签和心情
- 中英文界面一键切换
- 一天一页：待办在上，日记与备忘在下
- 任务支持项目分组、优先级、消耗/恢复两种能量方向
- 每日能量上限作为净消耗预算，恢复后可以继续使用
- 心情支持颜文字、今日心情小结和即时心情记录
- 月报用消耗/恢复双折线展示，并叠加心情点
- 纯静态页面可直接打开，也可用 `server.py` 开启局域网同步

## 技术

- 原生 HTML / CSS / JavaScript，无前端依赖
- LocalStorage 本地持久化
- 可选 Python HTTP 服务，让手机和电脑共用 `data.json`

## 本地运行

直接打开 `index.html`，或运行同步服务：

```bash
python server.py
```

然后访问 `http://localhost:8765/energy-diary/`。

## 注意

- `data.json` 是个人数据文件，已加入 `.gitignore`。
- 静态版本可以部署到 GitHub Pages；同步服务是可选功能。
