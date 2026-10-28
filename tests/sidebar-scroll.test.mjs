// 用法：node --test tests/*.test.mjs
// 在 VM 里执行打包产物的真实工厂与 SidebarRoot 组件，验证共用滚动布局的行为：
// 菜单与项目同容器、顶部/底部留在容器外、滚动转发关闭 Projects 菜单、
// 样式注册与清理、导航回调保留。不依赖本机 DSH 安装或任何绝对路径。
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import { test } from 'node:test'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const CLIENT = join(ROOT, 'lib/client.js')

/** 最小 React：hooks 按调用顺序存值，组件被直接调用时重置游标即可执行。 */
function makeReact() {
  const slots = []
  let cursor = 0
  const react = {
    createElement: (type, props, ...children) => ({ type, props: props ?? {}, children: children.flat(Infinity) }),
    useState(initial) {
      const index = cursor++
      if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial
      return [slots[index], (next) => { slots[index] = typeof next === 'function' ? next(slots[index]) : next }]
    },
    useRef(initial) {
      const index = cursor++
      if (!(index in slots)) slots[index] = { current: initial }
      return slots[index]
    },
    useEffect(effect) { slots[cursor++] = effect },
    useCallback(fn) { cursor++; return fn },
  }
  return { react, reset: () => { cursor = 0 } }
}

const react = makeReact()
const jsx = (type, props) => ({ type, props: props ?? {} })

/** 界面原语桩：Tooltip/Menu 透传锚点内容，图标退化为普通节点。 */
const primitives = {
  Tooltip: ({ children }) => children,
  Menu: ({ anchor }) => anchor,
  ShortcutKeys: ({ keys }) => jsx('kbd', { children: keys.join('+') }),
  FishLogo: () => jsx('svg', {}),
  IconAppsAddOutlineRegular: () => jsx('svg', {}),
  IconNewChatOutlineMedium: () => jsx('svg', {}),
  IconNewChatOutlineRegular: () => jsx('svg', {}),
  IconPanelLeftOutlineRegular: () => jsx('svg', {}),
  isDarwinDesktop: () => false,
}

/** 面板元数据源：apply 的 syncPanels 与组件的 usePanels 都从这里读。 */
const PANEL_OPTIONS = [
  { options: { id: 'plugins', order: 0, label: '插件' } },
  { options: { id: 'schedules', order: 1, label: '自动化任务' } },
  { options: { id: 'memory', order: 2, label: '记忆系统' } },
]

function makeStore(initial) {
  let snapshot = initial
  const listeners = new Set()
  return {
    getSnapshot: () => snapshot,
    set(next) {
      snapshot = typeof next === 'function' ? next(snapshot) : next
      for (const listener of listeners) listener()
    },
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) },
  }
}

const STORE = { createSnapshotStore: (initial) => makeStore(initial) }
const SLOTS = { resolveSlotLabel: (label) => typeof label === 'function' ? label() : label }
const requireFor = (specifier) => {
  if (specifier === 'react') return react.react
  if (specifier === 'react/jsx-runtime') return { jsx, jsxs: jsx, jsxDEV: jsx, Fragment: Symbol.for('jsx.Fragment') }
  if (specifier === '@deepseek-ai/dsh-client-ui-primitives') return primitives
  if (specifier === '@deepseek-ai/dsh-client-ui-slots') return SLOTS
  if (specifier === '@deepseek-ai/dsh-client-store') return STORE
  throw new Error('意外的依赖：' + specifier)
}

/** 在沙箱里执行客户端产物，捕获模块工厂并注入桩依赖。 */
function loadBundle() {
  const captured = []
  const sandbox = {
    window: { __ModuleLoader__: { load: (entry) => captured.push(entry) } },
    document: {
      documentElement: { hasAttribute: () => false },
      createElement: () => ({ dataset: {}, textContent: '', remove() {} }),
      head: { appendChild() {} },
      addEventListener() {},
      removeEventListener() {},
    },
    Event,
  }
  vm.runInNewContext(readFileSync(CLIENT, 'utf8'), sandbox, { filename: CLIENT })
  assert.equal(captured.length, 1, '客户端产物只应注册一个模块工厂')
  const [entry] = captured
  return { entry, exports: entry.factory(requireFor) }
}

/** 捕获 apply 的槽位注册、effect 与服务读取。 */
function fakeContext() {
  const injected = []
  const registered = new Map()
  const effects = []
  const ctx = {
    get: () => undefined,
    effect(fn, name) { effects.push({ name, fn }); return () => {} },
    locale: { register: () => () => {}, subscribe: () => () => {} },
    slots: {
      inject: (name, build) => { const dispose = build(); injected.push({ name, dispose }); return dispose },
      register: (entrySpec, component) => { registered.set(entrySpec.name, { entrySpec, component }); return () => {} },
      entriesOfSlot: (name) => name === 'sidebar.panellist' ? PANEL_OPTIONS : [],
      subscribe: () => () => {},
    },
  }
  return { ctx, injected, registered, effects }
}

/** 取出 apply 注册的真实侧栏组件。 */
function sidebarComponent(exports) {
  const { ctx, registered } = fakeContext()
  exports.apply(ctx)
  const sidebar = registered.get('sidebar')
  assert.equal(typeof sidebar?.component, 'function', 'apply 应注册 sidebar 组件')
  return sidebar.component
}

/**
 * 单次渲染并深度遍历：函数组件用真实组件体执行（hooks 游标先重置），
 * 收集元素节点、父链与文档顺序，供容器归属与先后判断。
 */
function collect(component, props) {
  const parentOf = new Map()
  const orderOf = new Map()
  let counter = 0
  const walk = (node, ancestors) => {
    if (node === null || node === undefined || typeof node === 'boolean' || typeof node === 'string' || typeof node === 'number') return
    if (Array.isArray(node)) { for (const child of node) walk(child, ancestors); return }
    const { type, props: elementProps } = node
    if (typeof type === 'function') { react.reset(); walk(type(elementProps ?? {}), ancestors); return }
    if (typeof type === 'symbol') { walk(elementProps?.children, ancestors); return }
    orderOf.set(node, counter++)
    if (ancestors.length > 0) parentOf.set(node, ancestors.at(-1))
    walk(elementProps?.children, [...ancestors, node])
  }
  react.reset()
  walk(component(props), [])
  const byPredicate = (predicate) => [...orderOf.keys()].filter(predicate)
    .sort((left, right) => orderOf.get(left) - orderOf.get(right))
  return { parentOf, orderOf, byPredicate }
}

const inside = (parentOf, node, ancestor) => {
  for (let current = node; current !== undefined; current = parentOf.get(current)) {
    if (current === ancestor) return true
  }
  return false
}

/** 断言前把 VM realm 的对象复制回宿主 realm，避免原型差异干扰 deepStrictEqual。 */
const host = (value) => JSON.parse(JSON.stringify(value))

/** 侧栏组件的渲染入参：布局状态 + 注入回调 + 桩 renderSlot。 */
function sidebarProps({ projects = true } = {}) {
  const calls = { startSession: [], toggle: [], selectPanel: [], track: [] }
  const projectsNode = projects
    ? { type: 'div', props: { className: 'pj-root', children: [{ type: 'div', props: { className: 'pj-list', role: 'tree' } }] } }
    : null
  const props = {
    collapsed: false,
    width: 280,
    startSession: () => calls.startSession.push(1),
    toggleSidebar: () => calls.toggle.push(1),
    selectPanel: (id) => calls.selectPanel.push(id),
    setPinned: () => {},
    trackEntryClick: (attributes) => calls.track.push(attributes),
    usePanels: (selector) => selector(PANEL_OPTIONS.map(({ options }) => ({ ...options }))),
    useEntryPins: (selector) => selector([]),
    useEntryActions: (selector) => selector(true),
    useShortcuts: (selector) => selector([]),
    usePanelInfo: (selector) => selector({ activePanelId: 'plugins' }),
    t: (key) => key,
    renderSlot: (key, owner, opts) => {
      if (key === 'sidebar.workspaces') return projectsNode
      if (key === 'sidebar.settings') return { type: 'div', props: { 'data-settings-seat': true } }
      if (opts && 'fallback' in opts) return opts.fallback
      return { type: 'span', props: { 'data-icon': opts?.only ?? key } }
    },
  }
  return { props, calls }
}

test('打包产物暴露原生契约并注册侧栏与窗口控件两个槽位', () => {
  const { exports } = loadBundle()
  assert.deepEqual(host(exports.inject), ['slots', 'layout', 'uiWorkspace', 'locale', 'shortcuts'])
  const { ctx, injected, registered, effects } = fakeContext()
  exports.apply(ctx)
  assert.deepEqual([...registered.keys()].sort(), ['shell.leading', 'sidebar'], '应恰好注册侧栏与窗口前导控件')
  const sidebar = registered.get('sidebar')
  assert.equal(typeof sidebar.component, 'function')
  assert.ok(sidebar.entrySpec.children['sidebar.workspaces'], '侧栏应继续声明项目区域子槽')
  assert.ok(sidebar.entrySpec.children['sidebar.panellist'], '侧栏应继续声明功能菜单子槽')
  assert.ok(injected.some((row) => row.name === 'sidebar'), '注册应经过 slots.inject 席位')
  assert.ok(effects.some((row) => row.name === 'sidebar-scroll: styles'), '样式应通过 ctx.effect 注册')
})

test('样式 effect 挂载自己的标签、含项目摊平规则，卸载时移除', () => {
  const appended = []
  const removed = []
  const captured = []
  vm.runInNewContext(readFileSync(CLIENT, 'utf8'), {
    window: { __ModuleLoader__: { load: (entry) => captured.push(entry) } },
    document: {
      documentElement: { hasAttribute: () => false },
      createElement: () => ({ dataset: {}, textContent: '', remove: () => removed.push(1) }),
      head: { appendChild: (tag) => appended.push(tag) },
      addEventListener() {},
      removeEventListener() {},
    },
    Event,
  }, { filename: CLIENT })
  const exports = captured[0].factory(requireFor)
  let styleEffect
  const { ctx } = fakeContext()
  exports.apply({
    ...ctx,
    effect(fn, name) {
      if (name === 'sidebar-scroll: styles') styleEffect = fn
      return () => {}
    },
  })
  assert.equal(typeof styleEffect, 'function')
  const before = appended.length
  const disposer = styleEffect()
  assert.equal(appended.length, before + 1, '样式标签应挂载一次')
  assert.match(appended.at(-1).textContent, /\.pj-list/, '样式表应包含项目列表摊平规则')
  disposer()
  assert.equal(removed.length, 1, '卸载应移除自己的样式标签')
})

test('功能菜单与项目区域在同一个共用滚动容器内，顶部按钮与账户区在外', () => {
  const { exports } = loadBundle()
  const component = sidebarComponent(exports)
  const { props } = sidebarProps()
  const tree = collect(component, props)

  const scroller = tree.byPredicate((node) => node.props?.['data-sidebar-shared-scroll'] === true)
  assert.equal(scroller.length, 1, '应只有一个共用滚动容器')

  const projects = tree.byPredicate((node) => node.props?.className === 'pj-list')
  assert.equal(projects.length, 1)
  assert.ok(inside(tree.parentOf, projects[0], scroller[0]), '项目列表应在共用滚动容器内')

  const nav = tree.byPredicate((node) => node.type === 'nav')
  assert.equal(nav.length, 1)
  assert.ok(inside(tree.parentOf, nav[0], scroller[0]), '功能菜单应在共用滚动容器内')
  assert.ok(tree.orderOf.get(nav[0]) < tree.orderOf.get(projects[0]), '菜单应排在项目列表上方，先于它滚出视野')

  const newSession = tree.byPredicate((node) => node.props?.['aria-label'] === 'session.new.label')
  assert.ok(newSession.length >= 1)
  assert.ok(!inside(tree.parentOf, newSession[0], scroller[0]), '新会话按钮应留在共用容器外')

  const settings = tree.byPredicate((node) => node.props?.['data-settings-seat'] === true)
  assert.equal(settings.length, 1)
  assert.ok(!inside(tree.parentOf, settings[0], scroller[0]), '账户/设置区应留在共用容器外')
})

test('共用区域滚动时向 Projects 列表转发原生不冒泡 scroll，无 Projects 时安静', () => {
  const { exports } = loadBundle()
  const component = sidebarComponent(exports)
  const { props } = sidebarProps()
  const tree = collect(component, props)
  const scrollArea = tree.byPredicate((node) => node.props?.['data-sidebar-shared-scroll'] === true)[0]
  assert.equal(typeof scrollArea.props.onScroll, 'function', '共用容器应接管滚动事件')

  const dispatched = []
  const fakeList = { dispatchEvent: (event) => dispatched.push(event) }
  scrollArea.props.onScroll({ currentTarget: { querySelector: (selector) => selector === '.pj-list' ? fakeList : null } })
  assert.equal(dispatched.length, 1)
  assert.ok(dispatched[0] instanceof Event)
  assert.equal(dispatched[0].bubbles, false, '转发的应是原生不冒泡 scroll 事件')

  assert.doesNotThrow(() => {
    scrollArea.props.onScroll({ currentTarget: { querySelector: () => null } })
  }, '没有 Projects 占位时转发不应报错')
})

test('面板列表为空时项目区域仍在共用容器内', () => {
  const { exports } = loadBundle()
  const component = sidebarComponent(exports)
  const empty = sidebarProps()
  empty.props.usePanels = (selector) => selector([])
  empty.props.useEntryActions = (selector) => selector(false)
  const tree = collect(component, empty.props)
  const scroller = tree.byPredicate((node) => node.props?.['data-sidebar-shared-scroll'] === true)
  assert.equal(scroller.length, 1, '空菜单时共用容器应保留')
  const projects = tree.byPredicate((node) => node.props?.className === 'pj-list')
  assert.equal(projects.length, 1)
  assert.ok(inside(tree.parentOf, projects[0], scroller[0]), '项目区域应仍在共用容器内')
  assert.equal(tree.byPredicate((node) => node.type === 'nav').length, 0)
})

test('导航回调保留：官方面板行上报、普通面板行静默、新会话与折叠照常', () => {
  const { exports } = loadBundle()
  const component = sidebarComponent(exports)
  const { props, calls } = sidebarProps()
  const buttons = collect(component, props).byPredicate((node) => node.type === 'button')

  const schedules = buttons.find((node) => node.props['aria-label'] === '自动化任务')
  schedules.props.onClick()
  assert.deepEqual(calls.selectPanel, ['schedules'])
  assert.deepEqual(host(calls.track), [{ menu_name: 'cron', position: 'sidebar' }], '官方面板行保留原生埋点')

  const memory = buttons.find((node) => node.props['aria-label'] === '记忆系统')
  memory.props.onClick()
  assert.deepEqual(calls.selectPanel, ['schedules', 'memory'])
  assert.equal(calls.track.length, 1, '非官方面板行不上报埋点')

  const newSession = buttons.find((node) => node.props['aria-label'] === 'session.new.label')
  newSession.props.onClick()
  assert.equal(calls.startSession.length, 1)
  assert.deepEqual(host(calls.track.at(-1)), { menu_name: 'new_session', position: 'sidebar' })

  const toggle = buttons.find((node) => node.props['aria-label'] === 'toggle.collapse')
  toggle.props.onClick()
  assert.equal(calls.toggle.length, 1)
})
