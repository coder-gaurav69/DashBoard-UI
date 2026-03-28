import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiGrid,
  FiMenu,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiX,
} from "react-icons/fi";
import Button from "../common/Button";

function LayoutIcon({ type }) {
  if (type === "horizontal") {
    return (
      <span className="flex flex-col gap-0.5 w-4 h-3.5">
        <span className="h-1 w-full rounded-sm bg-current opacity-80" />
        <span className="h-1.5 w-full rounded-sm bg-current opacity-40" />
      </span>
    );
  }
  return (
    <span className="flex flex-row gap-0.5 w-4 h-3.5">
      <span className="w-1 h-full rounded-sm bg-current opacity-80" />
      <span className="flex-1 h-full rounded-sm bg-current opacity-40" />
    </span>
  );
}

const DashboardHeader = (props) => {
  const {
    isMobile,
    navOpen,
    setNavOpen,
    navMode,
    setNavMode,
    selectedPanelType,
    setSelectedPanelType,
    panelOptions,
    showMobileControls,
    setShowMobileControls,
    onAddPanel,
    onRemoveLastPanel,
    onExportLayout,
    onResetLayout,
    onSaveLayout,
  } = props;

  const isVertical = navMode === "vertical";

  if (isMobile) {
    return (
      <nav className="bg-gray-950 border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-600 rounded-md">
              <FiGrid className="text-white w-4 h-4" />
            </div>
            <span className="text-base font-semibold text-white">Dashboard</span>
          </div>
          <Button onClick={() => setShowMobileControls(!showMobileControls)} className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300">
            <FiMenu className="w-5 h-5" />
          </Button>
        </div>
        {showMobileControls && (
          <div className="border-t border-gray-800 px-4 py-4 flex flex-col gap-3 bg-gray-950">
            <select
              value={selectedPanelType}
              onChange={(e) => setSelectedPanelType(e.target.value)}
              className="px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm text-gray-200 w-full outline-none"
            >
              {panelOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={onAddPanel} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 hover:scale-[1.02] transition-all"><FiPlus size={18} /> Add</Button>
              <Button onClick={onRemoveLastPanel} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm font-semibold text-gray-300 hover:bg-rose-900/20 hover:border-rose-700 hover:text-rose-400 hover:scale-[1.02] transition-all"><FiX size={18} /> Remove</Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={onExportLayout} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm font-semibold text-gray-300 hover:scale-[1.02] transition-all"><FiDownload size={18} /> Export</Button>
              <Button onClick={onResetLayout} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm font-semibold text-gray-300 hover:scale-[1.02] transition-all"><FiRefreshCw size={18} /> Reset</Button>
            </div>
            <Button onClick={onSaveLayout} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 hover:scale-[1.02] transition-all"><FiSave size={18} /> Save Layout</Button>
          </div>
        )}
      </nav>
    );
  }

  if (isVertical) {
    if (!navOpen) {
      return (
        <aside className="w-16 border-r border-gray-800 bg-gray-950 flex flex-col items-center py-4 gap-4">
          <div className="p-1.5 bg-indigo-600 rounded-md">
            <FiGrid className="text-white w-4 h-4" />
          </div>
          <Button onClick={() => setNavMode("horizontal")} className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-400">
            <LayoutIcon type="horizontal" />
          </Button>
          <div className="flex-1" />
          <Button onClick={() => setNavOpen(true)} className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300">
            <FiChevronRight size={18} />
          </Button>
        </aside>
      );
    }
    return (
      <aside className="w-64 border-r border-gray-800 bg-gray-950 flex flex-col p-4 gap-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-600 rounded-md">
              <FiGrid className="text-white w-4 h-4" />
            </div>
            <span className="text-base font-semibold text-white">Dashboard</span>
          </div>
          <Button onClick={() => setNavOpen(false)} className="p-1.5 rounded-md bg-gray-800 border border-gray-700 text-gray-400 hover:text-white">
            <FiChevronLeft size={18} />
          </Button>
        </div>
        <div className="flex items-center justify-between bg-gray-900/50 p-1.5 rounded-lg border border-gray-800">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Layout</span>
          <div className="flex gap-1 bg-gray-800 p-1 rounded-md">
            <Button onClick={() => setNavMode("horizontal")} className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"><LayoutIcon type="horizontal" /></Button>
            <Button className="p-1.5 rounded-md bg-indigo-600 text-white shadow-sm"><LayoutIcon type="vertical" /></Button>
          </div>
        </div>
        <div className="h-px bg-gray-800 mx-1" />
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Add Panel</span>
          <select value={selectedPanelType} onChange={(e) => setSelectedPanelType(e.target.value)} className="px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm text-gray-200 outline-none">
            {panelOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={onAddPanel} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-500 hover:scale-[1.02] transition-all"><FiPlus size={18} /> Add</Button>
            <Button onClick={onRemoveLastPanel} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm font-semibold text-gray-300 hover:bg-rose-900/20 hover:border-rose-700 hover:text-rose-400 hover:scale-[1.02] transition-all"><FiX size={18} /> Remove</Button>
          </div>
        </div>
        <div className="h-px bg-gray-800 mx-1" />
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Management</span>
          <Button onClick={onExportLayout} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-all"><FiDownload size={16} /> Export JSON</Button>
          <Button onClick={onResetLayout} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-all"><FiRefreshCw size={16} /> Reset Layout</Button>
        </div>
        <div className="flex-1" />
        <Button onClick={onSaveLayout} className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all"><FiSave size={18} /> Save Layout</Button>
      </aside>
    );
  }

  return (
    <nav className="bg-gray-950 border-b border-gray-800 px-6 py-2.5 flex items-center justify-between shadow-xl">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-indigo-600 rounded-md">
          <FiGrid className="text-white w-4 h-4" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-800/50 border border-gray-700 p-1 rounded-lg">
          <Button className="px-4 py-1.5 rounded-md bg-indigo-600 text-xs font-bold text-white shadow-sm">Top Bar</Button>
          <Button onClick={() => setNavMode("vertical")} className="px-4 py-1.5 rounded-md text-xs font-bold text-gray-400 hover:text-white hover:bg-gray-700 transition-all">Sidebar</Button>
        </div>
        <div className="w-px h-6 bg-gray-800 mx-1" />
        <div className="flex items-center gap-2">
          <select value={selectedPanelType} onChange={(e) => setSelectedPanelType(e.target.value)} className="bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-md text-white text-xs outline-none">
            {panelOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <Button onClick={onAddPanel} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-500 hover:scale-[1.02] transition-all"><FiPlus size={18} /> Add</Button>
          <Button onClick={onRemoveLastPanel} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm font-semibold text-gray-300 hover:bg-rose-900/20 hover:border-rose-700 hover:text-rose-400 hover:scale-[1.02] transition-all"><FiX size={18} /> Remove</Button>
        </div>
        <div className="w-px h-6 bg-gray-800 mx-1" />
        <div className="flex items-center gap-2">
          <Button onClick={onExportLayout} title="Export" className="p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 hover:text-white transition-all"><FiDownload size={18}/></Button>
          <Button onClick={onResetLayout} title="Reset" className="p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 hover:text-white transition-all"><FiRefreshCw size={18}/></Button>
          <Button onClick={onSaveLayout} className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-md bg-indigo-600 border border-indigo-500 text-sm font-bold text-white hover:bg-indigo-500 hover:scale-[1.02] transition-all shadow-lg shadow-indigo-900/20"><FiSave size={18} /> Save Layout</Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
