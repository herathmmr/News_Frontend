import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaHome, FaFootballBall, FaBriefcase, FaFilm, FaEnvelope, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Check if user is logged in and decode token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you want to logout?");
    
    if (confirmed) {
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/");
      closeMenu();
      setIsProfileOpen(false);
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || 'U'}${lastName?.charAt(0) || 'S'}`.toUpperCase();
  };

  useEffect(() => {
    if (!isProfileOpen) return;

    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleScroll = () => setIsProfileOpen(false);

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isProfileOpen]);

  // Close profile on route change
  useEffect(() => {
    setIsProfileOpen(false);
  }, [location.pathname]);

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
            {isLoggedIn && user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition shadow-md"
                >
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center text-xs font-bold">
                      {getInitials(user.firstName, user.lastName)}
                    </div>
                  )}
                  <span className="text-white font-semibold text-sm">
                    {user.firstName}
                  </span>
                  <FaChevronDown className={`text-white text-xs transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {/* Profile Header */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.firstName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center text-lg font-bold">
                            {getInitials(user.firstName, user.lastName)}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                            user.role === "admin" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition text-sm font-medium"
                        >
                          📊 Admin Panel
                        </Link>
                      )}
                      <Link
                        to="/home"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition text-sm font-medium"
                      >
                        🏠 My News Feed
                      </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="pt-2 border-t border-gray-200">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-red-600 hover:bg-red-50 transition text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
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

              {/* User Profile Section (Mobile) */}
              {isLoggedIn && user && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.firstName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center text-lg font-bold">
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-sm">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    user.role === "admin" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {user.role}
                  </span>
                </div>
              )}

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
                {isLoggedIn && user ? (
                  <>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={closeMenu}
                        className="block w-full px-4 py-3 rounded-lg bg-green-600 text-white text-center font-semibold hover:bg-green-700 transition"
                      >
                        📊 Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-red-600 text-white text-center font-semibold hover:bg-red-700 transition"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </>
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