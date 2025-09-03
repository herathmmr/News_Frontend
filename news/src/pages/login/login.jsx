import { use, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useState("");

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
        if(user.role =="admin"){
          window.location.href="/admin"
        }else{
          window.location.href="/home"
        }

      })
      .catch((err) => {
        console.log(err);
        toast.error("Login Failed");
      });
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
      <div className=" rounded-2xl shadow-2xl w-full max-w-md p-8 backdrop-blur-2xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Login
        </h2>

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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-500 text-white"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <a href="/forgot-password" className="text-red-600 hover:underline">
            Forgot Password?
          </a>
          <a href="/register" className="text-gray-200 hover:text-red-600">
            Create Account
          </a>
        </div>
      </div>
    </section>
  );
}