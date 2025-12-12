import React, { useState } from 'react';
import pricingBg from '../assets/images/bg-pricing.png';

// Import vehicle images
import bikeImage from '../assets/images/bike.png';
import autoImage from '../assets/images/auto.png';
import electricAutoImage from '../assets/images/electric-auto.png';
import miniCarImage from '../assets/images/mini-car.png';
import xlSedanImage from '../assets/images/xl-sedan.png';
import luxuryImage from '../assets/images/luxury.png';

const vehicleDetails = [
  { type: 'Bike', fareRate: 8, description: 'Per km', capacity: 1, image: bikeImage, eco: true },
  { type: 'Auto', fareRate: 12, description: 'Per km', capacity: 3, image: autoImage, eco: true, popular: true },
  { type: 'Electric Auto', fareRate: 15, description: 'Per km', capacity: 3, image: electricAutoImage, eco: true },
  { type: 'Mini Car', fareRate: 20, description: 'Per km', capacity: 4, image: miniCarImage, eco: false },
  { type: 'XL Sedan', fareRate: 25, description: 'Per km', capacity: 6, image: xlSedanImage, eco: false },
  { type: 'Luxury', fareRate: 40, description: 'Per km', capacity: 4, image: luxuryImage, eco: false },
];

const PricingPage = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState('Auto');
  const [distance, setDistance] = useState(5);
  const selectedVehicle = vehicleDetails.find(v => v.type === selectedVehicleType);
  const estimatedFare = (selectedVehicle.fareRate * distance).toFixed(2);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${pricingBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      <div className="relative z-10 w-full max-w-6xl rounded-3xl shadow-2xl bg-gray-900 bg-opacity-95 p-8 md:p-12 text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-400 mb-8">
          Transparent Pricing
        </h2>

        {/* Promo Offer */}
        <div className="bg-indigo-800 rounded-2xl p-6 text-center mb-10 shadow-lg hover:shadow-indigo-500 transition duration-300">
          <h3 className="text-2xl font-bold mb-2">Special Offer!</h3>
          <p className="text-gray-200">
            Use code <span className="font-bold">GLIDE20</span> to get 20% off your first ride ✨
          </p>
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {vehicleDetails.map((vehicle, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center bg-gray-800 rounded-2xl p-5 transition-all duration-300 transform
                ${selectedVehicleType === vehicle.type ? 'ring-2 ring-indigo-500 scale-105 shadow-xl' : 'hover:scale-105 hover:shadow-lg cursor-pointer'}`}
              onClick={() => setSelectedVehicleType(vehicle.type)}
            >
              <div className="w-28 h-28 md:w-24 md:h-24 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden mb-4 md:mb-0 md:mr-4">
                <img src={vehicle.image} alt={vehicle.type} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start mb-1">
                  {vehicle.type}
                  {vehicle.popular && (
                    <span className="ml-2 text-xs font-semibold px-2 py-1 bg-yellow-400 text-gray-900 rounded-full">Popular</span>
                  )}
                  {vehicle.eco && (
                    <span className="ml-2 text-xs font-semibold px-2 py-1 bg-green-500 text-white rounded-full">Eco</span>
                  )}
                </h3>
                <p className="text-gray-300 text-lg">₹{vehicle.fareRate} {vehicle.description}</p>
                <p className="text-gray-400">Capacity: {vehicle.capacity} {vehicle.capacity > 1 ? 'people' : 'person'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fare Calculator */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-10 shadow-lg">
          <h3 className="text-2xl font-bold text-indigo-400 mb-4 text-center">Estimate Your Fare</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance in km"
              className="w-full md:w-1/3 p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="w-full md:w-2/3 text-center py-3 rounded-xl bg-indigo-500 font-bold text-2xl">
              ₹{estimatedFare}
            </div>
          </div>
          <p className="text-gray-400 text-center mt-3">
            Fare for a {selectedVehicleType} over {distance} km is <span className="font-semibold">₹{estimatedFare}</span>
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-10 overflow-x-auto shadow-lg">
          <h3 className="text-2xl font-bold text-indigo-400 mb-4 text-center">Ride Comparison</h3>
          <table className="min-w-full text-center border-collapse border border-gray-700">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-left text-gray-300">Feature</th>
                {vehicleDetails.map((v, i) => (
                  <th key={i} className="px-4 py-3 text-gray-300">{v.type}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="px-4 py-3 text-left font-medium">Price/km</td>
                {vehicleDetails.map((v, i) => (
                  <td key={i} className="px-4 py-3">₹{v.fareRate}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-700">
                <td className="px-4 py-3 text-left font-medium">Capacity</td>
                {vehicleDetails.map((v, i) => (
                  <td key={i} className="px-4 py-3">{v.capacity}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-700">
                <td className="px-4 py-3 text-left font-medium">Eco-friendly</td>
                {vehicleDetails.map((v, i) => (
                  <td key={i} className="px-4 py-3">
                    {v.eco ? <span className="text-green-400">✔</span> : <span className="text-red-400">✘</span>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional Charges */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-10 shadow-lg">
          <h3 className="text-2xl font-bold text-indigo-400 mb-4 text-center">Additional Charges</h3>
          <ul className="space-y-3 text-gray-300 text-center md:text-left">
            <li>
              <span className="font-semibold text-white">Waiting Charges:</span> Free for first 5 minutes, then ₹5/min.
            </li>
            <li>
              <span className="font-semibold text-white">Cancellation Fee:</span> ₹25 if cancelled after 3 minutes.
            </li>
            <li>
              <span className="font-semibold text-white">Surge Pricing:</span> Fares may increase during high-demand hours.
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-10 rounded-2xl transition duration-300 transform hover:scale-105 shadow-lg">
            Book Your Ride Now
          </button>
        </div>

        <p className="text-center mt-6 text-gray-400 text-sm">
          All fares are subject to change based on demand, traffic, and other factors.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
