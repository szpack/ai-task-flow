# AI Task Flow

AI 任务流转台：把模糊需求转成结构化任务，并在 Codex / Claude 开发提示词、执行结果回填和任务追踪之间形成闭环。

AI Task Flow is a lightweight, local-first workflow tool for AI-assisted development. It turns rough ideas into structured task records, sends selected tasks to AI coding agents as precise prompts, and stores structured execution results back into the same task library.

## 功能

- 从 `tasks.json` 加载结构化任务
- 按优先级、状态和关键词筛选任务
- 钉选当前任务，标记完成或跳过
- 将自然语言需求转换为结构化任务 JSON 提示词
- 为选中的任务生成 Codex / Claude 开发提示词
- 回填执行结果到 `implementation_runs`
- 导出合并当前状态后的 `tasks.json`

## 为什么不是普通任务管理器

AI Task Flow 关注的是 AI 开发过程里的上下文流转：

```text
模糊想法 -> AI 结构化任务 -> 入库追踪 -> 生成开发 Prompt -> AI 执行 -> 结构化结果回填
```

它适合把产品想法、Bug、设计调整和技术债整理成可执行、可验证、可回填的任务单元，让人和 AI Agent 围绕同一份结构化数据协作。

## 本地运行

浏览器直接打开 HTML 时，通常会因为 CORS 限制无法读取同目录的 `tasks.json`。建议使用本地 HTTP 服务：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000/
```

## 文件结构

```text
.
├── index.html  # 单文件前端应用
├── tasks.json  # 结构化任务数据
└── README.md
```

## 数据说明

`tasks.json` 包含项目上下文、共享组件信息和任务列表。页面运行时会把用户操作状态保存到浏览器 `localStorage`，需要持久化时请使用页面里的导出功能生成新的 `tasks.json`。

## License

MIT
