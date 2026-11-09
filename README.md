# 知行 · 网课助手 · 专用仓库

> 私人修改版，基于原项目 v4.1.3 / 4.2.6 代码线升级，不是官方发布版。
> 4.2.7 起提供 **Edge 原生侧栏**：扩展用 `chrome.sidePanel` 打开真正的浏览器侧边栏，页面 viewport 由浏览器缩小，不是网页内 CSS 假挤。

## 两种用法

| 形态 | 需要安装 | 效果 |
|---|---|---|
| 网页内面板 | 只装 `zhixing.user.js` | 原来的网页内面板 |
| 原生侧栏 | `zhixing.user.js` + `zhixing-sidepanel-1.0.1.zip` | Edge 原生侧边栏，页面真正缩窄；侧栏负责控制/状态/API |

### 1. 安装用户脚本

1. 在脚本猫 / Tampermonkey 里停用旧的 4.2.7 网页内版本以及 4.2.6 / 4.2.5，确保同一学习通页面只有一个版本。
2. 安装 [完整版](./zhixing.user.js) 或 [轻量版](./zhixing-lite.user.js)。同版本不会自动更新，需要手动覆盖。
3. 刷新学习通页面。

### 2. 安装 Edge 原生侧栏扩展（可选）

1. 下载 [zhixing-sidepanel-1.0.1.zip](./zhixing-sidepanel-1.0.1.zip)，解压到固定目录。
2. 打开 `edge://extensions/`，启用左下角「开发人员模式」。
3. 点「加载解压缩的扩展」，选择直接包含 `manifest.json` 的目录。
4. 把「知行 · 网课助手 侧栏版」固定到工具栏；点图标打开原生侧栏。

安装扩展后，页面里的旧面板会被隐藏，控制入口改为扩展侧栏；停用扩展并刷新页面即可回到网页内面板。

## 版本

| 文件 | 版本 |
|---|---|
| `zhixing.user.js` | 4.2.7 |
| `zhixing-lite.user.js` | 4.2.7-lite |
| `扩展-1.0.1/` | 1.0.1 |
| `zhixing-sidepanel-1.0.1.zip` | 1.0.1 |

## 4.2.7 变更

- Edge 原生 `chrome.sidePanel` 侧栏；用户脚本识别扩展标记后隐藏旧网页内面板、跳过假挤压。
- 修复逐题页面识别：`/exam/test/`、`/exam-ans/exam/test`、`/exam-ans/exam/preview` 等路径；跨题作用域只用稳定的 `examId/testId/paperId/courseId/workId`。
- 连接稳定性：失败 4 次才判未连接、重连按钮、`onUpdated/onActivated` 重探、单飞锁；移除不可靠的跨世界 `postMessage` source 检查。
- 图片兼容：复合 Content-Type（如 `application/octet-stream, image/jpeg`）、SVG/AVIF/BMP 转 PNG、纯 octet 按文件头嗅探；图片不完整降级纯文字，不再暂停整题；接口 400 `unsupported image` 去掉图片重试一次。
- 自动跳题：优先 `.nextDiv` / `.jb_btn`，再按可见按钮文本“下一题/下一頁”兜底（覆盖底部普通 button）；同一页面只有一个待执行定时器；不再使用会误拦的 DOM 作答检查。
- 日志跨页：`logger()`/`updateLogEntry()` 写入 `sessionStorage` 历史，侧栏优先显示跨页日志。
- 全部题目完成自动暂停：整卷预览处理完最后一题，或逐题页检测到最后题号/完成文案/交卷按钮时，自动置暂停并写日志。
- 保留 4.2.7 的 `|z|`、空 Key、`visionSupported`、缺图处理、localStorage Key 劫持、旧记录兼容、图片/MathJax、thinking/JSON 回退、记录清理、自动更新配置。

## 当前限制

- 原生侧栏是「用户脚本 + 扩展」组合，不是单个扩展；页面逻辑仍由用户脚本执行。
- 逐题详情、图片预览、单题重试、JSON/CSV 导出还没搬进侧栏；仍在旧网页内面板里。
- 需要 Edge/Chromium 114+。
- 真实学习通定制页、iframe、特殊公式仍需真机验证；自动暂停依赖题号导航 active class 或完成文案，未命中时请提供 DOM。

## 使用说明

- 只做视频/文档/作业/考试辅助作答，**不自动交卷**。
- 需要自备 DeepSeek 官方 API（或任意 OpenAI 兼容接口），题目与图片会发送至模型服务商云端，可能产生费用。
- 仅供个人学习辅助使用，请遵守所在学校与平台的规定；原脚本头仍声明 `未经授权请勿二开`，公开分发前请自行确认许可。
