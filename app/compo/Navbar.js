'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faBars, faMoon, faSun, faHome, faDollarSign, faVideo, faChartBar, faUsers, faLock } from '@fortawesome/free-solid-svg-icons'; // Import lock icon
import MobileNav from './MobileNav';
import LoginModal from './LoginModal'; // Import LoginModal component

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set to false for showing login
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true';
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const toggleProfile = () => setProfileOpen((prev) => !prev);
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode);
      document.body.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    const handleDebouncedScroll = () => {
      requestAnimationFrame(handleScroll);
    };
    window.addEventListener('scroll', handleDebouncedScroll);
    return () => window.removeEventListener('scroll', handleDebouncedScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const navItems = useMemo(() => [
    { name: 'Home', icon: faHome, path: '/' },
    { name: 'Pricing', icon: faDollarSign, path: '/pricing' },
    { name: 'Content', icon: faVideo, path: '/content' },
    { name: 'Dashboard', icon: faChartBar, path: '/dashboard' },
    { name: 'Community', icon: faUsers, path: '/community' },
  ], []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`} aria-label="Main navigation">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold ml-4">
          <Link href="/">
            <span className="text-white">Prime Hub</span>
          </Link>
        </div>

        <div className="hidden lg:flex w-1/4 items-center space-x-4">
          <input type="text" placeholder="Search content..." className="bg-gray-800 text-white p-2 rounded-md w-full sm:w-80 focus:ring-2 focus:ring-blue-500" aria-label="Search content" />
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path} className="flex items-center space-x-2 text-white hover:text-blue-400 transition" aria-label={item.name}>
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.name}</span>
            </Link>
          ))}

          <button className="text-xl text-white hover:text-blue-400 transition" aria-label="Notifications">
            <FontAwesomeIcon icon={faBell} />
          </button>

          <button onClick={toggleDarkMode} className="text-xl text-white hover:text-blue-400 transition" aria-label="Toggle Dark Mode">
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>

          {!isAuthenticated && (
            <button onClick={() => setIsModalOpen(true)} className="text-xl text-yellow-500 hover:text-blue-400 transition ml-16">
              <FontAwesomeIcon icon={faLock} className= " text-yellow-500" /> {/* Lock icon beside Login */}
              Login
            </button>
          )}

          {isAuthenticated && (
            <div className="relative">
              <button onClick={toggleProfile} className="text-xl text-white hover:text-blue-400 transition" aria-expanded={profileOpen}>
                <FontAwesomeIcon icon={faUserCircle} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 w-48 bg-gray-800 rounded-lg shadow-lg mt-2 p-2 animate-fade-in" role="menu" aria-hidden={!profileOpen}>
                  {['Profile', 'Account', 'Subscription', 'Logout'].map((item) => (
                    <Link key={item} href={`/${item.toLowerCase()}`} className="block px-4 py-2 text-white hover:bg-gray-700 rounded">
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl text-white" aria-label="Toggle mobile menu">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNav menuOpen={menuOpen} onClose={closeMenu} />
      
      {/* Login Modal */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
