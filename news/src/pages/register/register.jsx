import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [address, setAddress]     = useState("");
  const [phone, setPhone]         = useState("");

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
      toast.error("Registration failed. Try again.");
    }
  }

  return (
    <section
      className="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-70 bg-blend-overlay"
      style={{
        backgroundImage: "url('/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="rounded-2xl shadow-2xl w-full max-w-lg p-8 backdrop-blur-2xl">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={register}>
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Register
          </button>
        </form>

        {/* Extra Links */}
        <div className="flex justify-center items-center mt-6 text-sm">
          <span className="text-gray-200">Already have an account?</span>
          <Link to="/login" className="ml-2 text-red-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
