import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 text-center bg-gray-50">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Welcome to <span className="text-indigo-600">Glide</span>!
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Your journey begins here. Connect with riders and drivers and get where you need to go, seamlessly.
      </p>
      <div className="flex space-x-4">
        <Link to="/register" className="px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-colors transform hover:scale-105">
          Sign Up Now
        </Link>
        <Link to="/login" className="px-6 py-3 text-lg font-medium text-indigo-600 bg-white rounded-full shadow-lg border border-indigo-600 hover:bg-gray-100 transition-colors transform hover:scale-105">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default HomePage;