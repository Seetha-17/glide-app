import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

export const GoogleMapsLoader = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }
  return children;
};