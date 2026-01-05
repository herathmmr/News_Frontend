import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    console.log(email, password);

    axios
      .post("http://localhost:3005/api/users/login", {
        email: email,
        password: password
      })
      .then((res) => {
        console.log(res);
        toast.success("Login Successful");
        const user = res.data.user;

        localStorage.setItem("token", res.data.token);
        
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.error || "Login Failed");
      });
  }

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:3005/api/auth/google";
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
      <div className="rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 backdrop-blur-2xl mx-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Login
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
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-gray-900 text-gray-200 rounded-full">
              Or login with email
            </span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={login}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg shadow-md hover:bg-red-700 transition font-medium"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="flex justify-center items-center mt-6 text-sm">
          <span className="text-gray-200">Don't have an account?</span>
          <Link to="/register" className="ml-2 text-red-600 hover:underline font-medium">
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}