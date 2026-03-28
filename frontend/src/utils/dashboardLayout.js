import { LayoutConfig } from 'golden-layout';

export const desktopSaveKey = 'dashboard-layout-v2';
export const mobileSaveKey = 'dashboard-layout-mobile-v1';

export const panelOptions = [
  { value: 'Chart', label: 'Chart Panel', title: 'Analytics' },
  { value: 'Table', label: 'Table Panel', title: 'Data Table' },
  { value: 'Logs', label: 'Logs Panel', title: 'System Logs' },
  { value: 'Map', label: 'Map Panel', title: 'Live Map' },
];

export const defaultLayout = {
  root: {
    type: 'row',
    content: [
      {
        type: 'stack',
        width: 60,
        content: [
          { type: 'component', componentType: 'Chart', title: 'Analytics' },
          { type: 'component', componentType: 'Table', title: 'Data Table' },
        ],
      },
      {
        type: 'column',
        width: 40,
        content: [
          { type: 'component', componentType: 'Logs', title: 'System Logs' },
          { type: 'component', componentType: 'Map', title: 'Live Map' },
        ],
      },
    ],
  },
};

export const mobileDefaultLayout = {
  root: {
    type: 'stack',
    content: [
      { type: 'component', componentType: 'Chart', title: 'Analytics' },
      { type: 'component', componentType: 'Table', title: 'Data Table' },
      { type: 'component', componentType: 'Logs', title: 'System Logs' },
      { type: 'component', componentType: 'Map', title: 'Live Map' },
    ],
  },
};

export function makePanelId() {
  return Math.random().toString(36).slice(2, 9);
}

export function getSavedLayout(isMobile) {
  const key = isMobile ? mobileSaveKey : desktopSaveKey;
  const initialConfig = isMobile ? mobileDefaultLayout : defaultLayout;
  const saved = localStorage.getItem(key);

  if (!saved) return initialConfig;

  try {
    const data = JSON.parse(saved);
    if (data && data.root && data.root.contentItems) {
      return LayoutConfig.fromResolved(data);
    }
    return data || initialConfig;
  } catch {
    return initialConfig;
  }
}

export function getPanelTitle(panelType) {
  const panel = panelOptions.find((p) => p.value === panelType);
  return panel ? panel.title : panelType;
}

export function saveLayout(layout, isMobile) {
  const key = isMobile ? mobileSaveKey : desktopSaveKey;
  const config = LayoutConfig.fromResolved(layout);
  localStorage.setItem(key, JSON.stringify(config));
}

export function exportLayout(layout) {
  const config = LayoutConfig.fromResolved(layout);
  const data = JSON.stringify(config, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "dashboard_layout.json";
  link.click();
}

export function resetSavedLayout() {
  localStorage.removeItem(desktopSaveKey);
  localStorage.removeItem(mobileSaveKey);
}
