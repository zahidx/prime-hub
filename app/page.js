'use client'; // Important for client-side hooks like useState and useEffect

import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0E1628] to-[#380643] text-white h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to Prime Hub</h1>
        <p className="text-lg mb-6">Your one-stop platform for all things premium.</p>
        <Link href="/signup">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-3xl font-semibold mb-8">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Premium Content</h3>
              <p>Access exclusive content that elevates your experience.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Personalized Dashboard</h3>
              <p>Manage your preferences and track your progress seamlessly.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Community Interaction</h3>
              <p>Engage with like-minded individuals and grow together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Optional) */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-3xl font-semibold mb-8">What Our Users Say</h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-gray-700 p-8 rounded-lg shadow-md w-1/3">
              <p className="text-lg mb-4">"Prime Hub has transformed my workflow. It’s easy to use and the content is top-notch!"</p>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Freelancer</p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg shadow-md w-1/3">
              <p className="text-lg mb-4">"I love the personalized dashboard. It’s made managing my tasks so much easier!"</p>
              <p className="font-semibold">Jane Smith</p>
              <p className="text-sm">Entrepreneur</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <div>
            <Link href="/">
              <span className="text-2xl font-bold">Prime Hub</span>
            </Link>
          </div>
          <div className="space-x-6">
            <Link href="/about">
              About
            </Link>
            <Link href="/pricing">
              Pricing
            </Link>
            <Link href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
