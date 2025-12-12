import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import activityBg from '../assets/images/bg-activity.png';

const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const ActivityPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Fetch live activities from backend
  useEffect(() => {
    const fetchActivities = async () => {
      if (user && user.token) {
        setLoading(true);
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.get(`${API_BASE}/api/users/activity`, config);
          setActivities(data);
          setLoading(false);
        } catch (err) {
          console.error('Fetch activities error:', err);
          if (err.response && err.response.status === 401) {
            setError('Authentication failed. Please log in again.');
            navigate('/login');
          } else {
            setError('Failed to fetch activity data.');
          }
          setLoading(false);
        }
      } else {
        setError('User not authenticated.');
        setLoading(false);
        navigate('/login');
      }
    };

    if (!authLoading) {
      fetchActivities();
    }
  }, [user, navigate, authLoading]);

  // Filtered activities
  const filteredActivities = activities.filter(
    (a) =>
      (filter === 'all' || a.type === filter) &&
      (a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.details.toLowerCase().includes(search.toLowerCase()))
  );

  // Dynamic stats
  const stats = [
    { title: 'Total Rides', value: filteredActivities.filter((a) => a.type === 'ride').length },
    {
      title: 'Money Spent',
      value: `₹${filteredActivities
        .filter((a) => a.type === 'ride' && a.status === 'completed')
        .reduce((sum, ride) => sum + ride.amount, 0)}`,
    },
    { title: 'Reward Points', value: 0 },
    { title: 'Eco Impact', value: '50 kg CO₂ saved' },
  ];

  if (loading || authLoading) return <div className="text-center text-white z-10">Loading activities...</div>;
  if (error) return <div className="text-center text-red-400 z-10">Error: {error}</div>;

  return (
    <div
      className="relative min-h-screen w-screen flex flex-col items-center justify-start bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${activityBg})` }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

      <div className="z-10 w-full max-w-6xl p-8 bg-gray-900 bg-opacity-80 rounded-2xl shadow-xl text-white">
        <h2 className="text-4xl font-extrabold text-indigo-400 mb-6 text-center">My Activity</h2>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center hover:scale-105 transform transition"
            >
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex gap-2 flex-wrap">
            {['all', 'ride', 'wallet', 'reward'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === type ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-indigo-400'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-1/3"
          />
        </div>

        {/* Activity Timeline */}
        <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-gray-800 rounded-xl p-4 flex justify-between items-center shadow-inner hover:scale-105 transform transition"
              >
                <div>
                  <p className="font-bold">{activity.title}</p>
                  <p className="text-gray-400 text-sm">{activity.details}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.date}</p>
                </div>
                {activity.amount && (
                  <p
                    className={`font-bold text-lg ${
                      activity.type === 'ride' ? 'text-green-400' : 'text-yellow-400'
                    }`}
                  >
                    {activity.type === 'ride' ? `₹${activity.amount}` : `+${activity.amount}`}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No activities found.</p>
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => navigate('/wallet')}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-bold transition transform hover:scale-105"
          >
            Add Money
          </button>
          <button
            onClick={() => navigate('/ride-history')}
            className="px-6 py-3 bg-indigo-400 hover:bg-indigo-500 rounded-lg font-bold transition transform hover:scale-105"
          >
            View Ride History
          </button>
        </div>

        {/* Chart Placeholder */}
        <div className="mt-10 p-6 bg-gray-800 rounded-xl text-center">
          <p className="text-gray-400">Graphical representation of activity trends coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
