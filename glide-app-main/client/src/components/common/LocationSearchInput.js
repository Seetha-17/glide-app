import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const LocationSearchInput = ({ address, setAddress, onSelect, placeholder }) => {
  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      onSelect(selectedAddress, latLng);
    } catch (error) {
      console.error('Error selecting location:', error);
    }
  };

  return (
    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <input
            {...getInputProps({
              placeholder,
              className:
                'w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base',
            })}
          />
          <div className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1">
            {loading && <div className="p-2 text-gray-500">Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active ? 'bg-indigo-50' : 'bg-white';
              const suggestionProps = getSuggestionItemProps(suggestion, {
                className: `${className} cursor-pointer p-3 text-sm text-gray-700 hover:bg-gray-100`,
              });
              const { key, ...restOfProps } = suggestionProps;
              return (
                <div key={key} {...restOfProps}>
                  <i className="fas fa-map-marker-alt mr-2 text-indigo-400"></i>
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
