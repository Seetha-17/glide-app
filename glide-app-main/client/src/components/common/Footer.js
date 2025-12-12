import React from 'react';

const Footer = () => {
  return (
    <footer className="py-2 bg-gray-900 text-gray-300 text-center shadow-lg">
      <p>&copy; {new Date().getFullYear()} Glide. All rights reserved.</p>
    </footer>
  );
};

export default Footer;