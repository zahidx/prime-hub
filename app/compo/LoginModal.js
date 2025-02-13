import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, googleProvider, phoneProvider } from "./firebase"; // Add your Firebase config here
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth"; // Import Firebase methods
import { FaGoogle, FaPhone } from "react-icons/fa"; // Google and Phone Icons

const LoginModal = ({ isOpen, onClose }) => {
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);

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

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePhoneSignIn = () => {
    if (!phone) {
      setIsPhoneValid(false);
      return;
    }

    const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: (response) => {},
    }, auth);

    signInWithPhoneNumber(auth, phone, recaptchaVerifier)
      .then((confirmationResult) => {
        const code = prompt("Enter the verification code sent to your phone.");
        return confirmationResult.confirm(code);
      })
      .then(() => {
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (!isOpen || !isClient) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${isDarkMode ? "bg-[#121212] bg-opacity-80" : "bg-[#f7fafc] bg-opacity-90"}`}
    >
      <div
        className={`p-6 rounded-xl w-full max-w-sm shadow-2xl transform transition-all duration-500 ${isDarkMode ? "bg-[#1f1f1f] text-white" : "bg-white text-gray-900"}`}
        data-aos="zoom-in-up"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center" data-aos="fade-down">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
            <label htmlFor="email" className="block mb-2 text-lg font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#333333] dark:border-gray-600 dark:text-white transition duration-200 ${!isEmailValid ? 'border-red-500' : ''}`}
              placeholder="Enter your email"
            />
            {!isEmailValid && <p className="text-red-500 text-sm mt-2">Please enter a valid email.</p>}
          </div>

          <div className="mb-4" data-aos="fade-up" data-aos-delay="200">
            <label htmlFor="password" className="block mb-2 text-lg font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#333333] dark:border-gray-600 dark:text-white transition duration-200 ${!isPasswordValid ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
            />
            {!isPasswordValid && <p className="text-red-500 text-sm mt-2">Password must be at least 6 characters.</p>}
          </div>

          <div className="mb-4 flex items-center justify-between" data-aos="fade-up" data-aos-delay="300">
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
            data-aos="zoom-in"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center" data-aos="fade-up" data-aos-delay="400">
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

        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-1/2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400 transition duration-300"
          >
            <FaGoogle className="text-xl" />
          </button>

          <button
            onClick={handlePhoneSignIn}
            className="flex items-center justify-center w-1/2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300"
          >
            <FaPhone className="text-xl" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-5xl text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition duration-200 transform hover:rotate-45"
          data-aos="fade-down"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
