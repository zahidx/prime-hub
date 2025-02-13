import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginModal = ({ isOpen, onClose }) => {
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = window.localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches);

    const storedEmail = window.localStorage.getItem("email");
    const storedRememberMe = window.localStorage.getItem("rememberMe");

    if (storedRememberMe === "true" && storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }

    if (password.length < 6) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }

    if (isEmailValid && isPasswordValid) {
      const loginSuccess = true;

      if (loginSuccess) {
        if (rememberMe) {
          window.localStorage.setItem("email", email);
          window.localStorage.setItem("rememberMe", "true");
        } else {
          window.localStorage.removeItem("email");
          window.localStorage.removeItem("rememberMe");
        }

        if (typeof window !== "undefined") {
          window.location.href = "/dashboard";
        }
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    }
  };

  const handleSignUpRedirect = () => {
    onClose();
    if (typeof window !== "undefined") {
      window.location.href = "/signup";
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  if (!isOpen || !isClient) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${isDarkMode ? "bg-[#121212] bg-opacity-80" : "bg-[#f7fafc] bg-opacity-90"}`}
    >
      <div
        className={`p-8 rounded-xl w-full max-w-lg shadow-2xl transform transition-all duration-500 ${isDarkMode ? "bg-[#1f1f1f] text-white" : "bg-white text-gray-900"}`}
        data-aos="zoom-in-up"
      >
        <h2 className="text-3xl font-semibold mb-8 text-center" data-aos="fade-down">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6" data-aos="fade-up" data-aos-delay="100">
            <label htmlFor="email" className="block mb-2 text-lg font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className={`w-full px-6 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#333333] dark:border-gray-600 dark:text-white transition duration-200 ${!isEmailValid ? 'border-red-500' : ''}`}
              placeholder="Enter your email"
            />
            {!isEmailValid && <p className="text-red-500 text-sm mt-2">Please enter a valid email.</p>}
          </div>

          <div className="mb-6" data-aos="fade-up" data-aos-delay="200">
            <label htmlFor="password" className="block mb-2 text-lg font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-6 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#333333] dark:border-gray-600 dark:text-white transition duration-200 ${!isPasswordValid ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
            />
            {!isPasswordValid && <p className="text-red-500 text-sm mt-2">Password must be at least 6 characters.</p>}
          </div>

          <div className="mb-6 flex items-center justify-between" data-aos="fade-up" data-aos-delay="300">
            <label className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
            data-aos="zoom-in"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center" data-aos="fade-up" data-aos-delay="400">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={handleSignUpRedirect}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-3xl text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition duration-200 transform hover:rotate-45"
          data-aos="fade-down"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
