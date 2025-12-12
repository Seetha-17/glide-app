import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import VehicleSelector from './VehicleSelector';
import LocationSearchInput from '../common/LocationSearchInput';

const RideBookingForm = ({ onBooking, onLocationsChange }) => {
  const [pickup, setPickup] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoff, setDropoff] = useState('');
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [vehicleType, setVehicleType] = useState('Mini Car');
  const [availableFares, setAvailableFares] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLocationsSet, setIsLocationsSet] = useState(false);
  const { user } = useAuth();

  // ✅ Auto-detect backend URL for local + deployed
  const BASE_URL =
    process.env.REACT_APP_BACKEND_URL ||
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://glide-backend-kvj7.onrender.com');

  // Notify parent about coordinate updates for live map update
  useEffect(() => {
    if (onLocationsChange) {
      onLocationsChange({ pickupCoords, dropoffCoords });
    }
  }, [pickupCoords, dropoffCoords, onLocationsChange]);

  // Fetch fare estimates dynamically
  useEffect(() => {
    const fetchFares = async () => {
      if (pickup.trim() && dropoff.trim()) {
        try {
          const config = { headers: { 'Content-Type': 'application/json' } };
          const { data } = await axios.post(
            `${BASE_URL}/api/rides/fares`,
            { pickup, dropoff },
            config
          );
          setAvailableFares(data.fares);
          setIsLocationsSet(true);
        } catch (error) {
          console.error('Failed to get fare estimates:', error.response?.data || error.message);
          setAvailableFares(null);
          setIsLocationsSet(false);
        }
      } else {
        setAvailableFares(null);
        setIsLocationsSet(false);
      }
    };

    const debounceFetch = setTimeout(fetchFares, 500);
    return () => clearTimeout(debounceFetch);
  }, [pickup, dropoff, BASE_URL]);

  // Handle ride request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickup.trim() || !dropoff.trim()) {
      alert('Please fill in both pickup and dropoff locations.');
      return;
    }

    if (!vehicleType) {
      alert('Please select a vehicle type.');
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/rides/request`,
        {
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          pickupCoords,
          dropoffCoords,
          vehicleType,
        },
        config
      );

      onBooking(data);
      alert('Ride requested successfully!');
      setPickup('');
      setDropoff('');
      setPickupCoords(null);
      setDropoffCoords(null);
      setVehicleType('Mini Car');
      setAvailableFares(null);
    } catch (error) {
      alert('Failed to request ride.');
      console.error('Request error:', error.response?.data || error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6 text-base text-black">
        <div className="space-y-4">
          <LocationSearchInput
            address={pickup}
            setAddress={setPickup}
            onSelect={(address, coords) => {
              setPickup(address);
              setPickupCoords(coords);
            }}
            placeholder="Pickup Location"
          />
          <LocationSearchInput
            address={dropoff}
            setAddress={setDropoff}
            onSelect={(address, coords) => {
              setDropoff(address);
              setDropoffCoords(coords);
            }}
            placeholder="Drop-off Location"
          />
        </div>

        {isLocationsSet && (
          <div className="pt-4">
            <h4 className="block text-sm font-medium text-gray-700 mb-2">Select Vehicle Type</h4>
            <VehicleSelector
              selectedVehicleType={vehicleType}
              onSelectVehicleType={setVehicleType}
              availableFares={availableFares}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !vehicleType}
          className="w-full py-4 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? 'Requesting...' : 'Ride Request'}
        </button>
      </form>
    </div>
  );
};

export default RideBookingForm;
