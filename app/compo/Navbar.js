'use client'; // Important for client-side hooks like useState and useEffect

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);  // State to toggle profile dropdown

  // Toggle the mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Toggle the profile dropdown visibility
  const toggleProfile = () => setProfileOpen(!profileOpen);

  // Check for scroll position to add a background to the navbar
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all ease-in-out duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <span className="text-white">Prime Hub</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex w-1/3 items-center space-x-4">
          <input
            type="text"
            placeholder="Search content..."
            className="bg-gray-800 text-white p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navbar Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/content">Content</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/community">Community</Link>

          {/* Notifications Icon */}
          <div className="relative">
            <button className="text-xl text-white">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>

          {/* User Avatar Dropdown */}
          <div className="relative">
            <button onClick={toggleProfile} className="text-xl text-white">
              <FontAwesomeIcon icon={faUserCircle} />
            </button>
            {profileOpen && (  // Only show the dropdown when profileOpen is true
              <div className="absolute right-0 w-48 bg-gray-800 rounded-lg shadow-lg mt-2 p-2">
                <ul className="space-y-2">
                  <li>
                    <Link href="/profile" className="block px-4 py-2 text-white hover:bg-gray-700 rounded">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/account" className="block px-4 py-2 text-white hover:bg-gray-700 rounded">
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link href="/subscription" className="block px-4 py-2 text-white hover:bg-gray-700 rounded">
                      Subscription
                    </Link>
                  </li>
                  <li>
                    <Link href="/logout" className="block px-4 py-2 text-white hover:bg-gray-700 rounded">
                      Log out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl text-white">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-800 text-white p-4 absolute top-0 right-0 w-full">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="hover:bg-gray-700 px-4 py-2 rounded">Home</Link>
            <Link href="/pricing" className="hover:bg-gray-700 px-4 py-2 rounded">Pricing</Link>
            <Link href="/content" className="hover:bg-gray-700 px-4 py-2 rounded">Content</Link>
            <Link href="/dashboard" className="hover:bg-gray-700 px-4 py-2 rounded">Dashboard</Link>
            <Link href="/community" className="hover:bg-gray-700 px-4 py-2 rounded">Community</Link>
            <Link href="/login" className="hover:bg-gray-700 px-4 py-2 rounded">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
