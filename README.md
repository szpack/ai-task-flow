# AI Task Flow

AI Task Flow is a lightweight, local-first workflow tool for AI-assisted development. It turns rough ideas into structured task records, sends selected tasks to AI coding agents as precise prompts, and stores structured execution results back into the same task library.

中文名：AI 任务流转台。它把模糊需求转成结构化任务，并在 Codex / Claude 开发提示词、执行结果回填和任务追踪之间形成闭环。

## Features

- Load structured tasks from `tasks.json`
- Switch between Chinese and English automatically based on browser language, with manual language controls
- Filter tasks by priority, status, and keyword
- Pin the current task, mark tasks as done, or skip tasks
- Turn natural language requests into structured task JSON prompts
- Generate Codex / Claude development prompts from selected tasks
- Backfill execution results into `implementation_runs`
- Auto-save the current task library to browser `localStorage`
- Export the current task library as `tasks.json`

## Why Not A Normal Task Manager

AI Task Flow focuses on context handoff in AI-assisted development:

```text
Rough idea -> AI-structured task -> Task library -> Development prompt -> AI execution -> Structured result backfill
```

It helps turn product ideas, bugs, design changes, and technical debt into executable, verifiable, and backfillable task units, so humans and AI agents can collaborate around the same structured data.

## Local Run

Opening the HTML file directly may prevent the browser from reading `tasks.json` because of CORS restrictions. Use a local HTTP server instead:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Project Structure

```text
.
├── index.html                  # Single-file frontend app
├── tasks.json                  # Generic demo task data
├── examples/
│   └── golfscore-tasks.json    # Example task library from a real project
└── README.md
```

## Data Model

`tasks.json` contains project context, shared component notes, and task records. During use, the current task library is automatically saved to browser `localStorage`, so new tasks, status changes, and execution backfills survive refreshes, browser restarts, and machine restarts.

To sync local results back to Git, export a new `tasks.json`, replace the project file with it, and commit the change.

The root `tasks.json` is generic demo data and does not depend on any private project. `examples/golfscore-tasks.json` is a real-project example that mentions GolfScore / GolfHub, SwiftUI, and design tokens. Those are example task contents, not runtime dependencies of AI Task Flow.

AI Task Flow is a static HTML app. Its CSS variables are built into `index.html`; it does not require an external design system, Swift token files, or a build step.

## License

MIT
