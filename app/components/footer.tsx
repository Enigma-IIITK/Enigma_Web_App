import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          
          
          <nav className="mb-4">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-gray-300 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-300 transition duration-300">
                  Blogs
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="flex space-x-4 mb-4">
            <a href="https://www.linkedin.com/company/enigma-iiitkottayam/" className="hover:text-gray-300 transition duration-300" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/enigma_iiitk?igsh=NTc4MTIwNjQ2YQ" className="hover:text-gray-300 transition duration-300" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Enigma &copy; 2024</p>
          </div>
        </div>
        
        
        <div className="text-center">
          <p className="text-sm text-gray-400">Turing passed. Made by love.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;