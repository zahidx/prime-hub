'use client'; // Important for client-side hooks like useState and useEffect

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simulating authentication
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  const toggleMenu = useCallback(() => setMenuOpen(!menuOpen), [menuOpen]);
  const toggleProfile = useCallback(() => setProfileOpen(!profileOpen), [profileOpen]);
  const toggleDarkMode = useCallback(() => setIsDarkMode(!isDarkMode), [isDarkMode]);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Simulate user authentication status (replace with actual logic)
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    // Apply dark mode class on body element for global dark mode style
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all ease-in-out duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
      }`}
      aria-label="Main navigation"
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
            aria-label="Search content"
          />
        </div>

        {/* Navbar Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/" aria-label="Home">Home</Link>
          <Link href="/pricing" aria-label="Pricing">Pricing</Link>
          <Link href="/content" aria-label="Content">Content</Link>
          <Link href="/dashboard" aria-label="Dashboard">Dashboard</Link>
          <Link href="/community" aria-label="Community">Community</Link>

          {/* Notifications Icon */}
          <div className="relative">
            <button className="text-xl text-white" aria-label="Notifications">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-xl text-white"
            aria-label="Toggle Dark Mode"
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>

          {/* User Avatar Dropdown */}
          {isAuthenticated && (
            <div className="relative">
              <button onClick={toggleProfile} className="text-xl text-white" aria-expanded={profileOpen ? 'true' : 'false'}>
                <FontAwesomeIcon icon={faUserCircle} />
              </button>
              {profileOpen && (
                <div
                  className="absolute right-0 w-48 bg-gray-800 rounded-lg shadow-lg mt-2 p-2 transition-all ease-in-out duration-200"
                  role="menu"
                  aria-labelledby="user-profile-menu"
                >
                  <ul className="space-y-2">
                    <li>
                      <Link href="/profile" className="block px-4 py-2 text-white hover:bg-gray-700 rounded" role="menuitem">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/account" className="block px-4 py-2 text-white hover:bg-gray-700 rounded" role="menuitem">
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link href="/subscription" className="block px-4 py-2 text-white hover:bg-gray-700 rounded" role="menuitem">
                        Subscription
                      </Link>
                    </li>
                    <li>
                      <Link href="/logout" className="block px-4 py-2 text-white hover:bg-gray-700 rounded" role="menuitem">
                        Log out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl text-white" aria-label="Toggle mobile menu">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className="lg:hidden bg-gray-800 text-white p-4 absolute top-0 right-0 w-full transition-all ease-in-out duration-300"
          role="menu"
        >
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="hover:bg-gray-700 px-4 py-2 rounded" role="menuitem">
              Home
            </Link>
            <Link href="/pricing" className="hover:bg-gray-700 px-4 py-2 rounded" role="menuitem">
              Pricing
            </Link>
            <Link href="/content" className="hover:bg-gray-700 px-4 py-2 rounded" role="menuitem">
              Content
            </Link>
            <Link href="/dashboard" className="hover:bg-gray-700 px-4 py-2 rounded" role="menuitem">
              Dashboard
            </Link>
            <Link href="/community" className="hover:bg-gray-700 px-4 py-2 rounded" role="menuitem">
              Community
            </Link>
            <Link href="/login" className="hover:bg-gray-700 px-4 py-2 rounded" role="menuitem">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
