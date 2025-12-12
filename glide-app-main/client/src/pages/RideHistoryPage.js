import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import historyBg from '../assets/images/bg-history.png';

const RideHistoryPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [rides] = useState([
    { id: 1, date: '2025-09-01', from: 'Noida Sector 18', to: 'India Gate', fare: 250, status: 'completed', distance: '15 km', duration: '35 mins' },
    { id: 2, date: '2025-08-28', from: 'Connaught Place', to: 'Hauz Khas', fare: 180, status: 'completed', distance: '12 km', duration: '30 mins' },
    { id: 3, date: '2025-08-25', from: 'Delhi Airport', to: 'Nirman Vihar', fare: 420, status: 'cancelled', distance: '25 km', duration: '45 mins' },
  ]);

  const filteredRides = rides.filter(ride => filter === 'all' ? true : ride.status === filter);

  const statusColors = {
    completed: 'bg-green-500',
    cancelled: 'bg-red-500',
    pending: 'bg-yellow-500'
  };

  return (
    <div
      className="relative min-h-screen w-screen flex flex-col items-center justify-start bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${historyBg})` }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
      <div className="z-10 w-full max-w-4xl p-8 bg-gray-900 bg-opacity-80 rounded-2xl shadow-xl text-white">

        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">Ride History</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          {['all','completed','pending','cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                filter === status ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-indigo-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Ride List */}
        {filteredRides.length > 0 ? (
          <ul className="space-y-4">
            {filteredRides.map(ride => (
              <li key={ride.id} className="bg-gray-800 p-4 rounded-lg shadow-inner hover:scale-105 transform transition">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-white">{ride.from} → {ride.to}</p>
                    <p className="text-sm text-gray-400">Date: {ride.date}</p>
                    <p className="text-sm text-gray-400">Distance: {ride.distance}, Duration: {ride.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-400">₹{ride.fare}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[ride.status]}`}>
                      {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                    </span>
                    <button
                      onClick={() => alert(`Viewing receipt for ride ${ride.id}`)}
                      className="mt-2 block text-sm text-indigo-400 hover:underline"
                    >
                      View Receipt
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center">No rides found for this filter.</p>
        )}

        {/* CTA */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/book-ride')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105"
          >
            Book a New Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideHistoryPage;
