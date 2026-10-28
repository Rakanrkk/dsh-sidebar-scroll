# DSH 侧栏共用滚动

[English](README.md)

让 DeepSeek Harness 左侧的功能菜单、项目和会话列表一起滚动。向下滚动时，上方功能菜单移出视野，项目和会话便能使用更多空间；品牌、新会话按钮和底部账户栏保持固定。

## 安装

本版本适用于 **DeepSeek Harness 0.2.1-rc.3**。

在 DSH 插件管理器中安装以下 Git 来源：

```text
github:Rakanrkk/dsh-sidebar-scroll#v0.1.1
```

使用 CLI 管理 Web profile 时：

```sh
dsh plugin --profile web add 'github:Rakanrkk/dsh-sidebar-scroll#v0.1.1'
```

DSH Desktop 请使用应用自己的插件管理器，确保安装到桌面 profile。安装后刷新界面。仓库包含已构建的客户端，安装时无需执行构建脚本。

## 使用效果

- 功能菜单与工作区、项目浏览器共用一个纵向滚动区域。
- Projects 列表随内容展开，取消内部独立的滚动窗口。
- 现有导航、快捷键、项目操作和主题滚动条颜色继续可用。
- 滚动时关闭 Projects 会话菜单，保留其原有交互。

共用滚动效果已在 DSH 0.2.1-rc.3 与 Projects 1.0.0-local.1 上检查。其他 Projects 版本尚未测试。

## 停用与卸载

在插件管理器中停用或移除 **DSH 侧栏共用滚动**，然后刷新界面。移除 bundle 后恢复原侧栏组合。

启用时，本插件替代 `ui-sidebar` 呈现行。同一时间只使用一个替代侧栏外壳的插件。升级 DSH 前请核对兼容性：本版本包含对应宿主版本的侧栏组件，因此限定为同一版本。

## 开发

使用 Node.js 24 或更新版本：

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run build
npm test
npm pack
```

仓库保留已构建的 `lib/client.js`，供 Git 安装直接使用。CI 会检查重新构建后该文件是否一致。

## 许可与上游

MIT。侧栏呈现代码来自 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的 `@deepseek-ai/dsh-client-ui-sidebar 0.2.1-rc.3`，上游版权声明保留在 [LICENSE](LICENSE) 中。
