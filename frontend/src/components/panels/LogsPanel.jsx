import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTerminal } from 'react-icons/fi';
import { API_BASE_URL } from '../../config';

function getTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '--:--:--';
  return date.toLocaleTimeString('en-GB', { hour12: false });
}

const LogsPanel = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/logs`);
        setLogs(res.data);
      } catch (error) {
        console.error('Failed to load logs', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="panel-container">
      <div className="flex items-center gap-2 mb-4">
        <FiTerminal className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-200">System Logs</h3>
      </div>
      <div className="bg-black rounded p-3 sm:p-4 font-mono text-sm h-52 sm:h-64 overflow-y-auto border border-gray-700">
        {logs.map((item) => (
          <div key={item.id} className="mb-2 flex gap-3 border-b border-gray-800 pb-1">
            <span className="text-gray-500 whitespace-nowrap">[{getTime(item.timestamp)}]</span>
            <span className="text-green-400 font-bold uppercase w-16">{item.id}</span>
            <span className="text-gray-300">{item.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsPanel;
