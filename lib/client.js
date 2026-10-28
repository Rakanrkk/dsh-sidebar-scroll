window.__ModuleLoader__.load({
  id: "@rakan/dsh-sidebar-scroll",
  factory(require) {
    const module = {exports: {}};
    const exports = module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_dsh_client_store2 = require("@deepseek-ai/dsh-client-store");
var import_dsh_client_ui_slots = require("@deepseek-ai/dsh-client-ui-slots");

// src/client/panel-pins.ts
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");
var FIXED_PANEL_ID = "plugins";
var NO_PANELS = [];
function createPanelPins() {
  const store = (0, import_dsh_client_store.createSnapshotStore)({ unpinned: NO_PANELS });
  return {
    unpinned: { getSnapshot: () => store.getSnapshot().unpinned, subscribe: (listener) => store.subscribe(listener) },
    setPinned: (id, pinned) => {
      const current = store.getSnapshot().unpinned;
      if (id === FIXED_PANEL_ID || pinned !== current.includes(id)) return;
      store.set({ unpinned: pinned ? current.filter((entry) => entry !== id) : [...current, id] });
    }
  };
}

// src/client/HeaderLeadingControls.tsx
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/HeaderLeadingControls.module.css
var HeaderLeadingControls_default = {
  controls: "HeaderLeadingControls_controls",
  iconButton: "HeaderLeadingControls_iconButton"
};

// src/client/HeaderLeadingControls.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function HeaderLeadingControls({ toggleSidebar, startSession, trackEntryClick, useShortcuts, t }) {
  const shortcut = useShortcuts((rows) => rows.find((row) => row.id === "sidebar.left.toggle"));
  const newShortcut = useShortcuts((rows) => rows.find((row) => row.id === "session.new"));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: HeaderLeadingControls_default.controls, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: t("toggle.open"), shortcutKeys: shortcut?.keys, delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        className: HeaderLeadingControls_default.iconButton,
        "aria-label": t("toggle.open"),
        "aria-keyshortcuts": shortcut?.aria,
        onClick: () => {
          toggleSidebar();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPanelLeftOutlineRegular, { size: 16 })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: t("session.new.label"), shortcutKeys: newShortcut?.keys, delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        className: HeaderLeadingControls_default.iconButton,
        "aria-label": t("session.new.label"),
        "aria-keyshortcuts": newShortcut?.aria,
        onClick: () => {
          trackEntryClick({ menu_name: "new_session", position: "titlebar" });
          startSession();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconNewChatOutlineRegular, { size: 16 })
      }
    ) })
  ] });
}

// src/client/SidebarRoot.tsx
var import_react = require("react");

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// src/client/SidebarRoot.tsx
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/SidebarRoot.module.css
var SidebarRoot_default = {
  root: "SidebarRoot_root",
  collapsed: "SidebarRoot_collapsed",
  logoRow: "SidebarRoot_logoRow",
  toggle: "SidebarRoot_toggle",
  brand: "SidebarRoot_brand",
  brandIdentity: "SidebarRoot_brandIdentity",
  brandMark: "SidebarRoot_brandMark",
  brandName: "SidebarRoot_brandName",
  newSession: "SidebarRoot_newSession",
  panelList: "SidebarRoot_panelList",
  regionArea: "SidebarRoot_regionArea",
  footArea: "SidebarRoot_footArea",
  railIn: "SidebarRoot_railIn",
  iconButton: "SidebarRoot_iconButton",
  panelIcon: "SidebarRoot_panelIcon",
  quietBars: "SidebarRoot_quietBars",
  fading: "SidebarRoot_fading",
  wide: "SidebarRoot_wide",
  "wide-in": "SidebarRoot_wide-in",
  "rail-in": "SidebarRoot_rail-in",
  "rail-fade-in": "SidebarRoot_rail-fade-in",
  topStrip: "SidebarRoot_topStrip",
  fallbackBrandName: "SidebarRoot_fallbackBrandName",
  localBuildBrand: "SidebarRoot_localBuildBrand",
  localBuildTitle: "SidebarRoot_localBuildTitle",
  railMark: "SidebarRoot_railMark",
  buildVersion: "SidebarRoot_buildVersion",
  newSessionLabel: "SidebarRoot_newSessionLabel",
  newSessionLabelMask: "SidebarRoot_newSessionLabelMask",
  newSessionShortcut: "SidebarRoot_newSessionShortcut",
  newSessionContent: "SidebarRoot_newSessionContent",
  panelRow: "SidebarRoot_panelRow",
  panelActive: "SidebarRoot_panelActive",
  moreAnchor: "SidebarRoot_moreAnchor",
  moreMenu: "SidebarRoot_moreMenu",
  panelGlyph: "SidebarRoot_panelGlyph",
  panelTitle: "SidebarRoot_panelTitle",
  scrollArea: "SidebarRoot_scrollArea",
  settingsArea: "SidebarRoot_settingsArea",
  footerActions: "SidebarRoot_footerActions"
};

// src/client/SidebarRoot.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var COLLAPSE_SETTLE_MS = 150;
var SCROLLBAR_LINGER_MS = 2e3;
function localBuildVersion() {
  const version = "0.2.1-rc.3";
  if (version === void 0) return void 0;
  const commit = void 0;
  return version + (commit === void 0 ? "" : `-${commit}`) + (false ? "-dirty" : "");
}
function officialEntry(id) {
  if (id === "plugins") return "plugin";
  return id === "schedules" ? "cron" : void 0;
}
function PanelRow({ id, label, wide, usePanelInfo, selectPanel, trackEntryClick, renderSlot }) {
  const active = usePanelInfo((info) => info.activePanelId === id);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label, delayMs: 500, disabled: wide, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "button",
    {
      type: "button",
      className: clsx_default(SidebarRoot_default.panelRow, active && SidebarRoot_default.panelActive),
      "aria-label": label,
      "aria-current": active ? "page" : void 0,
      onClick: () => {
        const entry = officialEntry(id);
        if (entry !== void 0) trackEntryClick({ menu_name: entry, position: "sidebar" });
        selectPanel(id);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SidebarRoot_default.panelGlyph, "aria-hidden": "true", children: renderSlot("sidebar.panellist", { size: wide ? 16 : 18, active }, { only: id }) }),
        wide && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: clsx_default(SidebarRoot_default.panelTitle, SidebarRoot_default.wide), children: label })
      ]
    }
  ) });
}
function PanelMoreMenu({ wide, label, entries, onOpen, onPinnedChange, trackEntryClick, renderSlot }) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const onDismiss = () => {
    setOpen(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_dsh_client_ui_primitives2.Menu,
    {
      open,
      onClose: onDismiss,
      portal: true,
      autoFocus: true,
      className: SidebarRoot_default.moreAnchor,
      listClassName: SidebarRoot_default.moreMenu,
      anchor: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label, delayMs: 500, disabled: wide, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          type: "button",
          className: SidebarRoot_default.panelRow,
          "aria-label": label,
          "aria-haspopup": "menu",
          "aria-expanded": open,
          onClick: () => {
            trackEntryClick({ menu_name: "more", position: "sidebar" });
            setOpen((value) => !value);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SidebarRoot_default.panelGlyph, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconAppsAddOutlineRegular, { size: wide ? 16 : 18 }) }),
            wide && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: clsx_default(SidebarRoot_default.panelTitle, SidebarRoot_default.wide), children: label })
          ]
        }
      ) }),
      children: renderSlot("sidebar.panellist.actions", { entries, onOpen, onPinnedChange, onDismiss })
    }
  );
}
function SidebarRoot({
  collapsed,
  width,
  startSession,
  toggleSidebar,
  selectPanel,
  setPinned,
  trackEntryClick,
  usePanels,
  useEntryPins,
  useEntryActions,
  useShortcuts,
  usePanelInfo,
  t,
  renderSlot
}) {
  const panels = usePanels((snapshot) => snapshot);
  const unpinned = useEntryPins((ids) => ids);
  const activePanelId = usePanelInfo((info) => info.activePanelId);
  const hasEntryActions = useEntryActions((registered) => registered);
  const shortcut = useShortcuts((rows) => rows.find((row) => row.id === "sidebar.left.toggle"));
  const newShortcut = useShortcuts((rows) => rows.find((row) => row.id === "session.new"));
  const toggleLabel = collapsed ? t("toggle.open") : t("toggle.collapse");
  const [settled, setSettled] = (0, import_react.useState)(collapsed);
  (0, import_react.useEffect)(() => {
    if (!collapsed) {
      setSettled(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setSettled(true);
    }, COLLAPSE_SETTLE_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [collapsed]);
  const windowsTitlebar = document.documentElement.hasAttribute("data-windows-titlebar");
  const wide = windowsTitlebar ? !collapsed : !collapsed || !settled;
  const openNewSession = () => {
    trackEntryClick({ menu_name: "new_session", position: windowsTitlebar && collapsed ? "titlebar" : "sidebar" });
    startSession();
  };
  const captionTooltipSide = windowsTitlebar ? "bottom" : "right";
  const lastWideWidth = (0, import_react.useRef)(width);
  if (!collapsed) lastWideWidth.current = width;
  const everWide = (0, import_react.useRef)(!collapsed);
  if (!collapsed) everWide.current = true;
  const column = (0, import_react.useRef)(null);
  const [pointerInside, setPointerInside] = (0, import_react.useState)(false);
  const lingerTimer = (0, import_react.useRef)(void 0);
  const armLinger = () => {
    if (lingerTimer.current !== void 0) return;
    lingerTimer.current = window.setTimeout(() => {
      lingerTimer.current = void 0;
      setPointerInside(false);
    }, SCROLLBAR_LINGER_MS);
  };
  const cancelLinger = () => {
    window.clearTimeout(lingerTimer.current);
    lingerTimer.current = void 0;
  };
  (0, import_react.useEffect)(() => {
    if (!pointerInside) return;
    const onMove = (event) => {
      const rect = column.current?.getBoundingClientRect();
      if (rect === void 0) return;
      const inside = event.clientX >= rect.left && event.clientX < rect.right && event.clientY >= rect.top && event.clientY < rect.bottom;
      if (inside) cancelLinger();
      else armLinger();
    };
    document.addEventListener("pointermove", onMove);
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelLinger();
    };
  }, [pointerInside]);
  const buildVersion = localBuildVersion();
  const darwinDesktop = (0, import_dsh_client_ui_primitives2.isDarwinDesktop)();
  const toggle = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: toggleLabel, shortcutKeys: shortcut?.keys, delayMs: 500, side: captionTooltipSide, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "button",
    {
      type: "button",
      className: clsx_default(SidebarRoot_default.iconButton, SidebarRoot_default.toggle),
      "aria-label": toggleLabel,
      "aria-keyshortcuts": shortcut?.aria,
      onClick: () => {
        toggleSidebar();
      },
      children: [
        !wide && !windowsTitlebar && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SidebarRoot_default.railMark, "aria-hidden": "true", children: renderSlot("sidebar.brand.mark", { size: 24 }, { fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.FishLogo, { size: 24 }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconPanelLeftOutlineRegular, { className: SidebarRoot_default.panelIcon, size: wide || windowsTitlebar ? 16 : 18 }),
        !wide && renderSlot("sidebar.toggle.badge", {})
      ]
    }
  ) });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      ref: column,
      className: clsx_default(
        SidebarRoot_default.root,
        !wide && SidebarRoot_default.collapsed,
        !wide && everWide.current && SidebarRoot_default.railIn,
        collapsed && wide && SidebarRoot_default.fading,
        !pointerInside && SidebarRoot_default.quietBars
      ),
      style: wide ? { width: collapsed ? lastWideWidth.current : width } : void 0,
      onPointerEnter: () => {
        cancelLinger();
        setPointerInside(true);
      },
      onPointerLeave: () => {
        armLinger();
      },
      children: [
        darwinDesktop && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: SidebarRoot_default.topStrip, "data-window-drag": true, children: toggle }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: SidebarRoot_default.logoRow, "data-window-drag": true, children: [
          wide && (() => {
            const identity = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: SidebarRoot_default.brandIdentity, "aria-hidden": "true", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SidebarRoot_default.brandMark, children: renderSlot("sidebar.brand.mark", { size: 24 }, { fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.FishLogo, { size: 24 }) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SidebarRoot_default.brandName, children: renderSlot("sidebar.brand.name", {}, {
                fallback: buildVersion === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SidebarRoot_default.fallbackBrandName, children: t("brand.localBuild") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: SidebarRoot_default.localBuildBrand, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SidebarRoot_default.localBuildTitle, children: t("brand.localBuild") }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SidebarRoot_default.buildVersion, children: buildVersion })
                ] })
              }) })
            ] });
            return darwinDesktop ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: clsx_default(SidebarRoot_default.brand, SidebarRoot_default.wide), children: identity }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: clsx_default(SidebarRoot_default.brand, SidebarRoot_default.wide),
                "aria-label": t("session.new.label"),
                "aria-keyshortcuts": newShortcut?.aria,
                onClick: openNewSession,
                children: identity
              }
            );
          })(),
          !darwinDesktop && toggle
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: t("session.new.label"), shortcutKeys: newShortcut?.keys, delayMs: 500, side: captionTooltipSide, disabled: wide, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            className: SidebarRoot_default.newSession,
            "aria-label": t("session.new.label"),
            "aria-keyshortcuts": newShortcut?.aria,
            onClick: openNewSession,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SidebarRoot_default.newSessionLabelMask, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: SidebarRoot_default.newSessionContent, children: [
                wide ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconNewChatOutlineMedium, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconNewChatOutlineRegular, { size: windowsTitlebar ? 16 : 18 }),
                wide && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: clsx_default(SidebarRoot_default.newSessionLabel, SidebarRoot_default.wide), children: t("session.new") })
              ] }) }),
              wide && newShortcut !== void 0 && newShortcut.keys.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SidebarRoot_default.newSessionShortcut, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.ShortcutKeys, { keys: newShortcut.keys }) })
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: SidebarRoot_default.scrollArea,
            "data-sidebar-shared-scroll": true,
            onScroll: (event) => {
              event.currentTarget.querySelector(".pj-list")?.dispatchEvent(new Event("scroll"));
            },
            children: [
              panels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("nav", { className: SidebarRoot_default.panelList, "aria-label": t("panels.label"), children: [
                panels.filter(({ id }) => id === FIXED_PANEL_ID || !unpinned.includes(id)).map(({ id, label }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  PanelRow,
                  {
                    id,
                    label,
                    wide,
                    usePanelInfo,
                    selectPanel,
                    trackEntryClick,
                    renderSlot
                  },
                  id
                )),
                hasEntryActions && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  PanelMoreMenu,
                  {
                    wide,
                    label: t("panels.more"),
                    entries: panels.filter(({ id }) => id !== FIXED_PANEL_ID).map(({ id, label }) => ({ id, label, pinned: !unpinned.includes(id), active: id === activePanelId })),
                    onOpen: (id) => {
                      const entry = officialEntry(id);
                      if (entry !== void 0) trackEntryClick({ menu_name: entry, position: "sidebar_more" });
                      const panel = panels.find((candidate) => candidate.id === id);
                      if (panel !== void 0) selectPanel(panel.id);
                    },
                    onPinnedChange: setPinned,
                    trackEntryClick,
                    renderSlot
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: SidebarRoot_default.regionArea, children: renderSlot("sidebar.workspaces", {
                wide,
                expandSidebar: () => {
                  if (collapsed) toggleSidebar();
                }
              }) })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: SidebarRoot_default.footArea, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: SidebarRoot_default.footerActions, children: renderSlot("sidebar.footer.action", { wide }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: SidebarRoot_default.settingsArea, children: renderSlot("sidebar.settings", { wide }) })
        ] })
      ]
    }
  );
}

// src/client/locales.ts
var zh = {
  "session.new": "\u65B0\u4F1A\u8BDD",
  "session.new.label": "\u65B0\u5EFA\u4F1A\u8BDD",
  "toggle.open": "\u6253\u5F00\u4FA7\u8FB9\u680F",
  "toggle.collapse": "\u6536\u8D77\u4FA7\u8FB9\u680F",
  "panels.label": "\u5168\u5C40\u9762\u677F",
  "panels.more": "\u66F4\u591A"
};
var en = {
  "session.new": "New Session",
  "session.new.label": "New session",
  "toggle.open": "Open sidebar",
  "toggle.collapse": "Collapse sidebar",
  "panels.label": "Global panels",
  "panels.more": "More"
};

// src/client/index.ts
var NS = "sidebar";
var inject = ["slots", "layout", "uiWorkspace", "locale", "shortcuts"];
function apply(ctx) {
  const workspaceNavigation = ctx.get("uiWorkspace");
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-sidebar: dictionaries");
  const panels = (0, import_dsh_client_store2.createSnapshotStore)([]);
  const syncPanels = () => {
    const next = ctx.slots.entriesOfSlot("sidebar.panellist").map(({ options }) => {
      const id = options.id;
      return { id, order: options.order ?? 0, label: (0, import_dsh_client_ui_slots.resolveSlotLabel)(options.label) ?? id };
    }).sort((a, b) => a.order - b.order);
    const previous = panels.getSnapshot();
    if (previous.length === next.length && previous.every((panel, index) => {
      const candidate = next[index];
      return panel.id === candidate.id && panel.order === candidate.order && panel.label === candidate.label;
    })) return;
    panels.set(next);
  };
  ctx.effect(() => ctx.slots.subscribe("sidebar.panellist", syncPanels), "ui-sidebar: panel entries");
  ctx.effect(() => ctx.locale.subscribe(syncPanels), "ui-sidebar: panel labels");
  const panelPins = createPanelPins();
  const entryActions = {
    getSnapshot: () => ctx.slots.entriesOfSlot("sidebar.panellist.actions").length > 0,
    subscribe: (listener) => ctx.slots.subscribe("sidebar.panellist.actions", listener)
  };
  const injectProps = () => ({
    // The shell's New Session button rides the Workspace UI's shared action
    // (current Session Workspace, then recent Workspace).
    startSession: (workspaceId) => {
      workspaceNavigation.startSession(workspaceId);
    },
    toggleSidebar: () => {
      ctx.layout.toggleSidebar();
    },
    selectPanel: (id) => {
      ctx.layout.selectPanel(id);
    },
    setPinned: panelPins.setPinned,
    trackEntryClick: (attributes) => {
      ctx.get("productAnalytics")?.track("sidebar_menu_click", attributes);
    },
    hooks: { panels, shortcuts: ctx.shortcuts.catalog, entryPins: panelPins.unpinned, entryActions }
  });
  ctx.slots.inject("sidebar", () => ctx.slots.register({
    name: "sidebar",
    locale: NS,
    children: {
      "sidebar.brand.mark": { kind: "single", scope: "root" },
      "sidebar.brand.name": { kind: "single", scope: "root" },
      "sidebar.toggle.badge": { kind: "single", scope: "root" },
      "sidebar.panellist": { kind: "list", scope: "root" },
      "sidebar.panellist.actions": { kind: "list", scope: "root" },
      "sidebar.workspaces": { kind: "single", scope: "root" },
      "sidebar.settings": { kind: "single", scope: "root" },
      "sidebar.footer.action": { kind: "list", scope: "root" }
    },
    inject: injectProps
  }, SidebarRoot));
  ctx.slots.inject("shell.leading", () => ctx.slots.register({
    name: "shell.leading",
    locale: NS,
    inject: injectProps
  }, HeaderLeadingControls));
  syncPanels();
}

    const sidebar = module.exports;
    return {
      inject: sidebar.inject,
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.plugin = "@rakan/dsh-sidebar-scroll";
          style.textContent = "/* src/client/HeaderLeadingControls.module.css */\n.HeaderLeadingControls_controls {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.HeaderLeadingControls_iconButton {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: none;\n  border-radius: var(--dsw-radius-sm);\n  background: transparent;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n}\n.HeaderLeadingControls_iconButton:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n/* src/client/SidebarRoot.module.css */\n.SidebarRoot_root {\n  --dsh-sidebar-inline-padding: 12px;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  padding: 6px var(--dsh-sidebar-inline-padding);\n  box-sizing: border-box;\n  background: var(--dsw-specific-sidebar-fill);\n  color: var(--dsw-alias-label-primary);\n  font-size: 14px;\n  --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);\n  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);\n}\n[data-platform=darwin] .SidebarRoot_root {\n  background: transparent;\n}\n.SidebarRoot_root.SidebarRoot_collapsed {\n  padding: 18px 10px 6px;\n}\n[data-windows-titlebar] .SidebarRoot_root .SidebarRoot_logoRow {\n  height: 40px;\n  margin: 0;\n  padding: 0;\n}\n[data-windows-titlebar] .SidebarRoot_toggle {\n  position: fixed;\n  top: calc((var(--dsh-windows-titlebar-height) - 28px) / 2);\n  left: 12px;\n  z-index: 30;\n  -webkit-app-region: no-drag;\n}\n[data-windows-titlebar] .SidebarRoot_root.SidebarRoot_collapsed .SidebarRoot_logoRow {\n  height: 0;\n}\n[data-windows-titlebar] .SidebarRoot_root:not(.SidebarRoot_collapsed) .SidebarRoot_brand {\n  padding-left: 4px;\n}\n[data-windows-titlebar] .SidebarRoot_brandIdentity {\n  transform: translateY(1px);\n}\n[data-windows-titlebar] .SidebarRoot_brandMark {\n  transform: translateX(1px);\n}\n[data-windows-titlebar] .SidebarRoot_brandName {\n  font-weight: 400;\n}\n[data-windows-titlebar] .SidebarRoot_root.SidebarRoot_collapsed {\n  padding: 0;\n}\n[data-windows-titlebar] .SidebarRoot_root:not(.SidebarRoot_collapsed) .SidebarRoot_newSession {\n  margin-top: 8px;\n  margin-left: 0;\n}\n[data-windows-titlebar] .SidebarRoot_collapsed .SidebarRoot_panelList,\n[data-windows-titlebar] .SidebarRoot_collapsed .SidebarRoot_regionArea,\n[data-windows-titlebar] .SidebarRoot_collapsed .SidebarRoot_footArea {\n  display: none;\n}\nhtml[data-windows-titlebar]:has([data-sidebar-collapsed=true]) {\n  --dsh-windows-menu-start: 84px;\n}\n[data-windows-titlebar] .SidebarRoot_collapsed .SidebarRoot_newSession {\n  position: fixed;\n  top: calc((var(--dsh-windows-titlebar-height) - 28px) / 2);\n  left: 48px;\n  margin: 0;\n  padding: 0;\n  border: none;\n  z-index: 30;\n  -webkit-app-region: no-drag;\n}\n[data-windows-titlebar] .SidebarRoot_railIn .SidebarRoot_iconButton,\n[data-windows-titlebar] .SidebarRoot_railIn .SidebarRoot_newSession {\n  animation: none;\n}\n[data-windows-titlebar] .SidebarRoot_collapsed .SidebarRoot_toggle,\n[data-windows-titlebar] .SidebarRoot_collapsed .SidebarRoot_newSession {\n  width: 28px;\n  height: 28px;\n  border-radius: var(--dsw-radius-sm);\n  color: var(--dsw-alias-label-secondary);\n}\n[data-windows-titlebar] .SidebarRoot_collapsed .SidebarRoot_toggle .SidebarRoot_panelIcon {\n  display: inline;\n}\n.SidebarRoot_root.SidebarRoot_quietBars {\n  --dsh-scrollbar-thumb: transparent;\n  --dsh-scrollbar-thumb-hover: transparent;\n}\n.SidebarRoot_fading > * {\n  opacity: 0;\n  transition: opacity 150ms var(--ds-ease-in-out);\n}\n.SidebarRoot_wide {\n  animation: SidebarRoot_wide-in 200ms var(--ds-ease-in-out);\n}\n@keyframes SidebarRoot_wide-in {\n  from {\n    opacity: 0;\n  }\n}\n.SidebarRoot_railIn .SidebarRoot_iconButton,\n.SidebarRoot_railIn .SidebarRoot_newSession,\n.SidebarRoot_railIn .SidebarRoot_panelList,\n.SidebarRoot_railIn .SidebarRoot_regionArea {\n  animation: SidebarRoot_rail-in 150ms var(--ds-ease-in-out) backwards;\n}\n.SidebarRoot_railIn .SidebarRoot_footArea {\n  animation: SidebarRoot_rail-fade-in 150ms var(--ds-ease-in-out) backwards;\n}\n@keyframes SidebarRoot_rail-in {\n  from {\n    opacity: 0;\n    transform: translateX(49px);\n  }\n}\n@keyframes SidebarRoot_rail-fade-in {\n  from {\n    opacity: 0;\n  }\n}\n.SidebarRoot_topStrip {\n  flex: none;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  height: 52px;\n  box-sizing: border-box;\n  margin: -6px calc(-1 * var(--dsh-sidebar-inline-padding)) 0;\n  padding: 0 12px 2px;\n}\n[data-fullscreen] .SidebarRoot_topStrip {\n  justify-content: flex-start;\n}\n.SidebarRoot_topStrip + .SidebarRoot_logoRow {\n  margin-top: -12px;\n}\n.SidebarRoot_logoRow {\n  flex: none;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 8px;\n  height: 60px;\n  padding: 8px 0 8px 4px;\n  margin-bottom: 4px;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.SidebarRoot_collapsed .SidebarRoot_logoRow {\n  height: 36px;\n  padding: 0;\n  margin-bottom: 12px;\n  justify-content: flex-start;\n  overflow: visible;\n}\n.SidebarRoot_brand {\n  flex: 1;\n  min-width: 0;\n  display: inline-flex;\n  align-items: center;\n  overflow: hidden;\n  padding: 0;\n  border: none;\n  background: transparent;\n  color: inherit;\n  cursor: pointer;\n}\n[data-platform=darwin] .SidebarRoot_brand {\n  cursor: default;\n}\n.SidebarRoot_brandIdentity {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  height: 24px;\n  min-width: 0;\n}\n.SidebarRoot_brandMark {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.SidebarRoot_brandName {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-width: 0;\n  height: 24px;\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 24px;\n  letter-spacing: 0.04em;\n}\n.SidebarRoot_fallbackBrandName {\n  font-size: 17px;\n  letter-spacing: 0px;\n  white-space: nowrap;\n}\n.SidebarRoot_localBuildBrand {\n  flex: none;\n  display: inline-flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n  gap: 1px;\n  height: 24px;\n  white-space: nowrap;\n}\n.SidebarRoot_localBuildTitle {\n  font-size: 12px;\n  line-height: 13px;\n  letter-spacing: 0;\n}\n.SidebarRoot_iconButton {\n  position: relative;\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: var(--dsw-radius-sm);\n  padding: 0;\n  background: transparent;\n  cursor: pointer;\n  color: var(--dsw-alias-label-secondary);\n}\n.SidebarRoot_iconButton:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.SidebarRoot_iconButton.SidebarRoot_toggle:focus-visible {\n  outline: var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));\n  outline-offset: -2px;\n}\n.SidebarRoot_collapsed .SidebarRoot_iconButton {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--dsw-radius-md);\n}\n.SidebarRoot_collapsed .SidebarRoot_toggle .SidebarRoot_panelIcon {\n  display: none;\n}\n.SidebarRoot_collapsed .SidebarRoot_toggle:hover .SidebarRoot_panelIcon {\n  display: inline;\n}\n.SidebarRoot_collapsed .SidebarRoot_toggle:hover .SidebarRoot_railMark {\n  display: none;\n}\n.SidebarRoot_railMark {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.SidebarRoot_collapsed .SidebarRoot_iconButton {\n  color: var(--dsw-alias-label-primary);\n}\n.SidebarRoot_buildVersion {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  height: 10px;\n  padding: 0 3px;\n  border-radius: 2px;\n  color: var(--dsw-alias-label-primary-inverted);\n  background: var(--dsw-alias-label-primary);\n  font-family: var(--ds-font-family-code);\n  font-size: 6px;\n  font-weight: 500;\n  line-height: 10px;\n  white-space: nowrap;\n}\n.SidebarRoot_newSession {\n  container-type: inline-size;\n  position: relative;\n  flex: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0;\n  height: 38px;\n  padding: 8px 12px;\n  margin: 0 2px 12px;\n  box-sizing: border-box;\n  border: 0.5px solid var(--dsw-alias-border-l3);\n  border-radius: var(--dsw-radius-md);\n  background: var(--dsw-alias-button-elevated-fill);\n  color: var(--dsw-alias-label-primary);\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 22px;\n  cursor: pointer;\n  overflow: hidden;\n}\n.SidebarRoot_newSession:hover {\n  background: var(--dsw-alias-button-floating-hover);\n}\n[data-platform=darwin] .SidebarRoot_newSession {\n  background: rgb(255 255 255 / 0.55);\n}\n[data-platform=darwin] .SidebarRoot_newSession:hover {\n  background: rgb(255 255 255 / 0.3);\n}\n[data-platform=darwin] [data-ds-dark-theme] .SidebarRoot_newSession {\n  background: rgb(255 255 255 / 0.15);\n}\n[data-platform=darwin] [data-ds-dark-theme] .SidebarRoot_newSession:hover {\n  background: rgb(255 255 255 / 0.2);\n}\n.SidebarRoot_collapsed .SidebarRoot_newSession {\n  align-self: flex-start;\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  margin: 0 0 12px;\n  gap: 0;\n  border-color: transparent;\n  background: transparent;\n}\n.SidebarRoot_collapsed .SidebarRoot_newSession:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.SidebarRoot_newSessionLabel {\n  max-width: 200px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.SidebarRoot_collapsed .SidebarRoot_newSessionLabel {\n  max-width: 0;\n}\n.SidebarRoot_newSessionLabelMask {\n  flex: 1;\n  min-width: 0;\n}\n.SidebarRoot_newSession:is(:hover, :focus-visible) .SidebarRoot_newSessionLabelMask:has(+ .SidebarRoot_newSessionShortcut) {\n  overflow: hidden;\n  mask-image:\n    linear-gradient(\n      to right,\n      black calc(100% - 16px),\n      transparent);\n}\n.SidebarRoot_newSessionContent {\n  display: flex;\n  width: 100cqw;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.SidebarRoot_newSessionContent > svg {\n  flex: none;\n}\n.SidebarRoot_newSessionShortcut {\n  opacity: 0;\n  display: inline-flex;\n  flex: none;\n  pointer-events: none;\n  font-weight: 400;\n}\n.SidebarRoot_newSession:is(:hover, :focus-visible) .SidebarRoot_newSessionShortcut {\n  opacity: 1;\n}\n.SidebarRoot_panelList {\n  flex: none;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin-bottom: 8px;\n}\n.SidebarRoot_panelRow {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0 2px;\n  min-height: 36px;\n  padding: 7px 8px;\n  box-sizing: border-box;\n  border: none;\n  border-radius: var(--dsw-radius-md);\n  background: transparent;\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  line-height: 22px;\n  text-align: left;\n  cursor: pointer;\n}\n.SidebarRoot_panelRow:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.SidebarRoot_panelRow.SidebarRoot_panelActive {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n.SidebarRoot_panelRow:focus-visible {\n  outline: var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));\n  outline-offset: -2px;\n}\n.SidebarRoot_moreAnchor {\n  display: flex;\n  flex-direction: column;\n}\n.SidebarRoot_panelRow[aria-expanded=true] {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.SidebarRoot_moreMenu {\n  width: 288px;\n  max-width: calc(100vw - 24px);\n}\n.SidebarRoot_panelGlyph {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.SidebarRoot_panelTitle {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.SidebarRoot_collapsed .SidebarRoot_panelList {\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.SidebarRoot_collapsed .SidebarRoot_panelRow {\n  width: 36px;\n  height: 36px;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n  color: var(--dsw-alias-label-primary);\n}\n.SidebarRoot_scrollArea {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-height: 0;\n  min-width: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n  overscroll-behavior-y: contain;\n  scrollbar-gutter: stable;\n  margin-right: calc(-1 * var(--dsh-sidebar-inline-padding));\n  padding-right: calc(var(--dsh-sidebar-inline-padding) - var(--dsh-scrollbar-width, 5px));\n}\n.SidebarRoot_scrollArea .pj-root,\n.SidebarRoot_scrollArea .pj-list {\n  flex: none;\n  min-height: auto;\n}\n.SidebarRoot_scrollArea .pj-list {\n  overflow: visible;\n  scrollbar-gutter: auto;\n}\n.SidebarRoot_regionArea {\n  flex: none;\n  min-height: auto;\n  display: flex;\n  flex-direction: column;\n  margin-left: -4px;\n  margin-right: calc(-1 * var(--dsh-sidebar-inline-padding));\n  padding-left: 4px;\n  overflow: visible;\n}\n.SidebarRoot_collapsed .SidebarRoot_regionArea {\n  margin-left: 0;\n  margin-right: 0;\n  padding-left: 0;\n}\n.SidebarRoot_footArea {\n  flex: none;\n  display: flex;\n  flex-direction: column;\n}\n.SidebarRoot_settingsArea,\n.SidebarRoot_footerActions {\n  flex: none;\n  min-width: 0;\n  width: 100%;\n}\n.SidebarRoot_footerActions {\n  display: flex;\n}\n.SidebarRoot_collapsed .SidebarRoot_footArea {\n  align-items: center;\n}\n.SidebarRoot_collapsed .SidebarRoot_settingsArea,\n.SidebarRoot_collapsed .SidebarRoot_footerActions {\n  display: flex;\n  justify-content: center;\n  width: auto;\n}\n@media (prefers-reduced-motion: reduce) {\n  .SidebarRoot_wide,\n  .SidebarRoot_fading > *,\n  .SidebarRoot_railIn .SidebarRoot_iconButton,\n  .SidebarRoot_railIn .SidebarRoot_newSession,\n  .SidebarRoot_railIn .SidebarRoot_panelList,\n  .SidebarRoot_railIn .SidebarRoot_footArea,\n  .SidebarRoot_railIn .SidebarRoot_regionArea {\n    transition: none;\n    animation: none;\n  }\n}\n";
          document.head.appendChild(style);
          return () => style.remove();
        }, 'sidebar-scroll: styles');
        sidebar.apply(ctx);
      }
    };
  }
});
