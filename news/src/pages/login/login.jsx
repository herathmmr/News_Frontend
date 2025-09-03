export default function LoginPage(){
    return(
        <section
      className="flex items-center justify-center min-h-screen bg-gray-700 bg-opacity-70 bg-blend-overlay"
      style={{
        backgroundImage:
          "url('/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" rounded-2xl shadow-2xl w-full max-w-md p-8 backdrop-blur-2xl" >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Login 
        </h2>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Login Button */}
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
          <a href="/register" className="text-gray-700 hover:text-red-600">
            Create Account
          </a>
        </div>
      </div>
    </section>
    )
}