import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import profileBg from '../assets/images/bg-profile.png';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Placeholder for PathPal verification status
  const isPathPalVerified = user?.isPathPalVerified || false;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="relative h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${profileBg})` }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

      <div className="z-10 container mx-auto p-8 max-w-4xl">
        <div className="bg-gray-900 bg-opacity-80 rounded-2xl shadow-xl p-6 text-white">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400">My Profile</h2>
          
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-gray-400">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user.username}</h3>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-gray-400 capitalize">Role: {user.role}</p>
              
              {/* Profile image upload input */}
              <label className="mt-2 block text-sm text-indigo-400 hover:underline cursor-pointer">
                Change profile picture
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/jpeg, image/png"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/ride-history" className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <i className="fas fa-history text-indigo-400 text-2xl"></i>
              <div>
                <p className="font-semibold text-white">Ride History</p>
                <p className="text-sm text-gray-400">View your past trips</p>
              </div>
            </Link>
            <Link to="/settings" className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <i className="fas fa-cog text-indigo-400 text-2xl"></i>
              <div>
                <p className="font-semibold text-white">Settings</p>
                <p className="text-sm text-gray-400">Manage account preferences</p>
              </div>
            </Link>

            {/* PathPal Verification Section */}
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
              <i className={`fas fa-${isPathPalVerified ? 'check-circle' : 'times-circle'} text-2xl ${isPathPalVerified ? 'text-green-400' : 'text-red-400'}`}></i>
              <div>
                <p className="font-semibold text-white">PathPal Verification</p>
                <p className={`text-sm ${isPathPalVerified ? 'text-green-400' : 'text-red-400'}`}>
                  Status: {isPathPalVerified ? 'Verified' : 'Not Verified'}
                </p>
                {!isPathPalVerified && (
                  <Link to="/join-us" className="text-indigo-400 hover:underline text-sm">
                    Become a PathPal driver
                  </Link>
                )}
              </div>
            </div>
            
            <button onClick={logout} className="flex items-center justify-center space-x-4 p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full font-semibold">
              <i className="fas fa-sign-out-alt text-2xl"></i>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;