import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  useEffect(() => {
    const fetchAllData = async () => {
      if (!user || user.role !== 'admin') {
        setError('You are not authorized to view this page.');
        setLoading(false);
        return;
      }
      try {
        const [usersRes, applicationsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', config),
          axios.get('http://localhost:5000/api/admin/applications', config),
        ]);
        setUsers(usersRes.data);
        setApplications(applicationsRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data.');
        setLoading(false);
        console.error(err);
      }
    };
    fetchAllData();
  }, [user]);

  const updateApplicationStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/applications/${id}`,
        { status },
        config
      );
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update application status.');
    }
  };

  if (loading) return <div className="p-8">Loading data...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Admin Panel</h1>

      {/* Driver Applications Section */}
      <div className="bg-white rounded-lg shadow-xl p-6 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Driver Applications</h2>
        {applications.length === 0 ? (
          <p className="text-gray-600">No new driver applications.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-6 py-3 font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Vehicle</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Documents</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-t border-gray-200">
                    <td className="px-6 py-4">{app.fullName}</td>
                    <td className="px-6 py-4">{app.email}</td>
                    <td className="px-6 py-4">
                      {app.vehicleType} - {app.vehicleModel}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={app.licensePath} target="_blank" className="text-indigo-600 underline mr-2">License</Link>
                      <Link to={app.vehiclePhotoPath} target="_blank" className="text-indigo-600 underline mr-2">Vehicle</Link>
                      <Link to={app.personalPhotoPath} target="_blank" className="text-indigo-600 underline">Photo</Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {app.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateApplicationStatus(app._id, 'approved')}
                            className="bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600 transition-colors mr-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app._id, 'rejected')}
                            className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Management Section */}
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Users</h2>
        {users.length === 0 ? (
          <p className="text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-6 py-3 font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t border-gray-200">
                    <td className="px-6 py-4">{u.username}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4 capitalize">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
