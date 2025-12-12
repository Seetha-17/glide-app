import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileSidebar from './ProfileSidebar'; // Make sure this path is correct

const Header = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="flex w-screen items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-lg">
        <div className="flex items-center space-x-6">
          {/* Conditional link for the Glide logo */}
          <Link to={user ? "/dashboard" : "/"} className="text-3xl font-bold text-indigo-400">
            Glide
          </Link>
          <nav className="hidden md:flex space-x-4 font-medium">
            <Link to="/activity" className="hover:text-indigo-400 transition-colors">Activity</Link>
            <Link to="/about" className="hover:text-indigo-400 transition-colors">About</Link>
            <Link to="/pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link>
            <Link to="/join-us" className="hover:text-indigo-400 transition-colors">Join Us</Link>
            <Link to="/pathpal" className="hover:text-indigo-400 transition-colors">Pathpal</Link> {/* Added Pathpal link */}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300 hidden sm:inline">Hello, {user.username}!</span>
              <button onClick={toggleSidebar} className="p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors">
                <i className="fas fa-user"></i>
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </header>
      <ProfileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Header;