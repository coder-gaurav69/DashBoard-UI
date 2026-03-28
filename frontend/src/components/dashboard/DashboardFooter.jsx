import React from 'react';

function DashboardFooter({ panelCount }) {
  return (
    <footer className="h-9 px-4 sm:px-6 border-t border-gray-800 bg-slate-900 text-xs text-gray-400 flex items-center justify-between">
      <span>Layout: GoldenLayout workspace</span>
      <span>Panels: {panelCount}</span>
    </footer>
  );
}

export default DashboardFooter;
