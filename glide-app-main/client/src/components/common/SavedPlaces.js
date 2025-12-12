import React from 'react';
import { Link } from 'react-router-dom';

const savedLocations = [
  { type: 'Home', icon: 'fas fa-home', address: 'Your Home Address' },
  { type: 'Work', icon: 'fas fa-briefcase', address: 'Your Work Address' },
];

const recentSearches = [
  { name: 'India Gate', address: 'New Delhi, Delhi' },
  { name: 'Nirman Vihar', address: 'Preet Vihar, Delhi' },
  { name: 'Nizamuddin Station', address: 'H7Q3+JC3, Rajpat...' },
];

const SavedPlaces = ({ onSelect }) => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Saved Locations */}
      <div className="space-y-2">
        <h4 className="text-gray-400 font-semibold text-sm mb-2">Saved</h4>
        {savedLocations.map((loc, index) => (
          <div
            key={index}
            onClick={() => onSelect(loc.address)}
            className="flex items-center space-x-4 p-3 rounded-lg text-white hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <i className={`${loc.icon} text-lg text-indigo-400`}></i>
            <div>
              <p className="font-medium">{loc.type}</p>
              <p className="text-sm text-gray-500">{loc.address}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Searches */}
      <div className="space-y-2">
        <h4 className="text-gray-400 font-semibold text-sm mb-2">Recent Searches</h4>
        {recentSearches.map((search, index) => (
          <div
            key={index}
            onClick={() => onSelect(search.address)}
            className="flex items-center space-x-4 p-3 rounded-lg text-white hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <i className="fas fa-history text-lg text-indigo-400"></i>
            <div>
              <p className="font-medium">{search.name}</p>
              <p className="text-sm text-gray-500">{search.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPlaces;