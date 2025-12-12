import React from 'react';
import { Link } from 'react-router-dom';

// Import images for places
import homeImg from '../../assets/images/home.png';
import workImg from '../../assets/images/work.png';
import recentImg from '../../assets/images/recent.png';
import favoriteImg from '../../assets/images/favorite.png';

const suggestionsData = [
  { name: 'Home', icon: homeImg, link: '/home', description: 'Your home address' },
  { name: 'Work', icon: workImg, link: '/work', description: 'Office location' },
  { name: 'Recent', icon: recentImg, link: '/recent', description: 'Recently searched places' },
  { name: 'Favorites', icon: favoriteImg, link: '/favorites', description: 'Saved places' },
  // Add more if needed
];

const Suggestions = () => {
  return (
    <div className="space-y-2">
      {suggestionsData.map((place, index) => (
        <Link
          to={place.link}
          key={index}
          className="flex items-center p-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
        >
          <img src={place.icon} alt={place.name} className="w-10 h-10 object-contain mr-4" />
          <div className="flex flex-col">
            <span className="text-gray-200 font-medium">{place.name}</span>
            <span className="text-gray-400 text-sm">{place.description}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Suggestions;
