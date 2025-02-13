'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDollarSign, faVideo, faChartLine, faUserFriends, faSignInAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const MobileNav = ({ menuOpen, onClose }) => {
  const menuItems = [
    { name: 'Home', href: '/', icon: faHome },
    { name: 'Pricing', href: '/pricing', icon: faDollarSign },
    { name: 'Content', href: '/content', icon: faVideo },
    { name: 'Dashboard', href: '/dashboard', icon: faChartLine },
    { name: 'Community', href: '/community', icon: faUserFriends },
    { name: 'Login', href: '/login', icon: faSignInAlt },
  ];

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden fixed inset-0 bg-gray-900 bg-opacity-90 text-white p-6 flex flex-col items-center space-y-6 z-50"
          role="menu"
        >
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-white" aria-label="Close menu">
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Menu Items */}
          {menuItems.map(({ name, href, icon }) => (
            <Link key={name} href={href} className="flex items-center space-x-3 text-xl hover:bg-gray-700 px-6 py-3 rounded transition" onClick={onClose}>
              <FontAwesomeIcon icon={icon} />
              <span>{name}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
