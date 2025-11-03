import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3005/api/users", {
        firstName,
        lastName,
        email,
        password,
        address,
        phone,
      });

      console.log(res.data);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed. Try again.");
    }
  }

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:3005/api/auth/google";
  };

  const handleFacebookAuth = () => {
    window.location.href = "http://localhost:3005/api/auth/facebook";
  };

  return (
    <section
      className="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-70 bg-blend-overlay py-8"
      style={{
        backgroundImage: "url('/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 backdrop-blur-2xl mx-4">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Create Account
        </h2>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleAuth}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 py-2.5 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition font-medium"
          >
            <FaGoogle className="text-red-500 text-xl" />
            Continue with Google
          </button>

          <button
            onClick={handleFacebookAuth}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 hover:shadow-md transition font-medium"
          >
            <FaFacebook className="text-xl" />
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-gray-900 text-gray-200 rounded-full">
              Or register with email
            </span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={register}>
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white bg-transparent"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white bg-transparent"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-200 mb-1">
              Address (Optional)
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter your address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white bg-transparent"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">
              Phone (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white bg-transparent"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg shadow-md hover:bg-red-700 transition font-medium mt-6"
          >
            Register
          </button>
        </form>

        {/* Extra Links */}
        <div className="flex justify-center items-center mt-6 text-sm">
          <span className="text-gray-200">Already have an account?</span>
          <Link to="/login" className="ml-2 text-red-600 hover:underline font-medium">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}