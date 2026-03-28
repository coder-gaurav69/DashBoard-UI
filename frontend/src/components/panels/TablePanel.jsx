import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const TablePanel = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusClass = (status) => {
    if (status === 'Active') return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/table`);
        setTableData(response.data);
      } catch (err) {
        console.error('Error fetching table:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-400">Loading table...</div>;
  }

  return (
    <div className="p-4 h-full flex flex-col overflow-hidden">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">System Users</h3>
      <div className="flex-1 overflow-auto bg-slate-800 rounded scrollbar-hide">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-slate-900 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Last Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-700 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-200 font-medium">{row.user}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{row.last_login}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePanel;
