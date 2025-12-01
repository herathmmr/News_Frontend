import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaHome, FaFootballBall, FaBriefcase, FaFilm, FaEnvelope, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you want to logout?");
    
    if (confirmed) {
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      navigate("/");
      closeMenu();
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
            onClick={closeMenu}
          >
            NewsPortal
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <Link to="/home" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Home
            </Link>
            <Link to="/sports" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Sport
            </Link>
            <Link to="/business" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Business
            </Link>
            <Link to="/entertainment" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Entertainment
            </Link>
            <Link to="/contac" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Contact Us
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">
              About
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition flex items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg border-2 border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 lg:hidden z-40"
            onClick={closeMenu}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl lg:hidden z-50 overflow-y-auto">
            <div className="p-5">
              {/* Close Button */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-blue-600">Menu</span>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  aria-label="Close menu"
                >
                  <HiX size={24} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <Link
                  to="/home"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                  onClick={closeMenu}
                >
                  <FaHome className="text-lg" />
                  <span>Home</span>
                </Link>

                {/* Categories Section */}
                <div className="pt-4 pb-2">
                  <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Categories
                  </p>
                </div>

                <Link
                  to="/sports"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                  onClick={closeMenu}
                >
                  <FaFootballBall className="text-lg" />
                  <span>Sport</span>
                </Link>

                <Link
                  to="/business"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                  onClick={closeMenu}
                >
                  <FaBriefcase className="text-lg" />
                  <span>Business</span>
                </Link>

                <Link
                  to="/entertainment"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                  onClick={closeMenu}
                >
                  <FaFilm className="text-lg" />
                  <span>Entertainment</span>
                </Link>

                {/* Other Section */}
                <div className="pt-4 pb-2">
                  <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Information
                  </p>
                </div>

                <Link
                  to="/contac"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                  onClick={closeMenu}
                >
                  <FaEnvelope className="text-lg" />
                  <span>Contact Us</span>
                </Link>

                <Link
                  to="/about"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                  onClick={closeMenu}
                >
                  <FaInfoCircle className="text-lg" />
                  <span>About</span>
                </Link>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-red-600 text-white text-center font-semibold hover:bg-red-700 transition"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block w-full px-4 py-3 rounded-lg bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full px-4 py-3 rounded-lg border-2 border-blue-600 text-blue-600 text-center font-semibold hover:bg-blue-50 transition"
                      onClick={closeMenu}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}