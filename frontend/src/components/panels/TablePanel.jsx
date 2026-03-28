import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const TablePanel = () => {
  const [tableData, setTableData] = useState([]);

  const getStatusClass = (status) => {
    if (status === 'Active') return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/table`);
        setTableData(res.data);
      } catch (error) {
        console.error('Failed to load table data', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="panel-container">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">User Data</h3>
      <div className="overflow-x-auto bg-slate-800 rounded">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Last Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-700">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-200 font-medium">{row.user}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(row.status)}`}>
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
