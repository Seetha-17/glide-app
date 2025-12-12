import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/common/MapComponent';
import MapDisplay from '../components/common/MapDisplay';
import RideBookingForm from '../components/rider/RideBookingForm';
import RideRequestsList from '../components/driver/RideRequestsList';
import PathPalMatcher from '../components/driver/PathPalMatcher';
import SavedPlaces from '../components/common/SavedPlaces';
import ServiceSuggestions from '../components/common/ServiceSuggestions';
import AdminDashboard from '../pages/AdminDashboard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State for booked ride info
  const [bookedRide, setBookedRide] = useState(null);
  // Coordinates for pickup and drop
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  // Address strings
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Handle updating booked ride info
  const handleRideBooking = (rideData) => {
    setBookedRide(rideData);
  };

  // Handle updating selected addresses and coordinates
  const handleLocationsChange = ({ pickupCoords, dropoffCoords, pickupAddress, dropoffAddress }) => {
    setPickupCoords(pickupCoords);
    setDropoffCoords(dropoffCoords);
    setPickupAddress(pickupAddress || '');
    setDropoffAddress(dropoffAddress || '');
  };

  if (!user) return null;

  const showRoute = pickupCoords && dropoffCoords;

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      {showRoute ? (
        <MapDisplay
          pickupCoords={pickupCoords}
          dropoffCoords={dropoffCoords}
          pickupAddress={pickupAddress}
          dropoffAddress={dropoffAddress}
        />
      ) : (
        <MapComponent />
      )}

      {user.role === 'rider' && (
        <div className="absolute top-6 left-6 w-96 p-8 bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-xl overflow-auto max-h-[80vh]">
          <div className="flex items-center justify-between mb-8">
            <span className="text-indigo-400 text-3xl font-bold">Glide</span>
            <div className="flex items-center space-x-2">
              <span>{user.username}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 p-2 rounded-full"
                title="Logout"
              >
                <i className="fas fa-sign-out-alt text-white"></i>
              </button>
            </div>
          </div>
          <RideBookingForm
            onBooking={handleRideBooking}
            onLocationsChange={handleLocationsChange}
          />
          <div className="mt-4 p-4 bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Recent Searches & Saved Places</h3>
            <SavedPlaces onSelect={() => {}} />
          </div>
        </div>
      )}

      {user.role === 'driver' && (
        <div className="absolute top-6 left-6 w-96 p-8 bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-xl overflow-auto max-h-[80vh]">
          <div className="flex items-center justify-between mb-8">
            <span className="text-indigo-400 text-3xl font-bold">Glide</span>
            <div className="flex items-center space-x-2">
              <span>{user.username}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 p-2 rounded-full"
                title="Logout"
              >
                <i className="fas fa-sign-out-alt text-white"></i>
              </button>
            </div>
          </div>
          <h2 className="text-center text-xl font-semibold mb-4">Driver Panel</h2>
          <RideRequestsList />
          <PathPalMatcher />
        </div>
      )}

      {user.role === 'admin' && (
        <div className="absolute inset-0 bg-white bg-opacity-90 overflow-auto">
          <AdminDashboard />
        </div>
      )}

      <div className="absolute bottom-6 right-6">
        <ServiceSuggestions />
      </div>
    </div>
  );
};

export default Dashboard;
