# Task Viewer

一个面向 AI 编程工作流的轻量任务查看器，用于把零散需求沉淀成结构化任务，并生成 Codex / Claude 可执行的开发提示词。

## 功能

- 从 `tasks.json` 加载结构化任务
- 按优先级、状态和关键词筛选任务
- 钉选当前任务，标记完成或跳过
- 将自然语言需求转换为结构化任务 JSON 提示词
- 为选中的任务生成 Codex / Claude 开发提示词
- 回填执行结果到 `implementation_runs`
- 导出合并当前状态后的 `tasks.json`

## 本地运行

浏览器直接打开 HTML 时，通常会因为 CORS 限制无法读取同目录的 `tasks.json`。建议使用本地 HTTP 服务：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000/task-viewer.html
```

## 文件结构

```text
.
├── task-viewer.html  # 单文件前端应用
├── tasks.json        # 结构化任务数据
└── README.md
```

## 数据说明

`tasks.json` 包含项目上下文、共享组件信息和任务列表。页面运行时会把用户操作状态保存到浏览器 `localStorage`，需要持久化时请使用页面里的导出功能生成新的 `tasks.json`。

## License

未指定。公开仓库不等同于开源授权；如需正式开源，建议补充 `LICENSE` 文件。
