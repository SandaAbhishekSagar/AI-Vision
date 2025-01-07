import React from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-blue-400" />
            <span className="ml-2 text-white text-xl font-bold">AI Vision</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Home</a>
              <a href="#about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">About</a>
              <a href="#contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Contact</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="text-white block px-3 py-2 rounded-md hover:bg-gray-700">Home</a>
            <a href="#about" className="text-gray-300 block px-3 py-2 rounded-md hover:bg-gray-700">About</a>
            <a href="#contact" className="text-gray-300 block px-3 py-2 rounded-md hover:bg-gray-700">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;