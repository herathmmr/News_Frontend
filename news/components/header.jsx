import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full h-[80px]" >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          NewsPortal
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/home" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/sports" className="text-gray-700 hover:text-blue-600">
            Sport
          </Link>
          <Link to="/Business" className="text-gray-700 hover:text-blue-600">
            Business
          </Link>
          <Link to="/Entertainment" className="text-gray-700 hover:text-blue-600">
            Entertainment
          </Link>
          <Link to="/contac" className="text-gray-700 hover:text-blue-600">
            Contact Us
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
