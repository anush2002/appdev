import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer text-white py-4 absolute bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2024 Bislerium PVT. LTD. All rights reserved.</p>
        <div className="flex space-x-4">
          {/* Facebook Icon */}
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="w-6 h-6 cursor-pointer" />
          </a>

          {/* Instagram Icon */}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 cursor-pointer" />
          </a>

          {/* Twitter Icon */}
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-6 h-6 cursor-pointer" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
