import React from 'react';
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
} from 'react-icons/fi';
import Button from '../common/Button';

function LayoutIcon({ type }) {
  if (type === 'horizontal') {
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

function DashboardHeader(props) {
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

  function onPanelChange(e) {
    setSelectedPanelType(e.target.value);
  }

  function toggleMobileMenu() {
    setShowMobileControls(!showMobileControls);
  }

  function setHorizontalMode() {
    setNavMode('horizontal');
  }

  function setVerticalMode() {
    setNavMode('vertical');
  }

  function openSidebar() {
    setNavOpen(true);
  }

  function closeSidebar() {
    setNavOpen(false);
  }

  const isHorizontal = navMode === 'horizontal';
  const isVertical = navMode === 'vertical';

  if (isMobile) {
    return (
      <nav className="border-b border-gray-800 bg-gray-950">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-600 rounded-md">
              <FiGrid className="text-white w-4 h-4" />
            </div>
            <span className="text-base font-semibold text-white">
              Panel<span className="text-indigo-400">X</span>
            </span>
          </div>
          <Button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle controls"
            className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FiMenu className="w-4 h-4" />
          </Button>
        </div>

        {showMobileControls && (
          <div className="border-t border-gray-800 px-4 py-3 flex flex-col gap-3">
            <select
              value={selectedPanelType}
              onChange={onPanelChange}
              className="px-3 py-1.5 rounded-md bg-gray-800 border border-gray-700 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer w-full"
            >
              {panelOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                onClick={onAddPanel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 bg-emerald-700 hover:bg-emerald-600 border-emerald-600 text-white justify-center"
              >
                <FiPlus className="w-3.5 h-3.5" />
                Add Panel
              </Button>

              <Button
                type="button"
                onClick={onRemoveLastPanel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 bg-gray-800 hover:bg-rose-900/50 border-gray-700 hover:border-rose-700 text-gray-300 hover:text-rose-300 justify-center"
              >
                <FiX className="w-3.5 h-3.5" />
                Remove
              </Button>
            </div>

            <div className="h-px bg-gray-800" />

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={onExportLayout}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
              >
                <FiDownload className="w-3.5 h-3.5" /> Export
              </Button>

              <Button
                type="button"
                onClick={onResetLayout}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
              >
                <FiRefreshCw className="w-3.5 h-3.5" /> Reset
              </Button>
            </div>

            <Button
              type="button"
              onClick={onSaveLayout}
              className="flex items-center justify-center gap-2 py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-sm font-semibold text-white transition-all w-full"
            >
              <FiSave className="w-4 h-4" /> Save Layout
            </Button>
          </div>
        )}
      </nav>
    );
  }

  if (navMode === 'vertical') {
    if (!navOpen) {
      return (
        <aside className="w-14 border-r border-gray-800 bg-gray-950 flex flex-col items-center py-3 gap-3">
          <div className="p-2 bg-indigo-600 rounded-md">
            <FiGrid className="text-white w-4 h-4" />
          </div>

          <Button
            type="button"
            title="Switch to horizontal"
            onClick={setHorizontalMode}
            className="p-1.5 rounded-md bg-gray-800 border border-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <LayoutIcon type="horizontal" />
          </Button>

          <div className="flex-1" />

          <Button
            type="button"
            title="Expand sidebar"
            onClick={openSidebar}
            className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FiChevronRight className="w-4 h-4" />
          </Button>
        </aside>
      );
    }

    return (
      <aside className="w-64 border-r border-gray-800 bg-gray-950 flex flex-col p-3 gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-600 rounded-md">
              <FiGrid className="text-white w-4 h-4" />
            </div>
            <span className="text-base font-semibold text-white">
              Panel<span className="text-indigo-400">X</span>
            </span>
          </div>

          <Button
            type="button"
            title="Collapse sidebar"
            onClick={closeSidebar}
            className="p-1.5 rounded-md bg-gray-800 border border-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <FiChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="h-9 flex items-center">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Layout</span>
          </div>
          <div className="h-9 inline-flex items-center rounded-md border border-gray-700 bg-gray-800 p-0.5 gap-0.5">
            <Button
              type="button"
              onClick={setHorizontalMode}
              aria-label="horizontal layout"
              className={`p-1.5 rounded transition-all duration-150 ${isHorizontal ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
            >
              <LayoutIcon type="horizontal" />
            </Button>
            <Button
              type="button"
              onClick={setVerticalMode}
              aria-label="vertical layout"
              className={`p-1.5 rounded transition-all duration-150 ${isVertical ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
            >
              <LayoutIcon type="vertical" />
            </Button>
          </div>
        </div>

        <div className="h-px bg-gray-800" />

        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Panel</span>
          <select
            value={selectedPanelType}
            onChange={onPanelChange}
            className="px-3 py-1.5 rounded-md bg-gray-800 border border-gray-700 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer w-full"
          >
            {panelOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onClick={onAddPanel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 bg-emerald-700 hover:bg-emerald-600 border-emerald-600 text-white justify-center"
            >
              <FiPlus className="w-3.5 h-3.5" />
              Add
            </Button>

            <Button
              type="button"
              onClick={onRemoveLastPanel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 bg-gray-800 hover:bg-rose-900/50 border-gray-700 hover:border-rose-700 text-gray-300 hover:text-rose-300 justify-center"
            >
              <FiX className="w-3.5 h-3.5" />
              Remove
            </Button>
          </div>
        </div>

        <div className="h-px bg-gray-800" />

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Actions</span>

          <Button
            type="button"
            onClick={onExportLayout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-gray-800/50 hover:bg-gray-800 border border-transparent hover:border-gray-700 text-sm text-gray-400 hover:text-gray-200 transition-all duration-150 w-full"
          >
            <FiDownload className="w-3.5 h-3.5 shrink-0" />
            Export JSON
          </Button>

          <Button
            type="button"
            onClick={onResetLayout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-gray-800/50 hover:bg-gray-800 border border-transparent hover:border-gray-700 text-sm text-gray-400 hover:text-gray-200 transition-all duration-150 w-full"
          >
            <FiRefreshCw className="w-3.5 h-3.5 shrink-0" />
            Reset Layout
          </Button>
        </div>

        <div className="flex-1" />

        <Button
          type="button"
          onClick={onSaveLayout}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-sm font-semibold text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] w-full"
        >
          <FiSave className="w-4 h-4" />
          Save Layout
        </Button>
      </aside>
    );
  }

  return (
    <nav className="border-b border-gray-800 bg-gray-950 px-4 py-2 flex items-center justify-between gap-3 min-h-13">
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="p-1.5 bg-indigo-600 rounded-md">
          <FiGrid className="text-white w-4 h-4" />
        </div>
        <span className="text-base font-semibold text-white tracking-tight">
          Panel<span className="text-indigo-400">X</span>
        </span>
      </div>

      <div className="flex items-center gap-1 flex-wrap justify-end">
        <div className="inline-flex rounded-md border border-gray-700 bg-gray-800 p-0.5 gap-0.5">
          <Button
            type="button"
            onClick={setHorizontalMode}
            aria-label="horizontal layout"
            className={`p-1.5 rounded transition-all duration-150 ${isHorizontal ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
          >
            <LayoutIcon type="horizontal" />
          </Button>
          <Button
            type="button"
            onClick={setVerticalMode}
            aria-label="vertical layout"
            className={`p-1.5 rounded transition-all duration-150 ${isVertical ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
          >
            <LayoutIcon type="vertical" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-700/60 mx-1 self-center shrink-0" />

        <select
          value={selectedPanelType}
          onChange={onPanelChange}
          className="px-3 py-1.5 rounded-md bg-gray-800 border border-gray-700 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer w-40"
        >
          {panelOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <Button
          type="button"
          onClick={onAddPanel}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 bg-emerald-700 hover:bg-emerald-600 border-emerald-600 text-white"
        >
          <FiPlus className="w-3.5 h-3.5" />
          Add
        </Button>

        <Button
          type="button"
          onClick={onRemoveLastPanel}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 bg-gray-800 hover:bg-rose-900/60 border-gray-700 hover:border-rose-700 text-gray-300 hover:text-rose-300"
        >
          <FiX className="w-3.5 h-3.5" />
          Remove
        </Button>

        <div className="w-px h-6 bg-gray-700/60 mx-1 self-center shrink-0" />

        <Button
          type="button"
          title="Export JSON"
          onClick={onExportLayout}
          aria-label="Export JSON"
          className="p-2 rounded-md border text-sm flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 bg-gray-800 border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-500"
        >
          <FiDownload className="w-3.5 h-3.5" />
        </Button>

        <Button
          type="button"
          title="Reset Layout"
          onClick={onResetLayout}
          aria-label="Reset Layout"
          className="p-2 rounded-md border text-sm flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 bg-gray-800 border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-500"
        >
          <FiRefreshCw className="w-3.5 h-3.5" />
        </Button>

        <div className="w-px h-6 bg-gray-700/60 mx-1 self-center shrink-0" />

        <Button
          type="button"
          onClick={onSaveLayout}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md border text-sm font-semibold transition-all duration-150 hover:scale-105 active:scale-95 bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white"
        >
          <FiSave className="w-3.5 h-3.5" />
          Save
        </Button>
      </div>
    </nav>
  );
}

export default DashboardHeader;
