import React from 'react';
import bikeImage from '../../assets/images/bike.png';
import autoImage from '../../assets/images/auto.png';
import electricAutoImage from '../../assets/images/electric-auto.png';
import miniCarImage from '../../assets/images/mini-car.png';
import xlSedanImage from '../../assets/images/xl-sedan.png';
import luxuryImage from '../../assets/images/luxury.png';

const vehicleOptions = [
  { type: 'Bike', image: bikeImage, capacity: 1, description: 'Quick and economical' },
  { type: 'Auto', image: autoImage, capacity: 3, description: 'Convenient for short trips' },
  { type: 'Electric Auto', image: electricAutoImage, capacity: 3, description: 'Eco-friendly and efficient' },
  { type: 'Mini Car', image: miniCarImage, capacity: 4, description: 'Compact and affordable' },
  { type: 'XL Sedan', image: xlSedanImage, capacity: 6, description: 'Spacious for families' },
  { type: 'Luxury', image: luxuryImage, capacity: 4, description: 'Premium comfort and style' },
];

const VehicleSelector = ({ selectedVehicleType, onSelectVehicleType, availableFares }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {vehicleOptions.map((vehicle) => {
        const fareData = availableFares?.find(f => f.type === vehicle.type);
        const fare = fareData ? `₹${fareData.fare}` : 'N/A';
        return (
          <div
            key={vehicle.type}
            className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center space-y-2 transition-all duration-300
              ${selectedVehicleType === vehicle.type ? 'border-indigo-600 shadow-lg scale-105' : 'border-gray-200 hover:shadow-md'}`}
            onClick={() => onSelectVehicleType(vehicle.type)}
          >
            <img src={vehicle.image} alt={vehicle.type} className="w-16 h-12 object-contain" />
            <h4 className="font-semibold text-gray-800 text-sm">{vehicle.type}</h4>
            <p className="text-xs text-gray-600 font-bold">{fare}</p>
            <p className="text-xs text-gray-500">{vehicle.capacity} Person</p>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleSelector;