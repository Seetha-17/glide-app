import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import images
import bikeImage from '../../assets/images/bike.png';
import autoImage from '../../assets/images/auto.png';
import electricAutoImage from '../../assets/images/electric-auto.png';
import miniCarImage from '../../assets/images/mini-car.png';
import xlSedanImage from '../../assets/images/xl-sedan.png';
import luxuryImage from '../../assets/images/luxury.png';
import reserveImage from '../../assets/images/reserve.png';
import rentImage from '../../assets/images/rentals.png';
import pathpalImage from '../../assets/images/pathpal.png';

const services = [
  { type: 'Bike', image: bikeImage, capacity: 1, description: 'Quick and economical', link: '/bike', bgColor: 'bg-purple-200', textColor: 'text-purple-800' },
  { type: 'Auto', image: autoImage, capacity: 3, description: 'Convenient for short trips', link: '/auto', bgColor: 'bg-purple-300', textColor: 'text-purple-900' },
  { type: 'Electric Auto', image: electricAutoImage, capacity: 3, description: 'Eco-friendly and efficient', link: '/electric-auto', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  { type: 'Mini Car', image: miniCarImage, capacity: 4, description: 'Compact and affordable', link: '/mini-car', bgColor: 'bg-white', textColor: 'text-purple-900' },
  { type: 'XL Sedan', image: xlSedanImage, capacity: 6, description: 'Spacious for families', link: '/xl-sedan', bgColor: 'bg-purple-400', textColor: 'text-white' },
  { type: 'Luxury', image: luxuryImage, capacity: 4, description: 'Premium comfort and style', link: '/luxury', bgColor: 'bg-purple-300', textColor: 'text-white' },
  { type: 'Reserve', image: reserveImage, capacity: null, description: 'Book in advance', link: '/reserve', bgColor: 'bg-purple-200', textColor: 'text-purple-800' },
  { type: 'Rent', image: rentImage, capacity: null, description: 'Hourly packages', link: '/rent', bgColor: 'bg-white', textColor: 'text-purple-900' },
  { type: 'PathPal', image: pathpalImage, capacity: null, description: 'Driver’s matching tool', link: '/pathpal', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
];

const ServiceSuggestions = () => {
  const containerRef = useRef(null);

  // Duplicate data for infinite scrolling
  const extendedData = [services[services.length - 1], ...services, services[0]];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const card = container.querySelector('.card');
    if (!card) return;

    const cardWidth = card.offsetWidth + 16;
    container.scrollLeft = cardWidth;

    const handleScroll = () => {
      if (!container) return;
      const maxScroll = cardWidth * (extendedData.length - 2);
      if (container.scrollLeft <= 0) {
        container.scrollLeft = maxScroll;
      } else if (container.scrollLeft >= maxScroll + cardWidth / 2) {
        container.scrollLeft = cardWidth;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [extendedData]);

  return (
    <div className="w-96 h-60 mb-6 mr-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide" ref={containerRef}>
      <div className="flex w-max space-x-4 px-4">
        {extendedData.map((service, index) => (
          <Link
            to={service.link}
            key={index}
            className="card flex-shrink-0 w-72 h-52 snap-center rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 outline-none"
          >
            <div className={`w-full h-full p-4 flex flex-col justify-between rounded-xl border-2 border-transparent hover:border-white focus:border-purple-700 active:border-purple-700 transition-all duration-300 ${service.bgColor}`}>
              <span className="text-xs font-semibold">FEATURE</span>
              <div className="w-24 h-24 mx-auto overflow-hidden rounded-full">
                <img
                  src={service.image}
                  alt={service.type}
                  className="w-full h-full object-cover transform scale-125 transition-transform duration-300"
                />
              </div>
              <h4 className={`text-center font-bold text-lg ${service.textColor}`}>{service.type}</h4>
              {service.capacity && (
                <p className="text-center text-sm text-gray-600">Capacity: {service.capacity}</p>
              )}
              <p className="text-center text-sm text-gray-600">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceSuggestions;
