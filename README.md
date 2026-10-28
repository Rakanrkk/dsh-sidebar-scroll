# DSH Sidebar Scroll

[简体中文](README.zh-CN.md)

Scroll sidebar navigation, projects, and conversations together in DeepSeek Harness. As you scroll down, the navigation moves out of view and gives projects and conversations more room. The brand, New Session button, and account footer stay fixed.

## Install

This release supports **DeepSeek Harness 0.2.1-rc.3**.

In the DSH plugin manager, install this Git source:

```text
github:Rakanrkk/dsh-sidebar-scroll#v0.1.1
```

For a CLI-managed Web profile:

```sh
dsh plugin --profile web add 'github:Rakanrkk/dsh-sidebar-scroll#v0.1.1'
```

For DSH Desktop, use its own plugin manager so the plugin is installed into the desktop profile. Refresh the interface after installation. Built client files are included; installation does not need a build step.

## Behavior

- One vertical scroll area contains the panel navigation and workspace/project browser.
- The Projects list grows with its content instead of keeping a separate scroll viewport.
- Existing navigation, shortcuts, project actions, and theme scrollbar colors remain available.
- Scrolling dismisses Projects conversation menus, preserving their existing behavior.

The shared scroll behavior has been checked on DSH 0.2.1-rc.3 with Projects 1.0.0-local.1. Other Projects versions have not been tested.

## Disable or remove

Disable or remove **DSH Sidebar Scroll** in the plugin manager, then refresh the interface. Removing the bundle restores the original sidebar composition.

The bundle replaces the `ui-sidebar` presentation row while enabled. Use one sidebar-shell replacement at a time. Check compatibility before upgrading DSH: this release intentionally matches one host version because it includes that version's sidebar component.

## Development

Node.js 24 or later:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run build
npm test
npm pack
```

`lib/client.js` is committed so Git installations can use the built client directly. CI checks that rebuilding produces the same client file.

## License and upstream

MIT. Sidebar rendering is adapted from [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness), package `@deepseek-ai/dsh-client-ui-sidebar`, version 0.2.1-rc.3. The upstream copyright is preserved in [LICENSE](LICENSE).
