import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfileSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-gray-700">
        <h3 className="text-xl font-bold text-white">Hello, {user.username}!</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-white">{user.email}</p>
            <p className="text-sm text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>
        
        <nav className="mt-4 space-y-2">
          <Link to="/profile" onClick={onClose} className="flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-800 transition-colors">
            <i className="fas fa-user-circle mr-3 text-indigo-400"></i>
            Account Info
          </Link>
          <Link to="/wallet" onClick={onClose} className="flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-800 transition-colors">
            <i className="fas fa-wallet mr-3 text-indigo-400"></i>
            Wallet
          </Link>
          <Link to="/add-money" onClick={onClose} className="flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-800 transition-colors">
            <i className="fas fa-plus-circle mr-3 text-indigo-400"></i>
            Add Money
          </Link>
          <Link to="/pathpal" onClick={onClose} className="flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-800 transition-colors">
            <i className="fas fa-route mr-3 text-indigo-400"></i>
            Pathpal
          </Link>
          <Link to="/ride-history" onClick={onClose} className="flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-800 transition-colors">
            <i className="fas fa-history mr-3 text-indigo-400"></i>
            Ride History
          </Link>
          <button onClick={handleLogout} className="flex items-center p-3 rounded-lg text-red-400 hover:bg-red-800 transition-colors w-full text-left">
            <i className="fas fa-sign-out-alt mr-3"></i>
            Log Out
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProfileSidebar;