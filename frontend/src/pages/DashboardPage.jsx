import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { GoldenLayout, LayoutConfig } from 'golden-layout';
import ChartPanel from '../components/panels/ChartPanel';
import TablePanel from '../components/panels/TablePanel';
import LogsPanel from '../components/panels/LogsPanel';
import MapPanel from '../components/panels/MapPanel';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import {
  defaultLayout,
  exportLayout,
  getPanelTitle,
  getSavedLayout,
  makePanelId,
  mobileDefaultLayout,
  panelOptions,
  resetSavedLayout,
  saveLayout,
} from '../utils/dashboardLayout';

const panelMap = {
  Chart: ChartPanel,
  Table: TablePanel,
  Logs: LogsPanel,
  Map: MapPanel,
};

function DashboardPage() {
  const [isNavOpen, setIsNavOpen] = useState(localStorage.getItem('dashboard-nav-open') !== '0');
  const [layoutMode, setLayoutMode] = useState(localStorage.getItem('dashboard-nav-mode') || 'vertical');
  const [selectedPanelType, setSelectedPanelType] = useState('Chart');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [panelInstances, setPanelInstances] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const containerRef = useRef(null);
  const layoutRef = useRef(null);

  function rebuildLayout() {
    if (!layoutRef.current) {
      return;
    }

    const cleanConfig = LayoutConfig.fromResolved(layoutRef.current.saveLayout());
    setPanelInstances([]);
    layoutRef.current.loadLayout(cleanConfig);
  }

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-nav-open', isNavOpen ? '1' : '0');
  }, [isNavOpen]);

  useEffect(() => {
    localStorage.setItem('dashboard-nav-mode', layoutMode);
  }, [layoutMode]);

  useEffect(() => {
    if (!layoutRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      if (layoutRef.current) {
        layoutRef.current.updateSize();
      }
    }, 80);

    return () => clearTimeout(timer);
  }, [isNavOpen, layoutMode, isMobile]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const savedLayout = getSavedLayout(isMobile);
    const fallbackLayout = isMobile ? mobileDefaultLayout : defaultLayout;
    const layout = new GoldenLayout(containerRef.current);

    for (const name of Object.keys(panelMap)) {
      layout.registerComponentFactoryFunction(name, (container) => {
        const id = makePanelId();
        setPanelInstances((old) => [...old, { id, name, container }]);

        container.on('destroy', () => {
          setPanelInstances((old) => old.filter((item) => item.container !== container));
        });
      });
    }

    try {
      layout.loadLayout(savedLayout);
    } catch {
      layout.loadLayout(fallbackLayout);
    }

    const cleanData = LayoutConfig.fromResolved(layout.saveLayout());
    layout.loadLayout(cleanData);

    layoutRef.current = layout;

    function onWindowResize() {
      if (layoutRef.current) {
        layoutRef.current.updateSize();
      }
    }

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      layout.destroy();
      layoutRef.current = null;
      setPanelInstances([]);
    };
  }, [isMobile]);

  function handleAddPanel() {
    if (!layoutRef.current) {
      return;
    }

    const panelTitle = getPanelTitle(selectedPanelType);
    layoutRef.current.newComponent(selectedPanelType, {}, panelTitle);
  }

  function handleRemovePanel() {
    if (panelInstances.length === 0) {
      return;
    }

    const lastPanel = panelInstances[panelInstances.length - 1];
    lastPanel.container.close();

    setTimeout(() => {
      rebuildLayout();
    }, 0);
  }

  function handleSaveLayout() {
    if (!layoutRef.current) {
      return;
    }

    saveLayout(layoutRef.current.saveLayout(), isMobile);
    alert('Layout saved');
  }

  function handleExportLayout() {
    if (!layoutRef.current) {
      return;
    }

    exportLayout(layoutRef.current.saveLayout());
  }

  function handleResetLayout() {
    resetSavedLayout();
    window.location.reload();
  }

  const isHorizontal = isMobile || layoutMode === 'horizontal';

  return (
    <div className={`${isHorizontal ? 'flex flex-col' : 'flex'} h-dvh bg-slate-900 overflow-hidden`}>
      <DashboardHeader
        isMobile={isMobile}
        navOpen={isNavOpen}
        setNavOpen={setIsNavOpen}
        navMode={layoutMode}
        setNavMode={setLayoutMode}
        selectedPanelType={selectedPanelType}
        setSelectedPanelType={setSelectedPanelType}
        panelOptions={panelOptions}
        showMobileControls={showMobileMenu}
        setShowMobileControls={setShowMobileMenu}
        onAddPanel={handleAddPanel}
        onRemoveLastPanel={handleRemovePanel}
        onExportLayout={handleExportLayout}
        onResetLayout={handleResetLayout}
        onSaveLayout={handleSaveLayout}
      />

      <div className="flex-1 min-h-0 min-w-0 flex flex-col">
        <div className="flex-1 min-h-0 relative bg-slate-950">
          <div ref={containerRef} className="absolute inset-0" />
          {panelInstances.map((item) => {
            const Panel = panelMap[item.name];
            return createPortal(<Panel key={item.id} />, item.container.element);
          })}
        </div>

        <DashboardFooter panelCount={panelInstances.length} />
      </div>
    </div>
  );
}

export default DashboardPage;
