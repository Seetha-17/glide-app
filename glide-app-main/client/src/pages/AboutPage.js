import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import aboutBg from '../assets/images/bg-about.png';

// Import images for scrolling section
import bikeImage from '../assets/images/bike.png';
import autoImage from '../assets/images/auto.png';
import electricAutoImage from '../assets/images/electric-auto.png';
import miniCarImage from '../assets/images/mini-car.png';
import xlSedanImage from '../assets/images/xl-sedan.png';
import luxuryImage from '../assets/images/luxury.png';
import reserveImage from '../assets/images/reserve.png';
import rentImage from '../assets/images/rentals.png';
import pathpalImage from '../assets/images/pathpal.png';

const services = [
  { type: 'Bike', image: bikeImage, capacity: 1, description: 'Quick and economical', link: '/bike', bgColor: 'bg-purple-800/20', textColor: 'text-purple-200' },
  { type: 'Auto', image: autoImage, capacity: 3, description: 'Convenient for short trips', link: '/auto', bgColor: 'bg-purple-700/20', textColor: 'text-purple-100' },
  { type: 'Electric Auto', image: electricAutoImage, capacity: 3, description: 'Eco-friendly and efficient', link: '/electric-auto', bgColor: 'bg-purple-600/20', textColor: 'text-purple-100' },
  { type: 'Mini Car', image: miniCarImage, capacity: 4, description: 'Compact and affordable', link: '/mini-car', bgColor: 'bg-gray-800/20', textColor: 'text-gray-200' },
  { type: 'XL Sedan', image: xlSedanImage, capacity: 6, description: 'Spacious for families', link: '/xl-sedan', bgColor: 'bg-purple-700/30', textColor: 'text-white' },
  { type: 'Luxury', image: luxuryImage, capacity: 4, description: 'Premium comfort and style', link: '/luxury', bgColor: 'bg-purple-800/30', textColor: 'text-white' },
  { type: 'Reserve', image: reserveImage, capacity: null, description: 'Book in advance', link: '/reserve', bgColor: 'bg-purple-700/20', textColor: 'text-purple-100' },
  { type: 'Rent', image: rentImage, capacity: null, description: 'Hourly packages', link: '/rent', bgColor: 'bg-gray-800/20', textColor: 'text-gray-200' },
  { type: 'PathPal', image: pathpalImage, capacity: null, description: 'Driver’s matching tool', link: '/pathpal', bgColor: 'bg-purple-600/20', textColor: 'text-purple-100' },
];

const AboutPage = () => {
  const containerRef = useRef(null);
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
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 w-full max-w-5xl bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 space-y-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-400">About Glide</h2>
          <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto">
            Glide is more than just a ride-sharing platform — it's your partner in efficient, smart, and sustainable urban travel. We are committed to redefining how you move around cities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 mb-4">
                We envision a world where transportation is accessible, safe, and environmentally friendly. By leveraging cutting-edge technology, Glide aims to transform urban mobility into a seamless experience.
              </p>
              <p className="text-gray-400">
                Our mission is to reduce congestion, improve travel efficiency, and empower communities by offering flexible ride solutions tailored to everyone’s needs.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 mb-4">
                We are driven by innovation and customer satisfaction. Our mission is to provide reliable, safe, and affordable rides while contributing to greener and healthier cities.
              </p>
              <p className="text-gray-400">
                Whether it's a quick commute or a family trip, Glide is here to ensure that you reach your destination comfortably and on time.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Why Choose Glide?</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>24/7 availability with real-time ride tracking</li>
              <li>Eco-friendly vehicle options including electric autos</li>
              <li>Verified drivers and enhanced safety protocols</li>
              <li>Customizable ride preferences and seamless payment options</li>
              <li>Dedicated customer support to assist you anytime</li>
            </ul>
          </div>

          {/* Scrolling Service Cards Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Services</h3>
            <div className="relative w-full h-60 overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-gray-800/40 rounded-xl p-4">
              <div className="flex w-max space-x-4 px-2">
                {extendedData.map((service, index) => (
                  <Link
                    to={service.link}
                    key={index}
                    className="card flex-shrink-0 w-72 h-52 snap-center rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 outline-none"
                  >
                    <div className={`w-full h-full p-4 flex flex-col justify-between rounded-xl border border-gray-700 hover:border-indigo-400 transition-all duration-300 ${service.bgColor}`}>
                      <span className="text-xs font-semibold text-indigo-300">FEATURE</span>
                      <div className="w-24 h-24 mx-auto overflow-hidden rounded-full bg-gray-900/50">
                        <img
                          src={service.image}
                          alt={service.type}
                          className="w-full h-full object-cover transform scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h4 className={`text-center font-bold text-lg ${service.textColor}`}>{service.type}</h4>
                      {service.capacity && (
                        <p className="text-center text-sm text-gray-400">Capacity: {service.capacity}</p>
                      )}
                      <p className="text-center text-sm text-gray-400">{service.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Important Links</h3>
              <nav className="space-y-2">
                <Link to="/pricing" className="block text-indigo-400 hover:underline">Pricing</Link>
                <Link to="/privacy" className="block text-indigo-400 hover:underline">Privacy Policy</Link>
                <Link to="/terms" className="block text-indigo-400 hover:underline">Terms of Service</Link>
                <Link to="/join-us" className="block text-indigo-400 hover:underline">Join as a Driver</Link>
              </nav>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
              <p className="text-gray-400 mb-2">📧 support@glide.com</p>
              <p className="text-gray-400 mb-2">📞 +1 234 567 8901</p>
              <p className="text-gray-400">📍 123 Glide Street, Mobility City, USA</p>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm mt-6">
            © {new Date().getFullYear()} Glide. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
