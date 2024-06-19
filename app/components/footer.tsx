import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
  
    <footer className=" flex justify-between items-center p-4">
      <div>
        <p className="text-white">Enigma &copy;2024</p>
      </div>
      <div className="flex space-x-4">
        
        <a href="https://www.linkedin.com/company/enigma-iiitkottayam/" className="text-white">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/enigma_iiitk?igsh=NTc4MTIwNjQ2YQ" className="text-white">
          <FaInstagram />
        </a>
      </div>
    </footer>

  );
};

export default Footer;
