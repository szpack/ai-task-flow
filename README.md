# AI Task Flow

AI Task Flow turns rough ideas into executable, trackable, backfillable AI development tasks.

It is a lightweight, local-first workflow tool for AI-assisted development. It turns rough ideas into structured task records, sends selected tasks to AI coding agents as precise prompts, and stores structured execution results back into the same task library.

中文名：AI 任务流转台。它把模糊想法变成可执行、可追踪、可回填的 AI 开发任务。

## Features

- Load structured tasks from `tasks.json`
- Switch between Chinese and English automatically based on browser language, with manual language controls
- Filter tasks by priority, status, and keyword
- Pin the current task, mark tasks as done, or skip tasks
- Turn natural language requests into structured task JSON prompts
- Generate Codex / Claude development prompts from selected tasks
- Backfill execution results into `implementation_runs`
- Auto-save the current task library
- Export the current task library as `tasks.json`
- Display the current app version and maintain release notes in `CHANGELOG.md`
- Create tasks through a step-by-step intake wizard that separates user input, AI handoff, and JSON import

## Requirements

- A modern browser
- Python 3 for simple local use, or Node.js 18+ for shared LAN use
- No install step is required for the app itself

## Install

Clone or download this repository, then enter the project folder:

```bash
cd task-viewer
```

If you cloned with Git:

```bash
git clone <repo-url>
cd task-viewer
```

No `npm install` is needed. The app has no runtime dependencies.

## Start: One Computer

Use this when only one computer needs the task library:

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

In this mode, edits are saved in that browser's `localStorage`. Use **Export task library JSON** when you want to write the data back to a file or move it to another computer.

## Start: Multiple Computers

Use this when several computers on the same Wi-Fi/LAN should see and edit the same tasks:

```bash
npm run serve
```

On the host computer, open:

```text
http://localhost:8000/
```

On other computers, open the host computer's LAN address:

```text
http://<host-computer-ip>:8000/
```

Example:

```text
http://192.168.31.165:8000/
```

In shared-server mode, all computers read and save the same `tasks.json` file on the host computer. The server also keeps a `.taskflow-backup.json` backup before overwriting task data.

Find the host computer's current LAN IP on macOS:

```bash
ifconfig | grep "inet 192.168"
```

DHCP is fine, but the IP may change after reconnecting to Wi-Fi or restarting the router. For a stable URL, reserve this computer's IP address in your router's DHCP settings.

Use one shared URL for everyone. Do not mix `localhost`, `127.0.0.1`, and the LAN IP across different computers; `localhost` always means "this computer".

## Why Not A Normal Task Manager

AI Task Flow focuses on context handoff in AI-assisted development:

```text
Rough idea -> AI-structured task -> Task library -> Development prompt -> AI execution -> Structured result backfill
```

It helps turn product ideas, bugs, design changes, and technical debt into executable, verifiable, and backfillable task units, so humans and AI agents can collaborate around the same structured data.

## Versioning And Changelog

The current app version is stored in `VERSION`, mirrored in `package.json`, and displayed by the app header.

Use the bundled dependency-free Node script to bump versions:

```bash
npm run version:patch
npm run version:minor
npm run version:major
```

Set an exact version when needed:

```bash
npm run version:set -- 1.2.3
```

Add release notes while bumping:

```bash
npm run version:patch -- --notes "Fixed new task import reset"
```

The version script updates:

- `VERSION`
- `package.json`
- `app.js` `APP_VERSION`
- `CHANGELOG.md`

After a version bump, review `CHANGELOG.md`, commit the changes, and tag the release if needed:

```bash
git tag v$(cat VERSION)
```

## Project Structure

```text
.
├── index.html                  # Static HTML shell
├── styles.css                  # App styling
├── app.js                      # Browser app logic
├── server.mjs                  # Optional shared LAN server with JSON write API
├── tasks.json                  # Generic demo task data
├── VERSION                     # Current app version
├── CHANGELOG.md                # Release notes
├── package.json                # Local version-management scripts
├── scripts/
│   └── bump-version.mjs        # SemVer bump + changelog updater
├── examples/
│   └── golfscore-tasks.json    # Example task library from a real project
└── README.md
```

## Data Model

`tasks.json` contains project context, shared component notes, and task records.

In one-computer static-server mode, the current task library is saved to browser `localStorage`.

In shared-server mode, the current task library is written back to the host computer's `tasks.json`.

To sync local results back to Git from one-computer mode, export a new `tasks.json`, replace the project file with it, and commit the change.

The root `tasks.json` is generic demo data and does not depend on any private project. `examples/golfscore-tasks.json` is a real-project example that mentions GolfScore / GolfHub, SwiftUI, and design tokens. Those are example task contents, not runtime dependencies of AI Task Flow.

AI Task Flow is a static HTML/CSS/JavaScript app with an optional Node.js sharing server. It does not require an external design system, Swift token files, a dependency install, or a build step.

## License

MIT
