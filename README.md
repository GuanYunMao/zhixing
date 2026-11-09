# 知行 · 网课助手 · 专用仓库

> 私人修改版，基于原项目 v4.1.3 源码升级，不是官方发布版。

## 安装

安装页：<https://guanyunmao.github.io/zhixing/>

| 文件 | 直链 |
|---|---|
| 完整版 | <https://guanyunmao.github.io/zhixing/zhixing.user.js> |
| 轻量版 | <https://guanyunmao.github.io/zhixing/zhixing-lite.user.js> |

轻量版去掉了内联字体解密表，体积小约 210 KB；遇到超星字体加密题会跳过解密，日志里有提示。

**两个版本都带自动更新**：安装一次之后，仓库推送新版本时脚本管理器会自己检查并升级。轻量版只会升级到轻量版，不会被替换成完整版。

## 版本

| 文件 | 版本 |
|---|---|
| `zhixing.user.js` | 4.2.4 |
| `zhixing-lite.user.js` | 4.2.4-lite |

## 变更记录

### 4.2.4

- 公式提取增强：支持 MathJax 3（`mjx-assistive-mml`）、MathJax 2（`data-mathml`）、KaTeX（`annotation`）与 MathML，数学题的题干不再只剩空白。
- 图片线索增强：`<img>` 的 `data-tex` / `data-latex` / `alt` 会一并保留。
- 侧栏标题去掉版本号小字。
- 核对记录里的「模型完整正文」如果是 JSON 会格式化显示。
- 题干提取为空时，提示改为「未提取到文字，可能是公式或图片」。

### 4.2.3

- 新增 `@downloadURL` / `@updateURL`，支持自动更新。功能与 4.2.2 一致。

### 4.2.2

- API 多端点轮询恢复：429 / 5xx / 网络错误自动切备用地址。
- 图片读取失败不再整题报废：单图跳过，全部失败退回纯文本。
- `thinking` / `reasoning_effort` 只在 DeepSeek 端点下发，其他兼容服务不会再 400。
- 核对结果解析支持 Markdown 围栏与正文夹带说明。
- 题干里的 `<`、`>` 不再被 HTML 解析吞掉。
- 核对记录只保留最近 800 条。

## 使用说明

- 只做视频/文档/作业/考试辅助作答，**不自动交卷**。
- 需要自备 DeepSeek 官方 API（或任意 OpenAI 兼容接口），题目与图片会发送至模型服务商云端，可能产生费用。
- 从 4.2.3 起支持自动更新；4.2.2 及更早版本需要手动装一次。
- 仅供个人学习辅助使用，请遵守所在学校与平台的规定。
