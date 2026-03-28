import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GoldenLayout } from "golden-layout";

import ChartPanel from "../components/panels/ChartPanel";
import TablePanel from "../components/panels/TablePanel";
import LogsPanel from "../components/panels/LogsPanel";
import MapPanel from "../components/panels/MapPanel";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardFooter from "../components/dashboard/DashboardFooter";

import {
  getPanelTitle,
  getSavedLayout,
  makePanelId,
  panelOptions,
  resetSavedLayout,
  saveLayout,
  exportLayout
} from "../utils/dashboardLayout";

const panelComponents = {
  Chart: ChartPanel,
  Table: TablePanel,
  Logs: LogsPanel,
  Map: MapPanel,
};

function DashboardPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [navOpen, setNavOpen] = useState(localStorage.getItem("dashboard-nav-open") !== "0");
  const [navMode, setNavMode] = useState(localStorage.getItem("dashboard-nav-mode") || "vertical");
  const [selectedPanelType, setSelectedPanelType] = useState("Chart");
  const [activePanels, setActivePanels] = useState([]);

  const containerRef = useRef(null);
  const layoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard-nav-open", navOpen ? "1" : "0");
    localStorage.setItem("dashboard-nav-mode", navMode);
    if (layoutRef.current) setTimeout(() => layoutRef.current.updateSize(), 100);
  }, [navOpen, navMode, isMobile]);

  useEffect(() => {
    const layout = new GoldenLayout(containerRef.current);

    const setupPanel = (name) => {
      layout.registerComponentFactoryFunction(name, (container) => {
        const id = makePanelId();
        setActivePanels((prev) => [...prev, { id, name, container }]);
        container.on("destroy", () => {
          setActivePanels((prev) => prev.filter((p) => p.container !== container));
        });
      });
    };

    setupPanel("Chart");
    setupPanel("Table");
    setupPanel("Logs");
    setupPanel("Map");

    const config = getSavedLayout(isMobile);
    layout.loadLayout(config);
    layoutRef.current = layout;

    return () => {
      layout.destroy();
      layoutRef.current = null;
      setActivePanels([]);
    };
  }, [isMobile]);

  const addPanel = () => {
    if (layoutRef.current) {
      layoutRef.current.newComponent(selectedPanelType, {}, getPanelTitle(selectedPanelType));
    }
  };

  const removeLastPanel = () => {
    if (activePanels.length > 0) {
      activePanels[activePanels.length - 1].container.close();
      setTimeout(() => {
        if (layoutRef.current) {
          const config = layoutRef.current.saveLayout();
          setActivePanels([]);
          layoutRef.current.loadLayout(config);
        }
      }, 50);
    }
  };

  return (
    <div className={`${isMobile || navMode === "horizontal" ? "flex flex-col" : "flex"} h-dvh bg-slate-900 text-white overflow-hidden`}>
      <DashboardHeader
        isMobile={isMobile}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        navMode={navMode}
        setNavMode={setNavMode}
        selectedPanelType={selectedPanelType}
        setSelectedPanelType={setSelectedPanelType}
        panelOptions={panelOptions}
        onAddPanel={addPanel}
        onRemoveLastPanel={removeLastPanel}
        onExportLayout={() => layoutRef.current && exportLayout(layoutRef.current.saveLayout())}
        onResetLayout={() => { resetSavedLayout(); window.location.reload(); }}
        onSaveLayout={() => { if (layoutRef.current) { saveLayout(layoutRef.current.saveLayout(), isMobile); alert("Layout Saved!"); } }}
      />

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 relative bg-slate-950 border-t border-slate-800">
          <div ref={containerRef} className="absolute inset-0" />
          {activePanels.map((panel) => {
            const Component = panelComponents[panel.name];
            return createPortal(<Component key={panel.id} />, panel.container.element);
          })}
        </div>
        <DashboardFooter panelCount={activePanels.length} />
      </div>
    </div>
  );
}

export default DashboardPage;
