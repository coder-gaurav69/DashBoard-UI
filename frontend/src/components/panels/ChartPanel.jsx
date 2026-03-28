import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const ChartPanel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/stats`);
        setData(res.data);
      } catch (error) {
        console.error('Failed to load stats', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="panel-container">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">Analytics Overview</h3>
      <div className="h-52 sm:h-64 w-full bg-slate-800 rounded p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPanel;
