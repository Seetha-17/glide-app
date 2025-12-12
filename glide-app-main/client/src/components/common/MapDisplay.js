import React, { useState } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100vh' };

const MapDisplay = ({ pickupCoords, dropoffCoords, pickupAddress, dropoffAddress }) => {
  const [directions, setDirections] = useState(null);
  const [infoOpen, setInfoOpen] = useState({ pickup: true, dropoff: true });

  const directionsCallback = (response) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
    } else {
      console.error("Directions request failed:", response);
    }
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={pickupCoords} zoom={13}>
      {pickupCoords && (
        <>
          <Marker
            position={pickupCoords}
            onClick={() => setInfoOpen({ ...infoOpen, pickup: true })}
          />
          {infoOpen.pickup && (
            <InfoWindow
              position={pickupCoords}
              onCloseClick={() => setInfoOpen({ ...infoOpen, pickup: false })}
            >
              <div style={{ maxWidth: "200px" }}>
                <strong>Pickup: </strong>{pickupAddress}
              </div>
            </InfoWindow>
          )}
        </>
      )}

      {dropoffCoords && (
        <>
          <Marker
            position={dropoffCoords}
            onClick={() => setInfoOpen({ ...infoOpen, dropoff: true })}
          />
          {infoOpen.dropoff && (
            <InfoWindow
              position={dropoffCoords}
              onCloseClick={() => setInfoOpen({ ...infoOpen, dropoff: false })}
            >
              <div style={{ maxWidth: "200px" }}>
                <strong>Dropoff: </strong>{dropoffAddress}
              </div>
            </InfoWindow>
          )}
        </>
      )}

      {pickupCoords && dropoffCoords && (
        <DirectionsService
          options={{
            origin: pickupCoords,
            destination: dropoffCoords,
            travelMode: "DRIVING",
          }}
          callback={directionsCallback}
        />
      )}

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: "#1E40AF",
              strokeWeight: 6,
              strokeOpacity: 0.9,
            },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapDisplay;
