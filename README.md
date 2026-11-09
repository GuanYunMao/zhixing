# 知行 · 网课助手 · 专用仓库

> 私人修改版，基于原项目 v4.1.3 / 4.2.6 代码线升级，不是官方发布版。
> 4.2.7 起提供 **Edge 原生侧栏**：扩展用 `chrome.sidePanel` 打开真正的浏览器侧栏，页面 viewport 由浏览器缩小，不是网页内 CSS 假挤。

## 两种用法

| 形态 | 需要安装 | 效果 |
|---|---|---|
| 网页内面板 | 只装 `zhixing.user.js` | 原来的网页内面板 |
| 原生侧栏 | `zhixing.user.js` + `zhixing-sidepanel-1.0.0.zip` | Edge 原生侧边栏，页面真正缩窄；侧栏负责控制/状态/API |

### 1. 安装用户脚本

1. 在脚本猫 / Tampermonkey 里停用旧的 4.2.7 网页内版本以及 4.2.6 / 4.2.5，确保同一学习通页面只有一个版本。
2. 安装 [完整版](https://guanyunmao.github.io/zhixing/zhixing.user.js) 或 [轻量版](https://guanyunmao.github.io/zhixing/zhixing-lite.user.js)。
3. 刷新学习通页面。

### 2. 安装 Edge 原生侧栏扩展（可选）

1. 下载 [zhixing-sidepanel-1.0.0.zip](https://guanyunmao.github.io/zhixing/zhixing-sidepanel-1.0.0.zip)，解压到固定目录。
2. 打开 `edge://extensions/`，启用左下角「开发人员模式」。
3. 点「加载解压缩的扩展」，选择包含 `manifest.json` 的目录。
4. 把「知行 · 网课助手 侧栏版」固定到工具栏；点图标打开原生侧栏。

安装扩展后，页面里的旧面板会被隐藏，控制入口改为扩展侧栏；停用扩展并刷新页面即可回到网页内面板。

## 版本

| 文件 | 版本 |
|---|---|
| `zhixing.user.js` | 4.2.7 |
| `zhixing-lite.user.js` | 4.2.7-lite |
| `扩展-1.0.0/` | 1.0.0 |
| `zhixing-sidepanel-1.0.0.zip` | 1.0.0 |

## 4.2.7 变更

- 用户脚本加入扩展桥：状态、开始/暂停、核对开始/停止、统计、倍速、API 读写、日志。
- 扩展用原生 `chrome.sidePanel` 打开侧栏；扩展模式下隐藏网页内面板、跳过网页内挤压。
- 侧栏 UI 单独重做：白色面板、卡片分区、状态/统计/API/日志。
- 保留 4.2.7 的修复：`|z|`、空 Key、`visionSupported`、缺图处理、localStorage Key 劫持、旧记录兼容、图片/MathJax、thinking/JSON 回退、记录清理、自动更新。

## 当前限制

- 原生侧栏是「用户脚本 + 扩展」组合，不是单个扩展；页面逻辑仍由用户脚本执行。
- 逐题详情、图片预览、单题重试、JSON/CSV 导出还没搬进侧栏；这些仍在旧网页内面板里，需要时停用扩展使用旧面板。
- 需要 Edge/Chromium 114+。
- 真实学习通定制页、iframe、特殊公式仍需真机验证。

## 使用说明

- 只做视频/文档/作业/考试辅助作答，**不自动交卷**。
- 需要自备 DeepSeek 官方 API（或任意 OpenAI 兼容接口），题目与图片会发送至模型服务商云端，可能产生费用。
- 仅供个人学习辅助使用，请遵守所在学校与平台的规定；原脚本头仍声明 `未经授权请勿二开`，公开分发前请自行确认许可。
