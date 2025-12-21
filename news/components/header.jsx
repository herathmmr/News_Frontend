import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaHome, FaFootballBall, FaBriefcase, FaFilm, FaEnvelope, FaInfoCircle, FaSignOutAlt, FaNewspaper, FaLandmark, FaLaptop, FaBuilding, FaUserTie } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import toast from "react-hot-toast";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);
  const [isJobsDropdownOpen, setIsJobsDropdownOpen] = useState(false);
  const [isMobileNewsOpen, setIsMobileNewsOpen] = useState(false);
  const [isMobileJobsOpen, setIsMobileJobsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const newsDropdownRef = useRef(null);
  const jobsDropdownRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileNewsOpen(false);
    setIsMobileJobsOpen(false);
  };
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleNewsDropdown = () => setIsNewsDropdownOpen(!isNewsDropdownOpen);
  const toggleJobsDropdown = () => setIsJobsDropdownOpen(!isJobsDropdownOpen);

  const newsCategories = [
    { name: "Sports", path: "/sports", icon: FaFootballBall, color: "text-green-500" },
    { name: "Business", path: "/business", icon: FaBriefcase, color: "text-blue-500" },
    { name: "Entertainment", path: "/entertainment", icon: FaFilm, color: "text-purple-500" },
    { name: "Politics", path: "/politics", icon: FaLandmark, color: "text-red-500" },
    { name: "Technology", path: "/technology", icon: FaLaptop, color: "text-cyan-500" },
  ];

  const jobCategories = [
    { name: "Government Jobs", path: "/jobs/government", icon: FaBuilding, color: "text-emerald-600", description: "Public sector opportunities" },
    { name: "Private Jobs", path: "/jobs/private", icon: FaUserTie, color: "text-indigo-600", description: "Private sector careers" },
  ];

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
    setShowLogoutModal(true);
    setIsProfileOpen(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowLogoutModal(false);
    toast.success("Logged out successfully!");
    navigate("/");
    closeMenu();
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
    setIsNewsDropdownOpen(false);
    setIsJobsDropdownOpen(false);
  }, [location.pathname]);

  // Close news dropdown on outside click
  useEffect(() => {
    if (!isNewsDropdownOpen) return;

    const handleOutside = (e) => {
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(e.target)) {
        setIsNewsDropdownOpen(false);
      }
    };

    const handleScroll = () => setIsNewsDropdownOpen(false);

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNewsDropdownOpen]);

  // Close jobs dropdown on outside click
  useEffect(() => {
    if (!isJobsDropdownOpen) return;

    const handleOutside = (e) => {
      if (jobsDropdownRef.current && !jobsDropdownRef.current.contains(e.target)) {
        setIsJobsDropdownOpen(false);
      }
    };

    const handleScroll = () => setIsJobsDropdownOpen(false);

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isJobsDropdownOpen]);

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
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/home" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Home
            </Link>
            
            {/* News Dropdown */}
            <div className="relative" ref={newsDropdownRef}>
              <button
                onClick={toggleNewsDropdown}
                className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 font-medium transition group"
              >
                <FaNewspaper className="text-sm" />
                <span>News</span>
                <FaChevronDown className={`text-xs transition-transform duration-300 ${isNewsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isNewsDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-[fadeIn_0.2s_ease-out]">
                  {/* Arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>
                  
                  <div className="relative bg-white rounded-xl">
                    {newsCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <Link
                          key={category.name}
                          to={category.path}
                          onClick={() => setIsNewsDropdownOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all group/item ${
                            index !== newsCategories.length - 1 ? 'border-b border-gray-50' : ''
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-white flex items-center justify-center transition-all shadow-sm`}>
                            <Icon className={`${category.color} text-sm`} />
                          </div>
                          <span className="text-gray-700 font-medium group-hover/item:text-blue-600 transition">
                            {category.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Jobs Dropdown */}
            <div className="relative" ref={jobsDropdownRef}>
              <button
                onClick={toggleJobsDropdown}
                className="flex items-center gap-1.5 text-gray-700 hover:text-emerald-600 font-medium transition group"
              >
                <MdWork className="text-sm" />
                <span>Jobs</span>
                <FaChevronDown className={`text-xs transition-transform duration-300 ${isJobsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Jobs Dropdown Menu */}
              {isJobsDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-[fadeIn_0.2s_ease-out]">
                  {/* Arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>
                  
                  {/* Header */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
                        <MdWork className="text-white text-sm" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">Find Your Career</h3>
                        <p className="text-xs text-gray-500">Explore opportunities</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative bg-white rounded-xl py-1">
                    {jobCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <Link
                          key={category.name}
                          to={category.path}
                          onClick={() => setIsJobsDropdownOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-transparent transition-all group/item ${
                            index !== jobCategories.length - 1 ? 'border-b border-gray-50' : ''
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl bg-gray-50 group-hover/item:bg-white flex items-center justify-center transition-all shadow-sm border border-gray-100`}>
                            <Icon className={`${category.color} text-lg`} />
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-700 font-medium group-hover/item:text-emerald-600 transition block">
                              {category.name}
                            </span>
                            <span className="text-xs text-gray-400">{category.description}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

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

                {/* News Dropdown (Mobile) */}
                <div className="mt-2">
                  <button
                    onClick={() => setIsMobileNewsOpen(!isMobileNewsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                  >
                    <div className="flex items-center gap-3">
                      <FaNewspaper className="text-lg text-blue-500" />
                      <span>News</span>
                    </div>
                    <FaChevronDown className={`text-sm transition-transform duration-300 ${isMobileNewsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mobile News Categories */}
                  <div className={`overflow-hidden transition-all duration-300 ${isMobileNewsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-2">
                      {newsCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <Link
                            key={category.name}
                            to={category.path}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 font-medium transition"
                            onClick={closeMenu}
                          >
                            <div className={`w-7 h-7 rounded-md bg-gray-50 flex items-center justify-center`}>
                              <Icon className={`${category.color} text-sm`} />
                            </div>
                            <span className="text-sm">{category.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Jobs Dropdown (Mobile) */}
                <div className="mt-2">
                  <button
                    onClick={() => setIsMobileJobsOpen(!isMobileJobsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 font-medium transition"
                  >
                    <div className="flex items-center gap-3">
                      <MdWork className="text-lg text-emerald-500" />
                      <span>Jobs</span>
                    </div>
                    <FaChevronDown className={`text-sm transition-transform duration-300 ${isMobileJobsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mobile Jobs Categories */}
                  <div className={`overflow-hidden transition-all duration-300 ${isMobileJobsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-emerald-100 pl-2">
                      {jobCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <Link
                            key={category.name}
                            to={category.path}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-transparent hover:text-emerald-600 font-medium transition"
                            onClick={closeMenu}
                          >
                            <div className={`w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center`}>
                              <Icon className={`${category.color} text-sm`} />
                            </div>
                            <div className="flex-1">
                              <span className="text-sm block">{category.name}</span>
                              <span className="text-xs text-gray-400">{category.description}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

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

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowLogoutModal(false)}
          ></div>

          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            {/* Header gradient */}
            <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-600"></div>

            <div className="p-6 sm:p-8 text-center">
              {/* Icon */}
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-red-50">
                <FaSignOutAlt className="w-7 h-7 text-red-500" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to sign out of your account?
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={confirmLogout}
                  className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                >
                  <FaSignOutAlt className="text-sm" />
                  Yes, Logout
                </button>

                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}