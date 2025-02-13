"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db, googleProvider } from "../compo/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBirthdayCake, FaGoogle } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [progress, setProgress] = useState(0);

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Animation happens only once
    });
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  // Check Password Strength
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) strength += 1;

    setProgress(strength * 25);

    if (strength === 1) setPasswordStrength("Weak ❌");
    else if (strength === 2) setPasswordStrength("Medium ⚠️");
    else if (strength === 3) setPasswordStrength("Strong ✅");
    else if (strength === 4) setPasswordStrength("Very Strong 💪");
  };

  // Handle Email Sign Up
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: form.name });
      await sendEmailVerification(user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: form.name,
        email: form.email,
        phone: form.phone,
        dob: form.dob,
        role: "user",
        status: "active",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });

      toast.success("Account created! Please verify your email.");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-Up
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber || "",
        dob: "",
        role: "user",
        status: "active",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      }, { merge: true });

      toast.success("Signed in with Google!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen pt-44 flex items-center justify-center bg-gradient-to-r from-[#0E1628] to-[#380643] text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      <div data-aos="fade-up" className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
        <h2 data-aos="zoom-in" className="text-3xl font-semibold text-center text-[#E5970F]">
          Create an Account
        </h2>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          {/* Name Field */}
          <div className="relative" data-aos="fade-right">
            <FaUser className="absolute left-4 top-4 text-gray-300" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full bg-white/5 text-white py-3 pl-12 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-[#E5970F]"
            />
          </div>

          {/* Email Field */}
          <div className="relative" data-aos="fade-left">
            <FaEnvelope className="absolute left-4 top-4 text-gray-300" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full bg-white/5 text-white py-3 pl-12 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-[#E5970F]"
            />
          </div>

          {/* Phone Number Field */}
          <div className="relative" data-aos="fade-right">
            <FaPhone className="absolute left-4 top-4 text-gray-300" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="w-full bg-white/5 text-white py-3 pl-12 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-[#E5970F]"
            />
          </div>

          {/* Date of Birth Field */}
          <div className="relative" data-aos="fade-left">
            <FaBirthdayCake className="absolute left-4 top-4 text-gray-300" />
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
              className="w-full bg-white/5 text-white py-3 pl-12 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-[#E5970F]"
            />
          </div>

          {/* Password Field */}
          <div className="relative" data-aos="fade-up">
            <FaLock className="absolute left-4 top-4 text-gray-300" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full bg-white/5 text-white py-3 pl-12 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-[#E5970F]"
            />
            <p className="text-sm text-gray-300 mt-1">{passwordStrength}</p>

            {/* Password Strength Meter */}
            <div className="w-full bg-gray-800 rounded-md h-2 mt-2">
              <div
                className={`h-full rounded-md ${
                  progress < 50
                    ? "bg-red-500"
                    : progress < 75
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="w-full bg-[#E5970F] py-3 rounded-lg font-semibold">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Google Sign-Up Button */}
          <button onClick={handleGoogleSignup} type="button" className="w-full flex items-center justify-center gap-2 bg-blue-500 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all">
            <FaGoogle /> Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
}
