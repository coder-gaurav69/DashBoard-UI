import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTerminal } from 'react-icons/fi';
import { API_BASE_URL } from '../../config';

const LogsPanel = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTime = (value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '--:--:--';
    return date.toLocaleTimeString('en-GB', { hour12: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/logs`);
        setLogs(response.data);
      } catch (err) {
        console.error('Error fetching logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-400">Loading logs...</div>;
  }

  return (
    <div className="p-4 h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <FiTerminal className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-200">System Activity</h3>
      </div>
      <div className="flex-1 min-h-0 bg-black rounded p-4 font-mono text-sm overflow-auto border border-gray-800 scrollbar-hide">
        {logs.map((item) => (
          <div key={item.id} className="mb-2 flex gap-3 border-b border-gray-900 pb-2 last:border-0 hover:bg-white/5 transition-colors">
            <span className="text-gray-500 whitespace-nowrap">[{formatTime(item.timestamp)}]</span>
            <span className="text-green-500 font-bold uppercase w-12">{item.id}</span>
            <span className="text-gray-300 break-words">{item.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsPanel;
