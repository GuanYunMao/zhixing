# 知行 · 网课助手 4.2.8

单扩展版：页面逻辑、原生 `chrome.sidePanel` 侧栏和 API 设置都在一个 Edge 扩展里，不再需要 Tampermonkey 或用户脚本。

## 安装页

<https://guanyunmao.github.io/zhixing/>

页面里包含下载按钮、四步安装、常见问题和分享链接。

## 包

- `zhixing-4.2.8-single-extension.zip`（326,207 字节）
- SHA256：`44FFBAABBAA911F0FD204641382E91561A9BCF04C831E6A0E20871C99C00C4A6`

## 安装

1. 删除旧的两件套扩展，并在 Tampermonkey/脚本猫里删除或停用 4.2.7 用户脚本。
2. 解压 zip 到固定目录，确认 `manifest.json` 直接在里面。
3. `edge://extensions/` → 开发者模式 → 加载解压缩的扩展 → 选该目录。
4. 刷新学习通页面，点扩展图标打开侧栏；API 设置里填一次地址、Key、模型并保存。

## 自动更新

**本地解压加载不会自动更新。** 只能下载新 zip、覆盖原目录、在 `edge://extensions` 点「重新加载」。自动更新只对 Edge Add-ons 商店扩展或企业策略分发的扩展生效；这类自动答题脚本上架商店大概率过不了。

## 版本

4.2.8。旧的两件套 4.2.7 文件已从 `main` 的发布页移除，保留在历史提交/标签 `v4.2.7`。
