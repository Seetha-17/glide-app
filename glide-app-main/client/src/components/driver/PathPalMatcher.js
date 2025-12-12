import React, { useState } from 'react';
import * as axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const PathPalMatcher = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [matchingRides, setMatchingRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleMatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: { 'Authorization': `Bearer ${user.token}` },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/rides/match',
        { driverRoute: { start, end } },
        config
      );
      setMatchingRides(data);
    } catch (error) {
      alert('Failed to find matching rides.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-inner mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">PathPal: Find Rides on Your Route</h3>
      <form onSubmit={handleMatch} className="space-y-4">
        <div>
          <label htmlFor="pathStart" className="block text-sm font-medium text-gray-700">Your Starting Point</label>
          <input
            type="text"
            id="pathStart"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="pathEnd" className="block text-sm font-medium text-gray-700">Your Destination</label>
          <input
            type="text"
            id="pathEnd"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
        >
          {loading ? 'Searching...' : 'Find Matches'}
        </button>
      </form>
      {matchingRides.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800">Found Matches:</h4>
          <ul className="space-y-2 mt-2">
            {matchingRides.map(ride => (
              <li key={ride._id} className="p-2 border rounded-md">
                From: {ride.pickupLocation} to {ride.dropoffLocation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PathPalMatcher;