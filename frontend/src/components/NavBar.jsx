import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <nav className="bg-teal-600 rounded-lg sm:rounded-full w-full sm:w-11/12 md:w-5/6 lg:w-3/4 mx-auto transition-all duration-300 ease-in-out">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-white text-xl font-semibold">
              <Link to="/" className="hover:text-teal-200 transition-colors duration-300">
                X-Pense
              </Link>
            </div>
            <button
              className="sm:hidden text-white hover:text-teal-200 transition-colors duration-300 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon 
                icon={isMenuOpen ? faTimes : faBars} 
                className="h-6 w-6 transition-transform duration-300 ease-in-out"
                style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }}
              />
            </button>
            <div className="hidden sm:flex space-x-6">
              <Link 
                to="/login" 
                className="text-white hover:text-teal-200 transition-colors duration-300"
              >
                LOGIN
              </Link>
              <Link 
                to="/register" 
                className="text-white hover:text-teal-200 transition-colors duration-300"
              >
                REGISTER
              </Link>
            </div>
          </div>
        </div>
        <div 
          className={`sm:hidden bg-teal-700 rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-3 space-y-2">
            <Link 
              to="/login" 
              className="block text-white hover:text-teal-200 transition-all duration-300 py-2 px-3 rounded-md bg-teal-600 hover:bg-teal-500"
            >
              LOGIN
            </Link>
            <Link 
              to="/register" 
              className="block text-white hover:text-teal-200 transition-all duration-300 py-2 px-3 rounded-md bg-teal-600 hover:bg-teal-500"
            >
              REGISTER
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}