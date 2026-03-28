import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GoldenLayout, LayoutConfig } from "golden-layout";

import ChartPanel from "../components/panels/ChartPanel";
import TablePanel from "../components/panels/TablePanel";
import LogsPanel from "../components/panels/LogsPanel";
import MapPanel from "../components/panels/MapPanel";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardFooter from "../components/dashboard/DashboardFooter";

import {
  defaultLayout,
  getPanelTitle,
  getSavedLayout,
  makePanelId,
  mobileDefaultLayout,
  panelOptions,
  resetSavedLayout,
  saveLayout,
  exportLayout
} from "../utils/dashboardLayout";

const panels = {
  Chart: ChartPanel,
  Table: TablePanel,
  Logs: LogsPanel,
  Map: MapPanel,
};

function DashboardPage() {
  const [isNavOpen, setIsNavOpen] = useState(localStorage.getItem("dashboard-nav-open") !== "0");
  const [layoutMode, setLayoutMode] = useState(localStorage.getItem("dashboard-nav-mode") || "vertical");
  const [selectedPanelType, setSelectedPanelType] = useState("Chart");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [panelInstances, setPanelInstances] = useState([]);

  const layoutContainerRef = useRef(null);
  const goldenLayoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard-nav-open", isNavOpen ? "1" : "0");
    localStorage.setItem("dashboard-nav-mode", layoutMode);
    if (goldenLayoutRef.current) setTimeout(() => goldenLayoutRef.current.updateSize(), 100);
  }, [isNavOpen, layoutMode, isMobile]);

  useEffect(() => {
    const config = getSavedLayout(isMobile) || (isMobile ? mobileDefaultLayout : defaultLayout);
    const layout = new GoldenLayout(layoutContainerRef.current);

    Object.keys(panels).forEach((name) => {
      layout.registerComponentFactoryFunction(name, (container) => {
        const id = makePanelId();
        setPanelInstances((prev) => [...prev, { id, name, container }]);
        container.on("destroy", () => {
          setPanelInstances((prev) => prev.filter((item) => item.container !== container));
        });
      });
    });

    try {
      layout.loadLayout(config);
      layout.loadLayout(LayoutConfig.fromResolved(layout.saveLayout()));
    } catch (err) {
      layout.loadLayout(isMobile ? mobileDefaultLayout : defaultLayout);
    }

    goldenLayoutRef.current = layout;
    return () => {
      layout.destroy();
      goldenLayoutRef.current = null;
      setPanelInstances([]);
    };
  }, [isMobile]);

  const addPanel = () => {
    if (goldenLayoutRef.current) {
      goldenLayoutRef.current.newComponent(selectedPanelType, {}, getPanelTitle(selectedPanelType));
    }
  };

  const removeLast = () => {
    if (panelInstances.length > 0) {
      panelInstances[panelInstances.length - 1].container.close();
      setTimeout(() => {
        if (goldenLayoutRef.current) {
          const cfg = LayoutConfig.fromResolved(goldenLayoutRef.current.saveLayout());
          setPanelInstances([]);
          goldenLayoutRef.current.loadLayout(cfg);
        }
      }, 50);
    }
  };

  return (
    <div className={`${isMobile || layoutMode === "horizontal" ? "flex flex-col" : "flex"} h-dvh bg-slate-900 text-white overflow-hidden`}>
      <DashboardHeader
        isMobile={isMobile}
        navOpen={isNavOpen}
        setNavOpen={setIsNavOpen}
        navMode={layoutMode}
        setNavMode={setLayoutMode}
        selectedPanelType={selectedPanelType}
        setSelectedPanelType={setSelectedPanelType}
        panelOptions={panelOptions}
        onAddPanel={addPanel}
        onRemoveLastPanel={removeLast}
        onExportLayout={() => goldenLayoutRef.current && exportLayout(goldenLayoutRef.current.saveLayout())}
        onResetLayout={() => { resetSavedLayout(); window.location.reload(); }}
        onSaveLayout={() => { saveLayout(goldenLayoutRef.current.saveLayout(), isMobile); alert("Saved!"); }}
      />

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 relative bg-slate-950 border-t border-slate-800">
          <div ref={layoutContainerRef} className="absolute inset-0" />
          {panelInstances.map((item) => {
            const Panel = panels[item.name];
            return createPortal(<Panel key={item.id} />, item.container.element);
          })}
        </div>
        <DashboardFooter panelCount={panelInstances.length} />
      </div>
    </div>
  );
}

export default DashboardPage;
