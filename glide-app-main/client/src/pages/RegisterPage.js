import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import loginBg from '../assets/images/bg-login.png'; // Import your background image

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('rider');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password, role);
    } catch (err) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="relative h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
      <div className="z-10 w-full max-w-md p-8 bg-gray-900 bg-opacity-80 rounded-2xl shadow-xl space-y-6 text-white">
        <h2 className="text-3xl font-bold text-center text-indigo-400">Sign up</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="role" className="sr-only">Account Type</label>
            <select
              id="role"
              name="role"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="rider" className="text-gray-900">Rider</option>
              <option value="driver" className="text-gray-900">Driver</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-sm font-medium rounded-md text-gray-900 bg-indigo-400 hover:bg-indigo-300 transition-colors"
          >
            Sign up
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;