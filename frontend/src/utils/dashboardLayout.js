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
  const defaultConfig = isMobile ? mobileDefaultLayout : defaultLayout;
  const savedText = localStorage.getItem(key);

  if (!savedText) {
    return defaultConfig;
  }

  try {
    const savedData = JSON.parse(savedText);

    if (savedData?.root?.type) {
      return savedData;
    }

    if (savedData?.root?.contentItems) {
      return LayoutConfig.fromResolved(savedData);
    }

    return defaultConfig;
  } catch {
    return defaultConfig;
  }
}

export function getPanelTitle(panelType) {
  const panel = panelOptions.find((item) => item.value === panelType);
  return panel ? panel.title : panelType;
}

export function saveLayout(layout, isMobile) {
  const key = isMobile ? mobileSaveKey : desktopSaveKey;
  const data = LayoutConfig.fromResolved(layout);
  localStorage.setItem(key, JSON.stringify(data));
}

export function exportLayout(layout) {
  const text = JSON.stringify(layout, null, 2);
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'dashboard-layout.json';
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

export function resetSavedLayout() {
  localStorage.removeItem(desktopSaveKey);
  localStorage.removeItem(mobileSaveKey);
}
