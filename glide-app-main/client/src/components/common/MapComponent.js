import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useAuth } from '../../context/AuthContext';

const MapComponent = () => {
  const { user, socket } = useAuth();
  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [driverLocations, setDriverLocations] = useState([]);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
        setCurrentPosition(pos);
        map.setCenter(pos);
        map.setZoom(15);
      }, () => {
        console.error("Geolocation is not supported by this browser.");
      });
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('driver_location_update', (data) => {
        setDriverLocations(prev => {
          const updated = prev.filter(driver => driver.driverId !== data.driverId);
          return [...updated, data];
        });
      });
    }
    return () => {
      if (socket) {
        socket.off('driver_location_update');
      }
    };
  }, [socket]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={currentPosition || { lat: 28.7041, lng: 77.1025 }}
      zoom={10}
      onLoad={onMapLoad}
    >
      {currentPosition && <Marker position={currentPosition} />}
      {driverLocations.map(driver => (
        <Marker
          key={driver.driverId}
          position={{ lat: driver.location.latitude, lng: driver.location.longitude }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapComponent;