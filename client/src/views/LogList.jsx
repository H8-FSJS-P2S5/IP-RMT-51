import React, { useState, useEffect } from 'react';
import { appRequest } from '../utils/axios'; // Adjust the path as needed

const LogsList = () => {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await appRequest.get('/logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
        setMessage('Failed to fetch logs');
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Logs</h2>
        {message && (
          <p className={`mb-4 ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
        <div className="space-y-4">
          {logs.length ? (
            logs.map((log) => (
              <div key={log.id} className="bg-gray-200 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800">{log.description}</h3>
                <p className="text-gray-600">User ID: {log.userId}</p>
                <p className="text-gray-600">Date: {new Date(log.createdAt).toLocaleString()}</p>
                <div className="mt-2">
                  <h4 className="text-lg font-semibold text-gray-700">Goods:</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    {log.goods.map((item, index) => (
                      <li key={index}>
                        {item.name}: {item.numberOfItems}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No logs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogsList;
