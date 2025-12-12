import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import loginBg from '../assets/images/bg-login.png';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('rider');
  const [error, setError] = useState(null);
  const { login, register } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError(null);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password, role);
      setError(null);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="relative h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

      {/* Top-left text */}
      <div className="absolute top-10 left-10 z-10 text-white max-w-lg">
        <h1 className="text-6xl font-extrabold leading-tight text-white">Your Journey, Reimagined</h1>
        <p className="mt-4 text-xl font-medium text-gray-300">Seamless. Smart. Secure. Experience the future of urban mobility.</p>
      </div>

      <div className="fixed bottom-10 right-10 z-10 w-full max-w-sm p-8 bg-gray-900 bg-opacity-80 rounded-2xl shadow-xl space-y-6 text-white text-center">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">Welcome to Glide!</h1>
        <p className="text-xl text-gray-400 mb-6">Your Journey, Reimagined</p>

        {/* Error Message Modal */}
        {error && (
          <div className="bg-red-500 bg-opacity-90 p-4 rounded-lg text-white font-semibold flex justify-between items-center mb-4 animate-fade-in-down">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4 text-white hover:text-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {showLogin ? (
          <div className="bg-gray-800 p-6 rounded-xl shadow-inner space-y-4">
            <h2 className="text-2xl font-bold text-white">Log in</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400" />
              <button type="submit" className="w-full py-3 px-4 text-sm font-bold rounded-md text-gray-900 bg-indigo-400 hover:bg-indigo-300">Log in</button>
            </form>
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button onClick={() => setShowLogin(false)} className="font-medium text-indigo-400 hover:underline">Sign up</button>
            </p>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-xl shadow-inner space-y-4">
            <h2 className="text-2xl font-bold text-white">Sign up</h2>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400" />
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="rider" className="bg-gray-900 text-white">Rider</option>
                <option value="driver" className="bg-gray-900 text-white">Driver</option>
              </select>
              <button type="submit" className="w-full py-3 px-4 text-sm font-bold rounded-md text-gray-900 bg-indigo-400 hover:bg-indigo-300">Sign up</button>
            </form>
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <button onClick={() => setShowLogin(true)} className="font-medium text-indigo-400 hover:underline">Log in</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;