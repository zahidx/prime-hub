"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "./compo/Loader";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // ✅ Allows animations on every scroll
      mirror: true, // ✅ Triggers animations when scrolling back up
    });

    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0E1628] to-[#380643] text-white overflow-hidden">
      
      {/* Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center px-6 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}
      >
        <motion.h1
          className="text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-[#E5970F]">Prime Hub</span>
        </motion.h1>
        <motion.p
          className="text-lg mb-6 text-gray-300 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          A premium platform with personalized content, seamless interaction, and cutting-edge experiences.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/signup">
            <button className="bg-[#E5970F] text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-[#e69a10] transition-all duration-300 shadow-xl transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold mb-12 text-[#E5970F]" data-aos="fade-up">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Premium Content", desc: "Access exclusive content that elevates your experience." },
              { title: "Personalized Dashboard", desc: "Manage your preferences and track your progress seamlessly." },
              { title: "Community Interaction", desc: "Engage with like-minded individuals and grow together." },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/20 transition transform hover:scale-110 hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <h3 className="text-xl font-semibold text-[#E5970F] mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-[#0E1628] to-[#380643]">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold mb-12 text-[#E5970F]" data-aos="fade-up">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { name: "John Doe", role: "Freelancer", review: "Prime Hub transformed my workflow! The content is top-notch." },
              { name: "Jane Smith", role: "Entrepreneur", review: "The personalized dashboard makes managing tasks seamless." },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md border border-white/20 transition-transform hover:scale-105 hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <p className="text-gray-300 italic mb-4">"{testimonial.review}"</p>
                <p className="font-semibold text-[#E5970F]">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/path/to/your/parallax-image.jpg')" }}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
        <div className="relative z-10 text-center text-white">
          <h2 className="text-4xl font-semibold mb-6 text-[#E5970F]" data-aos="fade-up">
            Ready to Experience the Best?
          </h2>
          <Link href="/signup">
            <button
              className="bg-[#E5970F] text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-[#e69a10] transition-all duration-300 shadow-lg"
              data-aos="zoom-in"
            >
              Join Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
