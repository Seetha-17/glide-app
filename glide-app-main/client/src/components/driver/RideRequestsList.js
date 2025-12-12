import React, { useState, useEffect } from 'react';
import * as axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const RideRequestsList = () => {
  const [rides, setRides] = useState([]);
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get('http://localhost:5000/api/rides/requested', config);
      const accepted = data.filter(ride => ride.status === 'accepted');
      const requested = data.filter(ride => ride.status === 'requested');
      setRides(requested);
      setAcceptedRides(accepted);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch ride requests.');
      setLoading(false);
      console.error(err);
    }
  };

  const handleAcceptRide = async (rideId) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      };
      await axios.put(`http://localhost:5000/api/rides/accept/${rideId}`, {}, config);
      alert('Ride accepted successfully!');
      fetchRides();
    } catch (err) {
      alert('Failed to accept ride.');
      console.error(err);
    }
  };

  const handleStartRide = async (rideId) => {
    try {
      const config = { headers: { 'Authorization': `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/rides/start/${rideId}`, {}, config);
      alert('Ride started!');
      fetchRides();
    } catch (err) {
      alert('Failed to start ride.');
      console.error(err);
    }
  };

  const handleCompleteRide = async (rideId) => {
    try {
      const config = { headers: { 'Authorization': `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/rides/complete/${rideId}`, {}, config);
      alert('Ride completed!');
      fetchRides();
    } catch (err) {
      alert('Failed to complete ride.');
      console.error(err);
    }
  };

  if (loading) return <div>Loading ride requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Accepted Rides</h3>
        {acceptedRides.length === 0 ? (
          <p className="text-gray-500">No active rides.</p>
        ) : (
          <ul className="space-y-4">
            {acceptedRides.map((ride) => (
              <li key={ride._id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <p className="font-medium">From: {ride.pickupLocation}</p>
                <p className="font-medium">To: {ride.dropoffLocation}</p>
                <div className="flex space-x-2 mt-2">
                  <button onClick={() => handleStartRide(ride._id)} className="py-1 px-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Start Ride</button>
                  <button onClick={() => handleCompleteRide(ride._id)} className="py-1 px-3 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Complete Ride</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Ride Requests</h3>
        {rides.length === 0 ? (
          <p className="text-gray-500">No new ride requests.</p>
        ) : (
          <ul className="space-y-4">
            {rides.map((ride) => (
              <li key={ride._id} className="p-4 border border-gray-200 rounded-md">
                <p className="text-sm font-medium">From: <span className="font-normal">{ride.pickupLocation}</span></p>
                <p className="text-sm font-medium">To: <span className="font-normal">{ride.dropoffLocation}</span></p>
                <p className="text-sm text-gray-500">Requested by: {ride.rider.username}</p>
                <button
                  onClick={() => handleAcceptRide(ride._id)}
                  className="mt-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Accept Ride
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RideRequestsList;