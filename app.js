// ============================================================
// State
// ============================================================
const STORAGE_KEY = 'ai-task-flow-state';
const WORKSPACE_STORAGE_KEY = 'ai-task-flow-workspace';
const WORKSPACE_BACKUP_STORAGE_KEY = 'ai-task-flow-workspace-backup';
const LEGACY_STORAGE_KEY = 'golfhub-task-viewer-state';
const LANG_STORAGE_KEY = 'ai-task-flow-lang';
const APP_VERSION = '0.2.0';
let sharedWorkspaceEnabled = false;

const I18N = {
  zh: {
    appTitle: 'AI 任务流转台',
    subtitle: '把模糊想法变成可执行、可追踪、可回填的 AI 开发任务',
    projectContextButton: '项目介绍',
    newTaskButton: '+ 新任务',
    loading: '正在加载 tasks.json...',
    statOpen: '待处理',
    statCurrent: '当前任务',
    statDone: '已完成',
    statSkipped: '已跳过',
    statP0Open: 'P0 待处理',
    runBackfillTitle: '执行结果回填',
    runBackfillCopy: '粘贴 Codex / Claude 输出的结构化结果，写入 implementation_runs。',
    applyRun: '回填执行结果',
    copyRunTemplate: '复制结果模板',
    runResultPlaceholder: '回填结果',
    priority: '优先级',
    status: '状态',
    all: '全部',
    open: '待处理',
    done: '已完成',
    skipped: '已跳过',
    searchPlaceholder: '搜索任务 ID / 标题 / 描述...',
    exportJson: '导出任务库 JSON',
    restoreBackup: '恢复上一版任务库',
    generateDevPrompt: '生成开发提示词',
    resetAll: '清除所有状态',
    collapseAll: '全部折叠',
    selectVisible: '选择当前筛选结果',
    clearSelection: '清空选择',
    devPromptPlaceholder: '选中任务后点击生成，这里会出现给 Codex / Claude 的开发提示词',
    copy: '复制',
    copyDevPrompt: '复制开发提示词',
    copyStructurePrompt: '复制结构化任务提示词',
    projectContextKicker: '项目介绍',
    projectContextTitle: '项目背景',
    projectContextCopy: '描述这些任务真正要服务的用户项目。任务 JSON 提示词和开发提示词都会引用这里的背景。',
    projectContextManualTab: '人工填写',
    projectContextJsonTab: 'JSON 导入',
    projectBriefLabel: '口述项目背景',
    projectBriefPlaceholder: '口述你的项目：产品是什么、用户是谁、仓库结构、技术栈、关键约束、AI 修改代码时要注意什么...',
    projectNameLabel: '项目名',
    projectPlatformLabel: '平台',
    projectTechStackLabel: '技术栈，每行 key: value',
    projectConventionsLabel: '工程约定，每行 key: value',
    projectExecutionModeLabel: '协作方式',
    projectTestStrategyLabel: '测试策略',
    saveProjectContext: '保存项目背景',
    projectContextSaved: '项目背景已保存',
    projectContextSummaryTitle: '当前项目背景',
    projectContextSummaryMissing: '还没有配置目标项目。生成提示词前建议先填写用户项目背景。',
    editProjectContext: '编辑项目介绍',
    projectContextJsonPromptPlaceholder: '复制这段提示词给 Codex，让它生成项目背景 JSON',
    copyProjectContextJsonPrompt: '复制项目背景 JSON 生成提示词',
    projectContextJsonImportTitle: '导入 JSON',
    projectContextJsonImportCopy: '粘贴 Codex 生成的项目背景 JSON，导入后会覆盖当前项目背景。',
    projectContextJsonInputPlaceholder: '粘贴项目背景 JSON...',
    projectContextJsonResultPlaceholder: '导入/校验结果',
    importProjectContextJson: '导入项目背景',
    projectContextJsonValid: '项目背景 JSON 有效',
    projectContextJsonImported: '项目背景 JSON 已导入',
    newTaskKicker: '新任务',
    newTaskTitle: '需求收集箱',
    newTaskCopy: '这里先把自然语言需求整理成任务 JSON；导入后系统会生成真正给 Codex 执行的开发提示词。',
    close: '关闭',
    backToWorkspace: '返回任务台',
    wizardBack: '上一步',
    wizardGotJson: '我拿到 JSON 了',
    naturalInputTitle: '自然语言输入',
    naturalInputCopy: '把需求用自己的话写下来。此步骤只让 AI 返回任务 JSON，不会执行代码。',
    typeBug: '缺陷',
    typeDesign: '设计',
    typeImprovement: '改进',
    typeFeature: '功能',
    typeRefactor: '重构',
    removeImage: '移除图片',
    intakeImageHelp: '可以把截图或参考图直接拖进输入框，作为需求补充。',
    intakePlaceholder: '把想到的问题、需求、现象、期望写在这里...',
    generateStructurePrompt: '生成任务 JSON 提示词',
    structurePromptTitle: '大模型交接提示词',
    structurePromptCopy: '复制这段提示词给大模型。它应该只返回任务 JSON；这一步还不是让它改代码。',
    structurePromptPlaceholder: '这里会生成“只返回任务 JSON”的提示词，不是执行代码提示词',
    jsonImportTitle: 'AI JSON 导入',
    jsonImportCopy: '粘贴 AI 生成的任务 JSON。导入后会自动生成可直接发给 Codex 的开发提示词。',
    importCurrentList: '导入到当前列表',
    validateJson: '校验 JSON',
    importResultPlaceholder: '导入/校验结果',
    workflowCollectTitle: '收集',
    workflowCollectCopy: '把模糊想法变成任务。',
    workflowCollectAction: '新建任务',
    workflowChooseTitle: '选择',
    workflowChooseCopy: '勾选要交给 AI 的任务。',
    workflowChooseAction: '查看任务库',
    workflowPromptTitle: '生成 Prompt',
    workflowPromptCopy: '把选中任务整理成开发提示词。',
    workflowPromptAction: '生成提示词',
    workflowBackfillTitle: '回填',
    workflowBackfillCopy: '把 AI 执行结果存回任务。',
    workflowBackfillAction: '回填结果',
    taskLibraryTitle: '任务库',
    taskLibraryCopy: '筛选、查看、选择或钉选任务。',
    promptSectionTitle: 'AI Prompt 交接',
    promptSectionCopy: '用选中任务生成开发提示词。',
    backfillSectionTitle: '执行结果回填',
    backfillSectionCopy: '把 AI 结果保存到任务记录。',
    footerText: '任务库自动保存到 localStorage · 导出 tasks.json 后可提交到 Git · 示例数据见',
    selectedCount: count => `已选 ${count} 个任务`,
    currentTask: '当前任务',
    inProgress: '进行中',
    copyId: '复制 ID',
    scrollTo: '滚动到',
    markDone: '标记完成',
    unpin: '取消钉选',
    noMatches: '没有匹配的任务',
    selectForPrompt: '选择用于生成提示词',
    untitled: '无标题',
    problem: '问题',
    expected: '期望结果',
    constraints: '约束',
    scopeHint: '影响范围',
    searchHints: '搜索线索',
    imageReferences: '图片引用',
    dependsOn: '依赖',
    blocks: '阻塞',
    implementationRuns: '执行记录',
    doneAction: '标记完成',
    doneMarked: '已完成',
    skipAction: '跳过/已修复',
    skippedMarked: '已跳过',
    pinCurrent: '钉为当前',
    pinned: '已钉选',
    reset: '重置',
    empty: '无',
    needsLocate: '需要先定位',
    completedExplain: '完成后说明验证结果',
    copied: '已复制',
    nothingToCopy: '没有可复制内容',
    currentMarkedDone: id => `${id} 已标记完成`,
    structurePromptReady: '已生成结构化任务提示词',
    devPromptReady: '已生成开发提示词',
    importSaved: '已导入任务',
    restoreBackupDone: '已恢复上一版任务库',
    restoreBackupMissing: '没有可恢复的上一版任务库',
    runSaved: '执行结果已回填并保存',
    exported: '已下载 tasks.json，可覆盖项目中的 tasks.json',
    resetDone: '已重置所有状态',
    needNaturalInput: '先填写自然语言需求',
    needSelection: '先选择至少 1 个任务',
    jsonValid: count => `JSON 有效，检测到 ${count} 个任务候选`,
    jsonInvalid: error => `JSON 无效：${error}`,
    importFailed: error => `导入失败：${error}`,
    runFailed: error => `回填失败：${error}`,
    missingTaskIds: '缺少 task_id 或 task_ids',
    taskNotFound: id => `找不到任务：${id}`,
    emptyContent: '内容为空',
    taskMustObject: 'task 必须是对象',
    missingTitle: '缺少 title',
    manualJsonError: error => `JSON 格式错误：${error}`,
    resetConfirm: '清除所有任务状态？进度条会归零。',
    runResultSaved: ids => `已回填：${ids.join(', ')}。已自动保存到本地，导出 tasks.json 后可提交到 Git。`,
    importedSummaryTitle: count => `已导入 ${count} 个任务`,
    importedSummaryHint: '导入后的结构化信息如下。当前任务库已自动保存到本地。',
    typeLabel: '类型',
    priorityLabel: '优先级',
    statusLabel: '状态',
    problemUnderstanding: '问题 / 需求理解',
    acceptance: '验收项',
    doneDefinition: '完成定义',
    loadingErrorTitle: '无法加载 tasks.json',
    loadingErrorBody: '本页面需要从同目录加载 tasks.json。',
    loadingErrorCors: '如果直接双击打开 HTML(file://)，浏览器会因 CORS 拒绝读取。',
    loadingErrorSolution: '解决方法：在该文件目录下跑一个本地 HTTP 服务，然后访问 http://localhost:8000/：',
    loadingErrorManual: '或者直接把 tasks.json 内容粘到下方的“手动加载”区：',
    manualJsonPlaceholder: '粘贴 tasks.json 内容...',
    load: '加载',
    autoCategory: 'AI 自动建议分类',
    categoryOther: '其他',
    categoryIdea: '想法收集',
    categoryTask: '结构化任务',
    categoryPrompt: 'AI 提示词',
    categoryRun: '执行回填',
    categoryGlobal: '全局体验',
    categoryBug: '缺陷修复',
    categoryFeature: '功能开发',
    categoryDesign: '设计体验',
    categoryImprovement: '体验改进',
    categoryRefactor: '代码重构',
    categoryDocs: '文档',
    categoryTest: '测试',
    categoryPerf: '性能优化',
    legacyMatchList: '球局列表页',
    legacyMultiScore: '多人记分页',
    legacyScorecard: '计分卡详情页',
    legacySbs: '逐杆记录',
    legacyMap: '卫星地图'
  },
  en: {
    appTitle: 'AI Task Flow',
    subtitle: 'Turn rough ideas into executable, trackable, backfillable AI development tasks',
    projectContextButton: 'Project Intro',
    newTaskButton: '+ New Task',
    loading: 'Loading tasks.json...',
    statOpen: 'Open',
    statCurrent: 'Current',
    statDone: 'Done',
    statSkipped: 'Skipped',
    statP0Open: 'P0 Open',
    runBackfillTitle: 'Execution Backfill',
    runBackfillCopy: 'Paste structured output from Codex or Claude and write it into implementation_runs.',
    applyRun: 'Apply result',
    copyRunTemplate: 'Copy result template',
    runResultPlaceholder: 'Backfill result',
    priority: 'Priority',
    status: 'Status',
    all: 'All',
    open: 'Open',
    done: 'Done',
    skipped: 'Skipped',
    searchPlaceholder: 'Search task ID, title, or description...',
    exportJson: 'Export task library JSON',
    restoreBackup: 'Restore previous library',
    generateDevPrompt: 'Generate development prompt',
    resetAll: 'Clear all status',
    collapseAll: 'Collapse all',
    selectVisible: 'Select filtered tasks',
    clearSelection: 'Clear selection',
    devPromptPlaceholder: 'Select tasks and generate a Codex / Claude development prompt here',
    copy: 'Copy',
    copyDevPrompt: 'Copy development prompt',
    copyStructurePrompt: 'Copy structured task prompt',
    projectContextKicker: 'Project Intro',
    projectContextTitle: 'Project background',
    projectContextCopy: 'Describe the user project these tasks should target. Task JSON prompts and development prompts both use this context.',
    projectContextManualTab: 'Manual',
    projectContextJsonTab: 'JSON import',
    projectBriefLabel: 'Spoken project background',
    projectBriefPlaceholder: 'Describe the product, users, repository shape, tech stack, constraints, and what AI should watch for when editing code...',
    projectNameLabel: 'Project name',
    projectPlatformLabel: 'Platform',
    projectTechStackLabel: 'Tech stack, one key: value per line',
    projectConventionsLabel: 'Engineering conventions, one key: value per line',
    projectExecutionModeLabel: 'Execution mode',
    projectTestStrategyLabel: 'Test strategy',
    saveProjectContext: 'Save project background',
    projectContextSaved: 'Project background saved',
    projectContextSummaryTitle: 'Current project context',
    projectContextSummaryMissing: 'No target project is configured yet. Add the user project background before generating prompts.',
    editProjectContext: 'Edit project intro',
    projectContextJsonPromptPlaceholder: 'Copy this prompt to Codex so it can generate project context JSON',
    copyProjectContextJsonPrompt: 'Copy project context JSON prompt',
    projectContextJsonImportTitle: 'Import JSON',
    projectContextJsonImportCopy: 'Paste project context JSON generated by Codex. Importing replaces the current project context.',
    projectContextJsonInputPlaceholder: 'Paste project context JSON...',
    projectContextJsonResultPlaceholder: 'Import / validation result',
    importProjectContextJson: 'Import project context',
    projectContextJsonValid: 'Project context JSON is valid',
    projectContextJsonImported: 'Project context JSON imported',
    newTaskKicker: 'New Task',
    newTaskTitle: 'Intake box',
    newTaskCopy: 'First structure the request into task JSON. After import, the app generates the actual development prompt for Codex.',
    close: 'Close',
    backToWorkspace: 'Back to workspace',
    wizardBack: 'Back',
    wizardGotJson: 'I have the JSON',
    naturalInputTitle: 'Natural language input',
    naturalInputCopy: 'Write the request in your own words. This step only asks AI to return task JSON; it does not execute code.',
    typeBug: 'bug',
    typeDesign: 'design',
    typeImprovement: 'improvement',
    typeFeature: 'feature',
    typeRefactor: 'refactor',
    removeImage: 'Remove image',
    intakeImageHelp: 'You can drag screenshots or reference images into the input box as extra context.',
    intakePlaceholder: 'Write the problem, request, observation, or expected result here...',
    generateStructurePrompt: 'Generate task JSON prompt',
    structurePromptTitle: 'Model handoff prompt',
    structurePromptCopy: 'Copy this prompt to your large model. It should return task JSON only; this is not the code-editing step.',
    structurePromptPlaceholder: 'This prompt only returns task JSON. It is not the code execution prompt.',
    jsonImportTitle: 'AI JSON Import',
    jsonImportCopy: 'Paste task JSON generated by AI. After import, the app will generate the Codex development prompt.',
    importCurrentList: 'Import into current list',
    validateJson: 'Validate JSON',
    importResultPlaceholder: 'Import / validation result',
    workflowCollectTitle: 'Capture',
    workflowCollectCopy: 'Create a task from a rough idea.',
    workflowCollectAction: 'New Task',
    workflowChooseTitle: 'Choose',
    workflowChooseCopy: 'Select one or more tasks for AI.',
    workflowChooseAction: 'Go to task library',
    workflowPromptTitle: 'Prompt',
    workflowPromptCopy: 'Generate a focused coding prompt.',
    workflowPromptAction: 'Generate prompt',
    workflowBackfillTitle: 'Backfill',
    workflowBackfillCopy: 'Paste AI results back into the task.',
    workflowBackfillAction: 'Backfill result',
    taskLibraryTitle: 'Task Library',
    taskLibraryCopy: 'Filter, inspect, select, or pin tasks.',
    promptSectionTitle: 'AI Prompt Handoff',
    promptSectionCopy: 'Use selected tasks to create a coding prompt.',
    backfillSectionTitle: 'Execution Backfill',
    backfillSectionCopy: 'Store the AI result with the task record.',
    footerText: 'Task library is auto-saved to localStorage · Export tasks.json to commit it to Git · Examples in',
    selectedCount: count => `${count} task${count === 1 ? '' : 's'} selected`,
    currentTask: 'Current task',
    inProgress: 'In progress',
    copyId: 'Copy ID',
    scrollTo: 'Scroll to',
    markDone: 'Mark done',
    unpin: 'Unpin',
    noMatches: 'No matching tasks',
    selectForPrompt: 'Select for prompt generation',
    untitled: 'Untitled',
    problem: 'Problem',
    expected: 'Expected',
    constraints: 'Constraints',
    scopeHint: 'Scope Hint',
    searchHints: 'Search Hints',
    imageReferences: 'Image References',
    dependsOn: 'Depends On',
    blocks: 'Blocks',
    implementationRuns: 'Implementation Runs',
    doneAction: 'Mark done',
    doneMarked: 'Done',
    skipAction: 'Skip / already fixed',
    skippedMarked: 'Skipped',
    pinCurrent: 'Pin current',
    pinned: 'Pinned',
    reset: 'Reset',
    empty: 'None',
    needsLocate: 'Locate first',
    completedExplain: 'Explain verification in the final response',
    copied: 'Copied',
    nothingToCopy: 'Nothing to copy',
    currentMarkedDone: id => `${id} marked done`,
    structurePromptReady: 'Structured task prompt generated',
    devPromptReady: 'Development prompt generated',
    importSaved: 'Task imported',
    restoreBackupDone: 'Previous task library restored',
    restoreBackupMissing: 'No previous task library backup found',
    runSaved: 'Execution result backfilled and saved',
    exported: 'Downloaded tasks.json. Use it to replace the project tasks.json when needed.',
    resetDone: 'All status cleared',
    needNaturalInput: 'Enter a natural language request first',
    needSelection: 'Select at least one task first',
    jsonValid: count => `Valid JSON. Found ${count} task candidate${count === 1 ? '' : 's'}.`,
    jsonInvalid: error => `Invalid JSON: ${error}`,
    importFailed: error => `Import failed: ${error}`,
    runFailed: error => `Backfill failed: ${error}`,
    missingTaskIds: 'Missing task_id or task_ids',
    taskNotFound: id => `Task not found: ${id}`,
    emptyContent: 'Content is empty',
    taskMustObject: 'task must be an object',
    missingTitle: 'Missing title',
    manualJsonError: error => `Invalid JSON: ${error}`,
    resetConfirm: 'Clear all task status? The progress bar will reset.',
    runResultSaved: ids => `Backfilled: ${ids.join(', ')}. Saved locally. Export tasks.json to commit it to Git.`,
    importedSummaryTitle: count => `Imported ${count} task${count === 1 ? '' : 's'}`,
    importedSummaryHint: 'Structured import summary. The current task library has been saved locally.',
    typeLabel: 'Type',
    priorityLabel: 'Priority',
    statusLabel: 'Status',
    problemUnderstanding: 'Problem / request understanding',
    acceptance: 'Acceptance',
    doneDefinition: 'Done Definition',
    loadingErrorTitle: 'Unable to load tasks.json',
    loadingErrorBody: 'This page needs to load tasks.json from the same directory.',
    loadingErrorCors: 'If you open the HTML file directly with file://, the browser may block the request because of CORS.',
    loadingErrorSolution: 'Solution: run a local HTTP server in this directory, then open http://localhost:8000/:',
    loadingErrorManual: 'Or paste the contents of tasks.json below and load it manually:',
    manualJsonPlaceholder: 'Paste tasks.json content...',
    load: 'Load',
    autoCategory: 'AI suggested category',
    categoryOther: 'Other',
    categoryIdea: 'Idea Intake',
    categoryTask: 'Structured Tasks',
    categoryPrompt: 'AI Prompts',
    categoryRun: 'Execution Backfill',
    categoryGlobal: 'Global Experience',
    categoryBug: 'Bugs',
    categoryFeature: 'Feature Work',
    categoryDesign: 'Design',
    categoryImprovement: 'Improvements',
    categoryRefactor: 'Refactors',
    categoryDocs: 'Docs',
    categoryTest: 'Tests',
    categoryPerf: 'Performance',
    legacyMatchList: 'Match List',
    legacyMultiScore: 'Multi Score',
    legacyScorecard: 'Scorecard',
    legacySbs: 'Shot-by-Shot',
    legacyMap: 'Map'
  }
};

let tasksData = null;
let intakeAttachments = [];
let newTaskStep = 0;
let state = {
  status: {},        // { taskId: 'open' | 'done' | 'skipped' }, only overrides base JSON
  current: null,     // current pinned task ID
  expanded: {},      // { taskId: true } for expanded cards
  selected: {},      // { taskId: true } for prompt generation
  filter: { priority: 'all', status: 'all', search: '' },
  lang: 'en'
};

function detectLanguage() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved === 'zh' || saved === 'en') return saved;
  return (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

state.lang = detectLanguage();

function t(key, ...args) {
  const value = (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;
  return typeof value === 'function' ? value(...args) : value;
}

function setLanguage(lang) {
  state.lang = lang === 'zh' ? 'zh' : 'en';
  localStorage.setItem(LANG_STORAGE_KEY, state.lang);
  applyI18n();
  if (window.location.hash === '#project-context') hydrateProjectContextForm();
  renderIntakeCategories();
  render();
  saveState();
}

function applyI18n() {
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
  document.getElementById('app-version').textContent = `v${APP_VERSION}`;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.setAttribute('title', t(el.dataset.i18nTitle));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === state.lang);
  });
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (stored) state = { ...state, ...JSON.parse(stored) };
  } catch (e) {}
  state.lang = detectLanguage();
  if (sharedWorkspaceEnabled) return;
  try {
    const workspace = localStorage.getItem(WORKSPACE_STORAGE_KEY);
    if (workspace) {
      const parsedWorkspace = JSON.parse(workspace);
      const defaultLibraryIsEmpty = Array.isArray(tasksData?.tasks) &&
        tasksData.tasks.length === 0 &&
        Array.isArray(tasksData?.project_context?.task_categories) &&
        tasksData.project_context.task_categories.length === 0;
      const isOldDemoWorkspace = parsedWorkspace?.project_context?.name === 'AI Task Flow Demo';
      const oldDemoTaskIds = ['IDEA_001', 'TASK_001', 'PROMPT_001', 'RUN_001', 'GLOBAL_001'];
      const parsedTaskIds = Array.isArray(parsedWorkspace?.tasks)
        ? parsedWorkspace.tasks.map(task => task?.id).filter(Boolean).sort()
        : [];
      const oldDemoSeedOnly = parsedTaskIds.length === oldDemoTaskIds.length &&
        oldDemoTaskIds.every(id => parsedTaskIds.includes(id));
      if (defaultLibraryIsEmpty && isOldDemoWorkspace && oldDemoSeedOnly) {
        localStorage.removeItem(WORKSPACE_STORAGE_KEY);
      } else {
        tasksData = parsedWorkspace;
      }
    }
  } catch (e) {}
}
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    status: state.status,
    current: state.current,
    expanded: state.expanded,
    selected: state.selected,
    lang: state.lang
  }));
}
function saveWorkspace() {
  if (!tasksData) return;
  const next = JSON.stringify(tasksData);
  if (sharedWorkspaceEnabled) {
    fetch('/api/workspace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: next
    }).catch(() => {
      localStorage.setItem(WORKSPACE_STORAGE_KEY, next);
    });
    return;
  }
  const current = localStorage.getItem(WORKSPACE_STORAGE_KEY);
  if (current && current !== next) {
    localStorage.setItem(WORKSPACE_BACKUP_STORAGE_KEY, current);
  }
  localStorage.setItem(WORKSPACE_STORAGE_KEY, next);
}

function restoreWorkspaceBackup() {
  if (sharedWorkspaceEnabled) {
    fetch('/api/workspace/restore-backup', { method: 'POST' })
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(data => {
        tasksData = data;
        renderIntakeCategories();
        render();
        showToast(t('restoreBackupDone'));
      })
      .catch(() => showToast(t('restoreBackupMissing')));
    return;
  }
  const backup = localStorage.getItem(WORKSPACE_BACKUP_STORAGE_KEY);
  if (!backup) {
    showToast(t('restoreBackupMissing'));
    return;
  }
  try {
    const current = localStorage.getItem(WORKSPACE_STORAGE_KEY);
    tasksData = JSON.parse(backup);
    if (current) localStorage.setItem(WORKSPACE_BACKUP_STORAGE_KEY, current);
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(tasksData));
    renderIntakeCategories();
    render();
    showToast(t('restoreBackupDone'));
  } catch (e) {
    showToast(t('importFailed', e.message));
  }
}

// ============================================================
// Load tasks.json
// ============================================================
async function loadTasks() {
  try {
    let res = await fetch('/api/workspace');
    if (res.ok) {
      sharedWorkspaceEnabled = true;
    } else {
      res = await fetch('tasks.json');
    }
    if (!res.ok) throw new Error('HTTP ' + res.status);
    tasksData = await res.json();
    document.getElementById('loading').style.display = 'none';
    loadState();
    applyI18n();
    renderIntakeCategories();
    render();
    syncRoute();
  } catch (e) {
    document.getElementById('loading').innerHTML = `
      <div class="loading-error">
        <strong>${t('loadingErrorTitle')}</strong><br><br>
        ${t('loadingErrorBody')}<br>
        ${t('loadingErrorCors')}<br><br>
        <strong>${t('loadingErrorSolution')}</strong><br><br>
        <code>python3 -m http.server 8000</code><br><br>
        ${t('loadingErrorManual')}<br>
        <textarea id="manual-json" rows="6" style="width: 100%; margin-top: 10px; font-family: 'SF Mono', monospace; font-size: 11px;" placeholder="${t('manualJsonPlaceholder')}"></textarea>
        <button id="btn-manual" style="margin-top: 8px; padding: 6px 14px; background: var(--ink); color: var(--bg-alt); border: none; border-radius: 4px; cursor: pointer;">${t('load')}</button>
      </div>
    `;
    document.getElementById('btn-manual')?.addEventListener('click', () => {
      try {
        const json = document.getElementById('manual-json').value;
        tasksData = JSON.parse(json);
        saveWorkspace();
        document.getElementById('loading').style.display = 'none';
        loadState();
        applyI18n();
        renderIntakeCategories();
        render();
        syncRoute();
      } catch (err) {
        alert(t('manualJsonError', err.message));
      }
    });
  }
}

// ============================================================
// Categorize tasks
// ============================================================
function getTasks() {
  if (!tasksData || !tasksData.tasks) return [];
  return tasksData.tasks;
}

function getTask(taskId) {
  return getTasks().find(t => t.id === taskId);
}

const AUTO_CATEGORY_VALUE = '__AUTO__';
const FALLBACK_TASK_CATEGORY = { prefix: 'TASK', labelKey: 'categoryTask' };
const DEFAULT_TASK_CATEGORIES = [];

const CATEGORY_LABEL_KEYS_BY_PREFIX = {
  IDEA: 'categoryIdea',
  TASK: 'categoryTask',
  PROMPT: 'categoryPrompt',
  RUN: 'categoryRun',
  GLOBAL: 'categoryGlobal',
  BUG: 'categoryBug',
  BUGS: 'categoryBug',
  FIX: 'categoryBug',
  FEATURE: 'categoryFeature',
  FEAT: 'categoryFeature',
  DESIGN: 'categoryDesign',
  UI: 'categoryDesign',
  UX: 'categoryDesign',
  IMPROVEMENT: 'categoryImprovement',
  ENHANCEMENT: 'categoryImprovement',
  REFACTOR: 'categoryRefactor',
  DOCS: 'categoryDocs',
  DOC: 'categoryDocs',
  TEST: 'categoryTest',
  TESTS: 'categoryTest',
  PERF: 'categoryPerf',
  PERFORMANCE: 'categoryPerf'
};

const LEGACY_TASK_CATEGORIES = [
  { prefix: 'MATCH_LIST', labelKey: 'legacyMatchList' },
  { prefix: 'MULTI_SCORE', labelKey: 'legacyMultiScore' },
  { prefix: 'SCORECARD', labelKey: 'legacyScorecard' },
  { prefix: 'SBS', labelKey: 'legacySbs' },
  { prefix: 'MAP', labelKey: 'legacyMap' }
];

function getProjectContext() {
  return (tasksData && tasksData.project_context) || {};
}

function getTaskCategories() {
  const categories = getProjectContext().task_categories;
  if (Array.isArray(categories) && categories.length) {
    return categories
      .filter(c => c && c.prefix)
      .map(c => {
        const prefix = String(c.prefix);
        const known = DEFAULT_TASK_CATEGORIES.find(item => item.prefix === prefix);
        return { prefix, label: c.label || prefix, labelKey: c.labelKey || known?.labelKey || CATEGORY_LABEL_KEYS_BY_PREFIX[prefix] };
      });
  }
  return [];
}

function categoryLabel(category) {
  if (!category) return t('categoryOther');
  return category.labelKey ? t(category.labelKey) : (category.label || category.prefix);
}

function categoryStorageLabel(category) {
  if (!category) return '';
  if (category.labelKey) return t(category.labelKey);
  if (category.label) return String(category.label).trim();
  const key = CATEGORY_LABEL_KEYS_BY_PREFIX[normalizeCategoryPrefix(category.prefix || category.name || '')];
  return key ? t(key) : String(category.prefix || category.name || '').trim();
}

function getAllKnownCategories() {
  const seen = new Set();
  return [...getTaskCategories(), ...DEFAULT_TASK_CATEGORIES, ...LEGACY_TASK_CATEGORIES]
    .filter(c => {
      if (seen.has(c.prefix)) return false;
      seen.add(c.prefix);
      return true;
    });
}

function categoryFromId(id) {
  const match = getAllKnownCategories()
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find(c => id === c.prefix || id.startsWith(c.prefix + '_'));
  if (match) return categoryLabel(match);
  const inferred = String(id || '').split('_').slice(0, -1).join('_');
  if (inferred) return inferred;
  return t('categoryOther');
}

function prefixFromCategory(category) {
  if (!category || category === AUTO_CATEGORY_VALUE) return FALLBACK_TASK_CATEGORY.prefix;
  if (typeof category === 'object') {
    return normalizeCategoryPrefix(category.prefix || category.label || category.name, FALLBACK_TASK_CATEGORY.prefix);
  }
  const match = getAllKnownCategories().find(c => c.prefix === category || c.label === category || categoryLabel(c) === category);
  return match ? match.prefix : normalizeCategoryPrefix(category, FALLBACK_TASK_CATEGORY.prefix);
}

function normalizeCategoryPrefix(value, fallback = FALLBACK_TASK_CATEGORY.prefix) {
  const normalized = String(value || '')
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();
  return normalized || fallback;
}

function ensureTaskCategory(category) {
  if (!tasksData) return null;
  if (!tasksData.project_context) tasksData.project_context = {};
  if (!Array.isArray(tasksData.project_context.task_categories)) {
    tasksData.project_context.task_categories = [];
  }
  const prefix = normalizeCategoryPrefix(category?.prefix || category?.label || category?.name);
  const labelKey = category?.labelKey || CATEGORY_LABEL_KEYS_BY_PREFIX[prefix];
  const label = categoryStorageLabel({ ...category, prefix, labelKey }) || prefix;
  const existing = tasksData.project_context.task_categories.find(c => c.prefix === prefix);
  if (existing) {
    if (!existing.label && label) existing.label = label;
    if (!existing.labelKey && labelKey) existing.labelKey = labelKey;
    return existing;
  }
  const created = labelKey ? { prefix, label, labelKey } : { prefix, label };
  tasksData.project_context.task_categories.push(created);
  return created;
}

function categorySuggestionFromRaw(raw, preferredPrefix) {
  const task = raw?.task && typeof raw.task === 'object' ? raw.task : raw;
  const suggestion = raw?.category_suggestion || raw?.suggested_category || raw?.task_category || task?.category_suggestion;
  if (suggestion && typeof suggestion === 'object') return suggestion;
  if (task?.category && typeof task.category === 'object') return task.category;
  if (typeof suggestion === 'string') return { label: suggestion, prefix: suggestion };
  if (typeof task?.category === 'string') return { label: task.category, prefix: task.category };
  if (preferredPrefix === AUTO_CATEGORY_VALUE) return { ...FALLBACK_TASK_CATEGORY, label: t(FALLBACK_TASK_CATEGORY.labelKey) };
  return { prefix: preferredPrefix, label: preferredPrefix };
}

function getCategoryOrder() {
  return [...getTaskCategories(), ...LEGACY_TASK_CATEGORIES]
    .map(categoryLabel)
    .concat(t('categoryOther'));
}

function renderIntakeCategories() {
  const select = document.getElementById('intake-category');
  if (!select) return;
  select.innerHTML = `<option value="${AUTO_CATEGORY_VALUE}">${escapeHTML(t('autoCategory'))}</option>` + getTaskCategories()
    .map(c => `<option value="${escapeHTML(c.prefix)}">${escapeHTML(categoryLabel(c))}</option>`)
    .join('');
}

// ============================================================
// Status helpers
// ============================================================
function getStatus(taskId) {
  if (Object.prototype.hasOwnProperty.call(state.status, taskId)) {
    return state.status[taskId];
  }
  return getTask(taskId)?.status || 'open';
}
function setStatus(taskId, status) {
  const task = getTask(taskId);
  const base = task?.status || 'open';
  if (status === base) {
    delete state.status[taskId];
  } else {
    state.status[taskId] = status;
  }
  if (task) task.status = status;
  saveWorkspace();
  saveState();
  render();
}

// ============================================================
// Render
// ============================================================
function render() {
  renderCurrentPin();
  renderProjectContextSummary();
  renderStats();
  renderFilters();
  renderSelection();
  renderTasks();
}

function renderCurrentPin() {
  const pin = document.getElementById('current-pin');
  const tasks = getTasks();
  const current = tasks.find(t => t.id === state.current);

  if (!current) {
    pin.className = '';
    pin.style.display = 'none';
    pin.innerHTML = '';
    return;
  }

  const status = getStatus(current.id);
  pin.style.display = 'block';
  pin.className = 'current-pin';
  pin.innerHTML = `
    <div class="pin-label">${t('currentTask')} · ${status === 'open' ? t('inProgress') : t(status)}</div>
    <div class="pin-task-id">${current.id} · ${current.priority || ''} · ${current.type || ''}</div>
    <div class="pin-title">${current.title || ''}</div>
    <div class="pin-actions">
      <button class="pin-btn" onclick="copyText('${current.id}')">${t('copyId')}</button>
      <button class="pin-btn" onclick="scrollToTask('${current.id}')">${t('scrollTo')}</button>
      <button class="pin-btn" onclick="markCurrentDone()">✓ ${t('markDone')}</button>
      <button class="pin-btn" onclick="unpinCurrent()">${t('unpin')}</button>
    </div>
  `;
}

function renderStats() {
  const tasks = getTasks();
  const counts = { open: 0, done: 0, skipped: 0, p0Open: 0 };
  tasks.forEach(t => {
    const s = getStatus(t.id);
    counts[s]++;
    if (s === 'open' && t.priority === 'P0') counts.p0Open++;
  });
  document.getElementById('stat-open').textContent = counts.open;
  document.getElementById('stat-progress').textContent = state.current ? 1 : 0;
  document.getElementById('stat-done').textContent = counts.done;
  document.getElementById('stat-skipped').textContent = counts.skipped;
  document.getElementById('stat-p0').textContent = counts.p0Open;

  const total = tasks.length;
  document.getElementById('bar-done').style.width = (total ? counts.done / total * 100 : 0) + '%';
  document.getElementById('bar-skipped').style.width = (total ? counts.skipped / total * 100 : 0) + '%';
}

function renderFilters() {
  document.querySelectorAll('[data-priority]').forEach(b => {
    b.classList.toggle('active', b.dataset.priority === state.filter.priority);
  });
  document.querySelectorAll('[data-status]').forEach(b => {
    b.classList.toggle('active', b.dataset.status === state.filter.status);
  });
}

function renderSelection() {
  const ids = selectedTaskIds();
  document.getElementById('selection-count').textContent = t('selectedCount', ids.length);
}

function matchesFilter(task) {
  const p = state.filter.priority;
  const s = state.filter.status;
  const q = state.filter.search.toLowerCase().trim();
  const taskStatus = getStatus(task.id);

  if (p !== 'all' && task.priority !== p) return false;
  if (s !== 'all' && taskStatus !== s) return false;
  if (q) {
    const text = `${task.id} ${task.title || ''} ${task.problem || ''} ${task.expected || ''}`.toLowerCase();
    if (!text.includes(q)) return false;
  }
  return true;
}

function renderTasks() {
  const list = document.getElementById('task-list');
  const tasks = getTasks();
  const grouped = {};
  tasks.forEach(t => {
    const cat = categoryFromId(t.id);
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(t);
  });

  list.innerHTML = '';
  const categoryOrder = getCategoryOrder();
  const categories = categoryOrder.concat(Object.keys(grouped).filter(cat => !categoryOrder.includes(cat)).sort());
  categories.forEach(cat => {
    const items = (grouped[cat] || []).filter(matchesFilter);
    if (items.length === 0) return;

    const allInCat = grouped[cat] || [];
    const doneInCat = allInCat.filter(t => getStatus(t.id) === 'done').length;

    const catEl = document.createElement('div');
    catEl.className = 'category';
    catEl.innerHTML = `
      <div class="category-header">
        <span>${cat}</span>
        <span class="category-count">${doneInCat}/${allInCat.length}</span>
      </div>
    `;
    items.forEach(t => catEl.appendChild(makeTaskCard(t)));
    list.appendChild(catEl);
  });

  if (list.children.length === 0) {
    list.innerHTML = `<div class="loading">${t('noMatches')}</div>`;
  }
}

function makeTaskCard(task) {
  const status = getStatus(task.id);
  const isCurrent = state.current === task.id;
  const isExpanded = state.expanded[task.id];
  const isSelected = !!state.selected[task.id];
  const runs = Array.isArray(task.implementation_runs) ? task.implementation_runs : [];

  const card = document.createElement('div');
  card.className = 'task ' + status + (isCurrent ? ' current' : '') + (isExpanded ? ' expanded' : '');
  card.id = 'task-' + task.id;

  const statusIcon = status === 'done' ? '✓' : status === 'skipped' ? '⏭' : isCurrent ? '★' : '';

  card.innerHTML = `
    <div class="task-header">
      <input class="task-select" type="checkbox" data-action="select" data-id="${task.id}" ${isSelected ? 'checked' : ''} title="${t('selectForPrompt')}">
      <div class="task-status-icon">${statusIcon}</div>
      <span class="task-priority ${(task.priority || 'P2').toLowerCase()}">${task.priority || ''}</span>
      <span class="task-id">${task.id}</span>
      <span class="task-title">${task.title || '(' + t('untitled') + ')'}</span>
      <span class="task-toggle">▶</span>
    </div>
    <div class="task-detail">
      ${task.problem ? `<div class="detail-section"><div class="detail-label">${t('problem')}</div><div class="detail-content">${task.problem}</div></div>` : ''}
      ${task.expected ? `<div class="detail-section"><div class="detail-label">${t('expected')}</div><div class="detail-content">${task.expected}</div></div>` : ''}
      ${task.constraints && task.constraints.length ? `<div class="detail-section"><div class="detail-label">${t('constraints')}</div><div class="detail-content"><ul>${task.constraints.map(c => '<li>' + c + '</li>').join('')}</ul></div></div>` : ''}
      ${task.scope && task.scope.allowed_paths_hint && task.scope.allowed_paths_hint.length ? `<div class="detail-section"><div class="detail-label">${t('scopeHint')}</div><div class="detail-content">${task.scope.allowed_paths_hint.map(p => '<code>' + p + '</code>').join(' · ')}</div></div>` : ''}
      ${task.anchors && task.anchors.search_hints && task.anchors.search_hints.length ? `<div class="detail-section"><div class="detail-label">${t('searchHints')}</div><div class="detail-content">${task.anchors.search_hints.map(p => '<code>' + p + '</code>').join(' · ')}</div></div>` : ''}
      ${task.image_references && task.image_references.length ? `<div class="detail-section"><div class="detail-label">${t('imageReferences')}</div><div class="detail-content">${task.image_references.map(ref => '<code>' + escapeHTML(ref.path_hint || ref.path || ref.name) + '</code>').join(' · ')}</div></div>` : ''}
      ${task.depends_on && task.depends_on.length ? `<div class="detail-section"><div class="detail-label">${t('dependsOn')}</div><div class="detail-content">${task.depends_on.map(p => '<span class="task-tag">' + p + '</span>').join('')}</div></div>` : ''}
      ${task.blocks && task.blocks.length ? `<div class="detail-section"><div class="detail-label">${t('blocks')}</div><div class="detail-content">${task.blocks.map(p => '<span class="task-tag">' + p + '</span>').join('')}</div></div>` : ''}
      ${runs.length ? `<div class="detail-section"><div class="detail-label">${t('implementationRuns')}</div><div class="detail-content">${runs.map(runSummaryHTML).join('')}</div></div>` : ''}
      <div class="task-actions">
        <button class="task-action-btn done-btn" data-action="done" data-id="${task.id}">${status === 'done' ? '✓ ' + t('doneMarked') : '✓ ' + t('doneAction')}</button>
        <button class="task-action-btn skip-btn" data-action="skipped" data-id="${task.id}">${status === 'skipped' ? '⏭ ' + t('skippedMarked') : '⏭ ' + t('skipAction')}</button>
        <button class="task-action-btn pin-btn ${isCurrent ? 'active' : ''}" data-action="pin" data-id="${task.id}">${isCurrent ? '📌 ' + t('pinned') : '📌 ' + t('pinCurrent')}</button>
        ${status !== 'open' ? `<button class="task-action-btn reset-btn" data-action="reset" data-id="${task.id}">↺ ${t('reset')}</button>` : ''}
        <button class="task-action-btn" data-action="copy" data-id="${task.id}">${t('copyId')}</button>
      </div>
    </div>
  `;

  // Header click: toggle expand
  card.querySelector('.task-header').addEventListener('click', () => {
    state.expanded[task.id] = !state.expanded[task.id];
    saveState();
    render();
  });

  // Action buttons
  card.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      handleAction(action, id);
    });
  });

  return card;
}

function handleAction(action, id) {
  if (action === 'done' || action === 'skipped') {
    const current = getStatus(id);
    setStatus(id, current === action ? 'open' : action);
    if (state.current === id && action !== 'open') {
      state.current = null;
      saveState();
    }
  } else if (action === 'reset') {
    setStatus(id, 'open');
  } else if (action === 'pin') {
    state.current = state.current === id ? null : id;
    saveState();
    render();
  } else if (action === 'copy') {
    copyText(id);
  } else if (action === 'select') {
    state.selected[id] = !state.selected[id];
    if (!state.selected[id]) delete state.selected[id];
    saveState();
    renderSelection();
  }
}

function selectedTaskIds() {
  return Object.keys(state.selected).filter(id => getTask(id));
}

function selectedTasks() {
  return selectedTaskIds().map(getTask).filter(Boolean);
}

function visibleTasks() {
  return getTasks().filter(matchesFilter);
}

function nextTaskId(prefix) {
  const re = new RegExp('^' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '_(\\d+)$');
  const max = getTasks().reduce((m, t) => {
    const match = String(t.id || '').match(re);
    return match ? Math.max(m, Number(match[1])) : m;
  }, 0);
  return `${prefix}_${String(max + 1).padStart(3, '0')}`;
}

function parseJSONLoose(text) {
  const trimmed = text.trim();
  if (!trimmed) throw new Error(t('emptyContent'));
  const parseMaybeRepaired = value => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return JSON.parse(escapeControlCharsInJsonStrings(value));
    }
  };
  try {
    return parseMaybeRepaired(trimmed);
  } catch (firstError) {
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenced) return parseMaybeRepaired(fenced[1].trim());
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start >= 0 && end > start) return parseMaybeRepaired(trimmed.slice(start, end + 1));
    throw firstError;
  }
}

function escapeControlCharsInJsonStrings(value) {
  let output = '';
  let inString = false;
  let escaped = false;
  for (const char of value) {
    if (!inString) {
      output += char;
      if (char === '"') inString = true;
      continue;
    }
    if (escaped) {
      output += char;
      escaped = false;
      continue;
    }
    if (char === '\\') {
      output += char;
      escaped = true;
      continue;
    }
    if (char === '"') {
      output += char;
      inString = false;
      continue;
    }
    if (char === '\n') {
      output += '\\n';
    } else if (char === '\r') {
      output += '\\r';
    } else if (char === '\t') {
      output += '\\t';
    } else if (char < ' ') {
      output += `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`;
    } else {
      output += char;
    }
  }
  return output;
}

function normalizeImportedTask(raw, preferredPrefix) {
  const task = raw.task ? raw.task : raw;
  if (!task || typeof task !== 'object' || Array.isArray(task)) {
    throw new Error(t('taskMustObject'));
  }
  if (!task.title) throw new Error(t('missingTitle'));
  const ensuredCategory = ensureTaskCategory(categorySuggestionFromRaw(raw, preferredPrefix));
  const prefix = ensuredCategory?.prefix || prefixFromCategory(task.category || task.area || preferredPrefix);
  const id = task.id || nextTaskId(prefix);
  return {
    id,
    title: task.title,
    type: task.type || 'improvement',
    priority: task.priority || 'P2',
    status: task.status || 'open',
    depends_on: task.depends_on || [],
    blocks: task.blocks || [],
    scope: task.scope || { allowed_paths_hint: [] },
    anchors: task.anchors || { search_hints: [] },
    problem: task.problem || task.description || '',
    expected: task.expected || '',
    constraints: task.constraints || [],
    acceptance: task.acceptance || { manual_checks: [] },
    done_definition: task.done_definition || [],
    tracking: task.tracking || {
      branch: `${task.type || 'feat'}/${id}-${slugify(task.title)}`,
      commit_prefix: `${task.type || 'feat'}(${prefix.toLowerCase().replaceAll('_', '-')})`,
      pr_title: `[${id}] ${task.title}`
    },
    raw_inputs: task.raw_inputs || [],
    image_references: task.image_references || [],
    implementation_runs: task.implementation_runs || []
  };
}

function formatTaskListValue(value, fallback = t('empty')) {
  if (!value) return fallback;
  if (Array.isArray(value)) {
    if (!value.length) return fallback;
    return value.map(item => `- ${typeof item === 'string' ? item : JSON.stringify(item)}`).join('\n');
  }
  return String(value);
}

function formatImportedTaskSummary(task) {
  const scope = task.scope || {};
  const anchors = task.anchors || {};
  const acceptance = task.acceptance || {};
  return [
    `${task.id} · ${task.title}`,
    `${t('typeLabel')}: ${task.type || 'improvement'}    ${t('priorityLabel')}: ${task.priority || 'P2'}    ${t('statusLabel')}: ${task.status || 'open'}`,
    '',
    `${t('problemUnderstanding')}:`,
    task.problem || t('empty'),
    '',
    `${t('expected')}:`,
    task.expected || t('empty'),
    '',
    `${t('constraints')}:`,
    formatTaskListValue(task.constraints),
    '',
    `${t('scopeHint')}:`,
    formatTaskListValue(scope.allowed_paths_hint),
    '',
    `${t('searchHints')}:`,
    formatTaskListValue(anchors.search_hints),
    '',
    `${t('acceptance')}:`,
    formatTaskListValue(acceptance.manual_checks || acceptance.unit_tests || acceptance.ui_tests),
    '',
    `${t('doneDefinition')}:`,
    formatTaskListValue(task.done_definition)
  ].join('\n');
}

function formatImportedTasksSummary(tasks) {
  return [
    t('importedSummaryTitle', tasks.length),
    t('importedSummaryHint'),
    '',
    tasks.map(formatImportedTaskSummary).join('\n\n' + '-'.repeat(48) + '\n\n')
  ].join('\n');
}

function slugify(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'task';
}

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function runSummaryHTML(run) {
  const status = run.status || 'unknown';
  const commit = run.commit ? ` · ${run.commit}` : '';
  const when = run.completed_at || run.at || '';
  return `
    <div class="implementation-run">
      <strong>${escapeHTML(status)}</strong>${escapeHTML(commit)}
      ${when ? `<span> · ${escapeHTML(when)}</span>` : ''}<br>
      ${escapeHTML(run.summary || '')}
    </div>
  `;
}

function formatObjectAsLines(value) {
  if (!value || typeof value !== 'object') return '- Not specified';
  return Object.entries(value)
    .map(([key, item]) => `- ${key}: ${Array.isArray(item) ? item.join(', ') : item}`)
    .join('\n') || '- Not specified';
}

function formatObjectForTextarea(value) {
  if (!value || typeof value !== 'object') return '';
  return Object.entries(value)
    .map(([key, item]) => `${key}: ${Array.isArray(item) ? item.join(', ') : item}`)
    .join('\n');
}

function parseKeyValueLines(value) {
  return String(value || '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .reduce((result, line) => {
      const index = line.indexOf(':');
      if (index === -1) return result;
      const key = line.slice(0, index).trim();
      const raw = line.slice(index + 1).trim();
      if (!key || !raw) return result;
      result[key] = raw.includes(',') ? raw.split(',').map(item => item.trim()).filter(Boolean) : raw;
      return result;
    }, {});
}

function projectContextSchemaExample() {
  return {
    name: 'Project name',
    description: 'What the product is, who uses it, and the main workflow AI tasks should understand.',
    platform: 'Web | iOS | Android | Backend | Desktop | Other',
    tech_stack: {
      language: 'Primary language(s)',
      runtime: 'Runtime or framework',
      data: 'Storage or data layer'
    },
    execution_mode: 'human_ai_collaboration',
    test_strategy: 'manual_and_targeted_automated_checks',
    tracking_system: 'tasks_json',
    task_categories: [
      { prefix: 'FEATURE', label: 'Feature work' },
      { prefix: 'BUG', label: 'Bugs' }
    ],
    conventions: {
      branch_pattern: '{type}/{TASK_ID}-{kebab-summary}',
      commit_message_pattern: '{type}({scope}): {subject}',
      commit_types: ['fix', 'feat', 'refactor', 'style', 'perf', 'test', 'docs'],
      pr_title_pattern: '[{TASK_ID}] {title}'
    }
  };
}

function buildProjectContextJsonPrompt() {
  const schema = JSON.stringify(projectContextSchemaExample(), null, 2);
  if (state.lang === 'en') {
    return `Read the current repository and generate a project context JSON object for AI Task Flow.

Requirements:
- Return JSON only. Do not include Markdown or explanations.
- Describe only the current project. Do not create a multi-project list.
- Use concise, accurate values based on the repository.
- Include task_categories only for reusable task ID prefixes that make sense for this project.
- Use this exact shape:

${schema}`;
  }
  return `请阅读当前仓库，并为 AI Task Flow 生成项目背景 JSON。

要求：
- 只返回 JSON，不要 Markdown，不要解释。
- 只描述当前项目，不要生成多项目列表。
- 根据仓库实际情况填写，保持简洁准确。
- task_categories 只放适合当前项目复用的任务 ID 前缀。
- 使用这个结构：

${schema}`;
}

function normalizeProjectContextJson(value) {
  const context = value?.project_context && typeof value.project_context === 'object'
    ? value.project_context
    : value;
  if (!context || typeof context !== 'object' || Array.isArray(context)) {
    throw new Error('project_context must be an object');
  }
  if (!context.name || !context.description) {
    throw new Error('Missing required fields: name, description');
  }
  return {
    name: String(context.name || '').trim(),
    description: String(context.description || '').trim(),
    platform: String(context.platform || '').trim(),
    tech_stack: context.tech_stack && typeof context.tech_stack === 'object' && !Array.isArray(context.tech_stack) ? context.tech_stack : {},
    execution_mode: String(context.execution_mode || '').trim(),
    test_strategy: String(context.test_strategy || '').trim(),
    tracking_system: String(context.tracking_system || 'tasks_json').trim(),
    task_categories: Array.isArray(context.task_categories)
      ? context.task_categories
        .filter(c => c && (c.prefix || c.label))
        .map(c => ({
          prefix: normalizeCategoryPrefix(c.prefix || c.label),
          label: String(c.label || c.prefix || '').trim(),
          ...(c.labelKey ? { labelKey: String(c.labelKey).trim() } : {})
        }))
      : [],
    conventions: context.conventions && typeof context.conventions === 'object' && !Array.isArray(context.conventions) ? context.conventions : {}
  };
}

function isDefaultProjectContext(context) {
  return context?.name === 'AI Task Flow' &&
    context?.description === 'A generic task flow workspace for collecting requirements, structuring tasks, handing them to AI, and backfilling execution results.';
}

function renderProjectContextSummary() {
  const el = document.getElementById('project-context-summary');
  if (!el) return;
  const context = getProjectContext();
  const isMissing = !context.name || isDefaultProjectContext(context);
  const name = isMissing ? t('projectContextSummaryTitle') : context.name;
  const meta = isMissing
    ? t('projectContextSummaryMissing')
    : [context.platform, context.description].filter(Boolean).join(' · ');
  el.innerHTML = `
    <div class="project-context-card">
      <div>
        <div class="project-context-name">${escapeHTML(name)}</div>
        <div class="project-context-meta ${isMissing ? 'project-context-warning' : ''}">${escapeHTML(meta || t('empty'))}</div>
      </div>
      <button class="action-btn" id="btn-edit-project-context-inline" data-i18n="editProjectContext">${escapeHTML(t('editProjectContext'))}</button>
    </div>
  `;
  document.getElementById('btn-edit-project-context-inline')?.addEventListener('click', openProjectContextPage);
}

function hydrateProjectContextForm() {
  const rawContext = getProjectContext();
  const context = isDefaultProjectContext(rawContext) ? {} : rawContext;
  document.getElementById('project-description').value = context.description || '';
  document.getElementById('project-name').value = context.name || '';
  document.getElementById('project-platform').value = context.platform || '';
  document.getElementById('project-tech-stack').value = formatObjectForTextarea(context.tech_stack);
  document.getElementById('project-conventions').value = formatObjectForTextarea(context.conventions);
  document.getElementById('project-execution-mode').value = context.execution_mode || '';
  document.getElementById('project-test-strategy').value = context.test_strategy || '';
  document.getElementById('project-context-json-prompt').value = buildProjectContextJsonPrompt();
  document.getElementById('project-context-json-result').value = '';
}

function saveProjectContextFromForm() {
  if (!tasksData) return;
  const current = getProjectContext();
  const next = {
    ...current,
    name: document.getElementById('project-name').value.trim(),
    description: document.getElementById('project-description').value.trim(),
    platform: document.getElementById('project-platform').value.trim(),
    tech_stack: parseKeyValueLines(document.getElementById('project-tech-stack').value),
    execution_mode: document.getElementById('project-execution-mode').value.trim(),
    test_strategy: document.getElementById('project-test-strategy').value.trim(),
    conventions: parseKeyValueLines(document.getElementById('project-conventions').value)
  };
  tasksData.project_context = Object.fromEntries(Object.entries(next).filter(([, value]) => {
    if (Array.isArray(value)) return true;
    if (value && typeof value === 'object') return Object.keys(value).length > 0;
    return Boolean(value);
  }));
  saveWorkspace();
  renderIntakeCategories();
  render();
  closeProjectContextPage();
  showToast(t('projectContextSaved'));
}

function importProjectContextJson() {
  const value = parseJSONLoose(document.getElementById('project-context-json-input').value);
  tasksData.project_context = normalizeProjectContextJson(value);
  saveWorkspace();
  renderIntakeCategories();
  render();
  hydrateProjectContextForm();
  document.getElementById('project-context-json-result').value = t('projectContextJsonImported');
  showToast(t('projectContextJsonImported'));
}

function validateProjectContextJson() {
  const value = parseJSONLoose(document.getElementById('project-context-json-input').value);
  normalizeProjectContextJson(value);
  document.getElementById('project-context-json-result').value = t('projectContextJsonValid');
}

function projectContextPromptBlock() {
  const rawContext = getProjectContext();
  const context = isDefaultProjectContext(rawContext) ? {} : rawContext;
  const conventions = context.conventions || {};
  return [
    `- Project: ${context.name || 'Current project'}`,
    context.description ? `- Description: ${context.description}` : '',
    context.platform ? `- Platform: ${context.platform}` : '',
    '- Tech stack:',
    formatObjectAsLines(context.tech_stack),
    context.execution_mode ? `- Execution mode: ${context.execution_mode}` : '',
    context.test_strategy ? `- Test strategy: ${context.test_strategy}` : '',
    Object.keys(conventions).length ? '- Conventions:' : '',
    Object.keys(conventions).length ? formatObjectAsLines(conventions) : ''
  ].filter(Boolean).join('\n');
}

function promptProjectName() {
  const context = getProjectContext();
  if (!context.name || isDefaultProjectContext(context)) return '';
  return context.name;
}

function imageReferenceFromFile(file) {
  const exposedPath = file.path || file.webkitRelativePath || '';
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: file.name,
    type: file.type || 'image',
    size: file.size || 0,
    path_hint: exposedPath || `./attachments/${file.name}`,
    path_is_exact: Boolean(exposedPath),
    object_url: URL.createObjectURL(file)
  };
}

function renderIntakeAttachments() {
  const tray = document.getElementById('intake-attachments');
  if (!tray) return;
  tray.classList.toggle('has-items', intakeAttachments.length > 0);
  tray.innerHTML = intakeAttachments.map(item => `
    <div class="intake-attachment" title="${escapeHTML(item.path_hint)}">
      <span>${escapeHTML(item.name)}${item.size ? ` · ${escapeHTML(formatBytes(item.size))}` : ''}</span>
      <button type="button" data-remove-intake-image="${escapeHTML(item.id)}" aria-label="${escapeHTML(t('removeImage'))}" title="${escapeHTML(t('removeImage'))}">×</button>
    </div>
  `).join('');
  tray.querySelectorAll('[data-remove-intake-image]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.removeIntakeImage;
      const found = intakeAttachments.find(item => item.id === id);
      if (found?.object_url) URL.revokeObjectURL(found.object_url);
      intakeAttachments = intakeAttachments.filter(item => item.id !== id);
      renderIntakeAttachments();
    });
  });
}

function addIntakeImageFiles(files) {
  const images = Array.from(files || []).filter(file => file.type?.startsWith('image/'));
  if (!images.length) return;
  images.forEach(file => {
    const duplicate = intakeAttachments.some(item => item.name === file.name && item.size === file.size);
    if (!duplicate) intakeAttachments.push(imageReferenceFromFile(file));
  });
  renderIntakeAttachments();
}

function intakeImagePromptBlock() {
  if (!intakeAttachments.length) return '';
  const refs = intakeAttachments.map(item => ({
    name: item.name,
    type: item.type,
    size: item.size,
    path_hint: item.path_hint,
    path_note: item.path_is_exact
      ? 'Path was exposed by the browser.'
      : 'Browser drag-and-drop did not expose the absolute local path. If Codex needs to inspect this image, place or upload the file at this path_hint.'
  }));
  return JSON.stringify(refs, null, 2);
}

function buildStructurePrompt() {
  const raw = document.getElementById('intake-text').value.trim();
  const category = document.getElementById('intake-category').value;
  const type = document.getElementById('intake-type').value;
  if (!raw) {
    showToast(t('needNaturalInput'));
    return '';
  }
  const prefix = prefixFromCategory(category);
  const suggestedPrefix = category === AUTO_CATEGORY_VALUE ? 'AI_CHOSEN_PREFIX' : prefix;
  const existingCategories = getTaskCategories().map(c => `${c.prefix} (${categoryLabel(c)})`).join(', ');
  const imageReferences = intakeImagePromptBlock();
  if (state.lang === 'en') {
    return `You are the product and engineering task analyst for ${promptProjectName() || 'the current user project'}. Convert the natural language request below into a structured task JSON object that can be imported into AI Task Flow tasks.json.

Important: this is a planning/intake prompt only. Do not implement code, do not inspect files, and do not explain the solution. Return task JSON only. A separate development prompt will be generated after this JSON is imported.

Project context:
${projectContextPromptBlock()}
- Suggested task ID prefix: ${suggestedPrefix}
- Suggested type: ${type}
- Existing task categories: ${existingCategories || 'None yet. Suggest a concise reusable category for this request.'}
- category_suggestion.label must be an English display name because the current UI language is English.

Return only one JSON object. Do not include Markdown or explanations. The object must follow this shape:
{
  "category_suggestion": {
    "prefix": "${suggestedPrefix}",
    "label": "English display name. Use an existing category when it fits, or suggest a concise new category for this kind of request"
  },
  "title": "Short title",
  "type": "bug|feature|design|improvement|refactor|perf|test|docs",
  "priority": "P0|P1|P2|P3",
  "status": "open",
  "scope": {
    "allowed_paths_hint": ["Likely modules or paths"],
    "forbidden_paths_hint": ["Modules or paths that should not be touched"]
  },
  "anchors": {
    "primary_files": [],
    "primary_symbols": [],
    "search_hints": ["Keywords for rg search"]
  },
  "problem": "Deep understanding of the problem or request",
  "expected": "Clear expected outcome",
  "constraints": ["Boundaries and non-goals"],
  "acceptance": {
    "unit_tests": [{"name": "test...", "assertion": "..."}],
    "ui_tests": [{"name": "test...", "assertion": "..."}],
    "manual_checks": ["Manual acceptance checks"]
  },
  "done_definition": ["Definition of done"],
  "tracking": {
    "branch": "${type}/${suggestedPrefix}_XXX-kebab-summary",
    "commit_prefix": "${type}(${suggestedPrefix.toLowerCase().replaceAll('_', '-')})",
    "pr_title": "[${suggestedPrefix}_XXX] Title"
  },
  "image_references": ${imageReferences || '[]'},
  "raw_inputs": [{"source": "user_natural_language", "text": ${JSON.stringify(raw)}}],
  "implementation_runs": []
}

Natural language request:
${raw}${imageReferences ? `\n\nDropped image references:\n${imageReferences}` : ''}`;
  }
  return `你是 ${promptProjectName() || '当前用户项目'} 的产品/工程任务分析助手。请把下面的自然语言需求转成一个可导入 AI Task Flow tasks.json 的结构化 task JSON。

重要：这是规划/收集阶段的提示词。不要执行代码，不要读取文件，不要解释实现方案。只返回任务 JSON。导入这个 JSON 后，系统会再生成真正给 Codex 执行的开发提示词。

项目背景:
${projectContextPromptBlock()}
- 任务 ID 前缀建议: ${suggestedPrefix}
- 类型建议: ${type}
- 现有任务类别: ${existingCategories || '暂无。请为这条需求建议一个简短、可复用的新类别。'}
- category_suggestion.label 必须使用中文展示名，因为当前界面语言是中文。例如：缺陷修复、功能开发、设计体验、体验改进。

请输出且只输出一个 JSON 对象,不要 markdown,不要解释。字段必须符合:
{
  "category_suggestion": {
    "prefix": "${suggestedPrefix}",
    "label": "中文展示名。如果现有类别适合就复用,否则为这类需求建议一个简短的新类别"
  },
  "title": "短标题",
  "type": "bug|feature|design|improvement|refactor|perf|test|docs",
  "priority": "P0|P1|P2|P3",
  "status": "open",
  "scope": {
    "allowed_paths_hint": ["可能涉及的模块/路径"],
    "forbidden_paths_hint": ["不应触碰的模块/路径"]
  },
  "anchors": {
    "primary_files": [],
    "primary_symbols": [],
    "search_hints": ["用于 rg 搜索的关键词"]
  },
  "problem": "对问题/需求的深层理解",
  "expected": "完成后的明确期望",
  "constraints": ["边界条件和禁止事项"],
  "acceptance": {
    "unit_tests": [{"name": "test...", "assertion": "..."}],
    "ui_tests": [{"name": "test...", "assertion": "..."}],
    "manual_checks": ["人工验收项"]
  },
  "done_definition": ["完成定义"],
  "tracking": {
    "branch": "${type}/${suggestedPrefix}_XXX-kebab-summary",
    "commit_prefix": "${type}(${suggestedPrefix.toLowerCase().replaceAll('_', '-')})",
    "pr_title": "[${suggestedPrefix}_XXX] 标题"
  },
  "image_references": ${imageReferences || '[]'},
  "raw_inputs": [{"source": "user_natural_language", "text": ${JSON.stringify(raw)}}],
  "implementation_runs": []
}

自然语言需求:
${raw}${imageReferences ? `\n\n拖拽图片引用:\n${imageReferences}` : ''}`;
}

function taskPromptBlock(task) {
  return `## ${task.id} · ${task.title}
Type: ${task.type || 'unknown'}
Priority: ${task.priority || 'P2'}
Status: ${getStatus(task.id)}

Problem:
${task.problem || ''}

Expected:
${task.expected || ''}

Constraints:
${(task.constraints || []).map(c => `- ${c}`).join('\n') || '- ' + t('empty')}

Scope Hint:
${((task.scope || {}).allowed_paths_hint || []).map(p => `- ${p}`).join('\n') || '- ' + t('needsLocate')}

Search Hints:
${((task.anchors || {}).search_hints || []).map(p => `- ${p}`).join('\n') || '- ' + t('empty')}

Image References:
${(task.image_references || []).map(ref => `- ${ref.path_hint || ref.path || ref.name}${ref.name ? ` (${ref.name})` : ''}${ref.path_note ? ` - ${ref.path_note}` : ''}`).join('\n') || '- ' + t('empty')}

Acceptance:
${JSON.stringify(task.acceptance || {}, null, 2)}

Done Definition:
${(task.done_definition || []).map(d => `- ${d}`).join('\n') || '- ' + t('completedExplain')}`;
}

function buildDevPrompt(tasks) {
  if (!tasks.length) {
    showToast(t('needSelection'));
    return '';
  }
  if (state.lang === 'en') {
    return `Execute the tasks below in the user project repository where Codex is currently running. Read the relevant code first and do a short self-check:
1. Impact analysis: which modules will be touched, and whether new coupling is introduced
2. Architecture consistency: whether the implementation follows the current project architecture and conventions
3. Testability: how to verify the change, and whether debug information is needed

Project context:
${projectContextPromptBlock()}

Execution requirements:
- Implement only the tasks below; do not refactor unrelated code
- Prefer rg with the Search Hints
- Run feasible validation after changes, or explain why validation could not be run
- At the end of your final response, output a copyable JSON code block for backfilling this task system:
{
  "task_id": "TASK_ID, or use task_ids for multiple tasks",
  "status": "done|blocked|needs_followup",
  "commit": "Commit SHA if committed, otherwise empty",
  "summary": "Implementation summary",
  "changed_files": ["relative paths"],
  "verification": ["validation commands and results"],
  "followups": ["items that need further tracking"]
}

Tasks:

${tasks.map(taskPromptBlock).join('\n\n---\n\n')}`;
  }
  return `请在当前 Codex 所在的用户项目仓库中执行以下任务。请先阅读相关代码并做简短自检:
1. Impact analysis: 会触碰哪些模块,是否引入新耦合
2. Architecture consistency: 是否符合当前项目架构和既有约定
3. Testability: 如何验证,是否需要补 debug 信息

项目背景:
${projectContextPromptBlock()}

执行要求:
- 只实现下列任务,不要顺手重构无关代码
- 优先用 rg 搜索 Search Hints
- 修改完成后运行可行的验证,至少说明未能验证的原因
- 完成后请在最终回复末尾输出一个可复制的 JSON 代码块,用于回填任务系统,格式如下:
{
  "task_id": "TASK_ID 或多个用数组 task_ids",
  "status": "done|blocked|needs_followup",
  "commit": "如已提交则填写 SHA,否则为空",
  "summary": "实现摘要",
  "changed_files": ["相对路径"],
  "verification": ["执行过的验证命令和结果"],
  "followups": ["需要继续跟踪的事项"]
}

任务列表:

${tasks.map(taskPromptBlock).join('\n\n---\n\n')}`;
}

window.copyText = function(text) {
  navigator.clipboard.writeText(text).then(() => showToast(t('copied')));
};

function copyFromElement(id) {
  const el = document.getElementById(id);
  if (!el || !el.value) {
    showToast(t('nothingToCopy'));
    return;
  }
  copyText(el.value);
}

function setNewTaskStep(step) {
  newTaskStep = Math.max(0, Math.min(2, step));
  document.querySelectorAll('[data-wizard-panel]').forEach(panel => {
    panel.classList.toggle('active', Number(panel.dataset.wizardPanel) === newTaskStep);
  });
}

function focusNewTaskStep() {
  const focusTargets = ['intake-text', 'structure-prompt-output', 'import-json'];
  setTimeout(() => document.getElementById(focusTargets[newTaskStep])?.focus(), 0);
}

function syncRoute() {
  const isNewTaskPage = window.location.hash === '#new-task';
  const isProjectContextPage = window.location.hash === '#project-context';
  const content = document.getElementById('content');
  const newTaskPage = document.getElementById('new-task-page');
  const projectContextPage = document.getElementById('project-context-page');
  if (!content || !newTaskPage || !projectContextPage) return;
  content.style.display = tasksData && !isNewTaskPage && !isProjectContextPage ? 'block' : 'none';
  newTaskPage.classList.toggle('open', isNewTaskPage);
  newTaskPage.setAttribute('aria-hidden', isNewTaskPage ? 'false' : 'true');
  projectContextPage.classList.toggle('open', isProjectContextPage);
  projectContextPage.setAttribute('aria-hidden', isProjectContextPage ? 'false' : 'true');
  if (isNewTaskPage) {
    setNewTaskStep(newTaskStep);
    focusNewTaskStep();
  } else if (isProjectContextPage) {
    hydrateProjectContextForm();
    setTimeout(() => document.getElementById('project-description')?.focus(), 0);
  }
}

function openNewTaskPage() {
  setNewTaskStep(0);
  if (window.location.hash !== '#new-task') {
    window.location.hash = 'new-task';
  } else {
    syncRoute();
  }
}

function closeNewTaskPage() {
  history.replaceState('', document.title, window.location.pathname + window.location.search);
  syncRoute();
}

function openProjectContextPage() {
  if (window.location.hash !== '#project-context') {
    window.location.hash = 'project-context';
  } else {
    syncRoute();
  }
}

function closeProjectContextPage() {
  history.replaceState('', document.title, window.location.pathname + window.location.search);
  syncRoute();
}

function setupIntakeImageDrop() {
  const intake = document.getElementById('intake-text');
  if (!intake) return;
  ['dragenter', 'dragover'].forEach(eventName => {
    intake.addEventListener(eventName, e => {
      if (!Array.from(e.dataTransfer?.items || []).some(item => item.kind === 'file')) return;
      e.preventDefault();
      intake.classList.add('drag-over');
    });
  });
  ['dragleave', 'dragend'].forEach(eventName => {
    intake.addEventListener(eventName, () => intake.classList.remove('drag-over'));
  });
  intake.addEventListener('drop', e => {
    const files = Array.from(e.dataTransfer?.files || []);
    if (!files.some(file => file.type?.startsWith('image/'))) return;
    e.preventDefault();
    intake.classList.remove('drag-over');
    addIntakeImageFiles(files);
  });
}

function clearNewTaskForm() {
  document.getElementById('intake-text').value = '';
  document.getElementById('structure-prompt-output').value = '';
  document.getElementById('import-json').value = '';
  document.getElementById('import-result').value = '';
  intakeAttachments.forEach(item => {
    if (item.object_url) URL.revokeObjectURL(item.object_url);
  });
  intakeAttachments = [];
  renderIntakeAttachments();
  setNewTaskStep(0);
}

window.scrollToTask = function(id) {
  const el = document.getElementById('task-' + id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

window.markCurrentDone = function() {
  if (state.current) {
    const id = state.current;
    setStatus(id, 'done');
    state.current = null;
    saveState();
    render();
    showToast(t('currentMarkedDone', id));
  }
};

window.unpinCurrent = function() {
  state.current = null;
  saveState();
  render();
};

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
// Filter handlers
// ============================================================
document.querySelectorAll('[data-priority]').forEach(b => {
  b.addEventListener('click', () => {
    state.filter.priority = b.dataset.priority;
    render();
  });
});
document.querySelectorAll('[data-status]').forEach(b => {
  b.addEventListener('click', () => {
    state.filter.status = b.dataset.status;
    render();
  });
});
document.getElementById('search').addEventListener('input', e => {
  state.filter.search = e.target.value;
  renderTasks();
});

document.querySelectorAll('[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});
document.querySelectorAll('[data-workflow-action]').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.workflowAction;
    if (action === 'new') {
      openNewTaskPage();
    } else if (action === 'tasks') {
      closeNewTaskPage();
      scrollToSection('task-library-section');
    } else if (action === 'prompt') {
      closeNewTaskPage();
      scrollToSection('prompt-section');
    } else if (action === 'backfill') {
      closeNewTaskPage();
      scrollToSection('backfill-section');
    }
  });
});
document.getElementById('btn-new-task').addEventListener('click', openNewTaskPage);
document.getElementById('btn-close-new-task').addEventListener('click', closeNewTaskPage);
document.getElementById('btn-project-context').addEventListener('click', openProjectContextPage);
document.getElementById('btn-close-project-context').addEventListener('click', closeProjectContextPage);
document.getElementById('btn-restore-backup').addEventListener('click', restoreWorkspaceBackup);
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (window.location.hash === '#new-task') closeNewTaskPage();
  if (window.location.hash === '#project-context') closeProjectContextPage();
});
window.addEventListener('hashchange', syncRoute);
setupIntakeImageDrop();
setNewTaskStep(0);

// ============================================================
// Manager actions
// ============================================================
document.querySelectorAll('[data-copy-target]').forEach(btn => {
  btn.addEventListener('click', () => copyFromElement(btn.dataset.copyTarget));
});
document.querySelectorAll('[data-wizard-back]').forEach(btn => {
  btn.addEventListener('click', () => {
    setNewTaskStep(newTaskStep - 1);
    focusNewTaskStep();
  });
});
document.querySelectorAll('[data-wizard-next]').forEach(btn => {
  btn.addEventListener('click', () => {
    setNewTaskStep(newTaskStep + 1);
    focusNewTaskStep();
  });
});

document.getElementById('btn-generate-structure-prompt').addEventListener('click', () => {
  const prompt = buildStructurePrompt();
  if (!prompt) return;
  document.getElementById('structure-prompt-output').value = prompt;
  setNewTaskStep(1);
  focusNewTaskStep();
  showToast(t('structurePromptReady'));
});

document.getElementById('btn-save-project-context').addEventListener('click', saveProjectContextFromForm);
document.getElementById('btn-validate-project-context-json').addEventListener('click', () => {
  try {
    validateProjectContextJson();
  } catch (e) {
    document.getElementById('project-context-json-result').value = t('jsonInvalid', e.message);
  }
});
document.getElementById('btn-import-project-context-json').addEventListener('click', () => {
  try {
    importProjectContextJson();
  } catch (e) {
    document.getElementById('project-context-json-result').value = t('importFailed', e.message);
  }
});

document.getElementById('btn-validate-task').addEventListener('click', () => {
  try {
    const value = parseJSONLoose(document.getElementById('import-json').value);
    const list = Array.isArray(value) ? value : value.tasks || [value];
    document.getElementById('import-result').value = t('jsonValid', list.length);
  } catch (e) {
    document.getElementById('import-result').value = t('jsonInvalid', e.message);
  }
});

document.getElementById('btn-import-task').addEventListener('click', () => {
  try {
    const value = parseJSONLoose(document.getElementById('import-json').value);
    const rawList = Array.isArray(value) ? value : value.tasks || [value];
    const preferredPrefix = document.getElementById('intake-category').value;
    const existingBeforeImport = getTasks().map(task => task.id);
    const imported = rawList.map(raw => normalizeImportedTask(raw, preferredPrefix));
    const existingIds = new Set(getTasks().map(t => t.id));
    imported.forEach(task => {
      if (existingIds.has(task.id)) {
        task.id = nextTaskId(task.id.split('_').slice(0, -1).join('_') || preferredPrefix);
      }
      tasksData.tasks.push(task);
      existingIds.add(task.id);
      state.expanded[task.id] = true;
    });
    const missingExisting = existingBeforeImport.filter(id => !getTask(id));
    if (missingExisting.length) {
      throw new Error(`Import would remove existing tasks: ${missingExisting.join(', ')}`);
    }
    saveWorkspace();
    saveState();
    renderIntakeCategories();
    render();
    clearNewTaskForm();
    closeNewTaskPage();
    scrollToSection('task-library-section');
    showToast(t('importSaved'));
  } catch (e) {
    document.getElementById('import-result').value = t('importFailed', e.message);
  }
});

document.getElementById('btn-generate-dev-prompt').addEventListener('click', () => {
  const prompt = buildDevPrompt(selectedTasks());
  if (!prompt) return;
  document.getElementById('dev-prompt-output').value = prompt;
  showToast(t('devPromptReady'));
});

document.getElementById('btn-select-visible').addEventListener('click', () => {
  visibleTasks().forEach(task => { state.selected[task.id] = true; });
  saveState();
  render();
});

document.getElementById('btn-clear-selection').addEventListener('click', () => {
  state.selected = {};
  saveState();
  render();
});

document.getElementById('btn-run-template').addEventListener('click', () => {
  const id = selectedTaskIds()[0] || state.current || 'TASK_ID';
  const template = {
    task_id: id,
    status: 'done',
    commit: '',
    summary: '',
    changed_files: [],
    verification: [],
    followups: []
  };
  document.getElementById('run-json').value = JSON.stringify(template, null, 2);
  copyText(JSON.stringify(template, null, 2));
});

document.getElementById('btn-apply-run').addEventListener('click', () => {
  try {
    const run = parseJSONLoose(document.getElementById('run-json').value);
    const ids = run.task_ids || (run.task_id ? [run.task_id] : []);
    if (!ids.length) throw new Error(t('missingTaskIds'));
    const now = new Date().toISOString();
    const updated = [];
    ids.forEach(id => {
      const task = getTask(id);
      if (!task) throw new Error(t('taskNotFound', id));
      if (!Array.isArray(task.implementation_runs)) task.implementation_runs = [];
      task.implementation_runs.push({
        agent: run.agent || 'codex',
        status: run.status || 'done',
        commit: run.commit || '',
        summary: run.summary || '',
        changed_files: run.changed_files || [],
        verification: run.verification || [],
        followups: run.followups || [],
        completed_at: run.completed_at || now
      });
      if (['done', 'skipped', 'open'].includes(run.status)) {
        setStatus(id, run.status);
      }
      updated.push(id);
    });
    saveWorkspace();
    render();
    document.getElementById('run-result').value = t('runResultSaved', updated);
    showToast(t('runSaved'));
  } catch (e) {
    document.getElementById('run-result').value = t('runFailed', e.message);
  }
});

// ============================================================
// Top actions
// ============================================================
document.getElementById('btn-export').addEventListener('click', () => {
  const tasks = getTasks();
  const merged = {
    ...tasksData,
    tasks: tasks.map(t => ({
      ...t,
      status: getStatus(t.id)
    }))
  };
  const blob = new Blob([JSON.stringify(merged, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tasks.json';
  a.click();
  URL.revokeObjectURL(url);
  tasksData = merged;
  saveWorkspace();
  showToast(t('exported'));
});

document.getElementById('btn-reset-all').addEventListener('click', () => {
  if (confirm(t('resetConfirm'))) {
    getTasks().forEach(task => { task.status = 'open'; });
    state.status = {};
    state.current = null;
    state.expanded = {};
    state.selected = {};
    saveWorkspace();
    saveState();
    render();
    showToast(t('resetDone'));
  }
});

document.getElementById('btn-collapse-all').addEventListener('click', () => {
  state.expanded = {};
  saveState();
  render();
});

// ============================================================
// Boot
// ============================================================
applyI18n();
loadTasks();
