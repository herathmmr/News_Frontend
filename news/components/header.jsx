import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaHome, FaFootballBall, FaBriefcase, FaFilm, FaEnvelope, FaInfoCircle, FaSignOutAlt, FaNewspaper, FaLandmark, FaLaptop, FaBuilding, FaUserTie, FaBookmark } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { MdWork, MdDashboard } from "react-icons/md";
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
  const [isScrolled, setIsScrolled] = useState(false);
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
    { name: "Sports", path: "/sports", icon: FaFootballBall, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Business", path: "/business", icon: FaBriefcase, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Entertainment", path: "/entertainment", icon: FaFilm, color: "text-purple-500", bg: "bg-purple-50" },
    { name: "Politics", path: "/politics", icon: FaLandmark, color: "text-rose-500", bg: "bg-rose-50" },
    { name: "Technology", path: "/technology", icon: FaLaptop, color: "text-cyan-500", bg: "bg-cyan-50" },
  ];

  const jobCategories = [
    { name: "Government Jobs", path: "/jobs/government", icon: FaBuilding, color: "text-emerald-600", bg: "bg-emerald-50", description: "Public sector opportunities" },
    { name: "Private Jobs", path: "/jobs/private", icon: FaUserTie, color: "text-indigo-600", bg: "bg-indigo-50", description: "Private sector careers" },
  ];

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/50" 
          : "bg-white shadow-sm"
      }`}>
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group"
              onClick={closeMenu}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-black text-lg">D</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Derana</span>
                <span className="block text-[10px] text-gray-400 font-medium -mt-0.5 tracking-wider uppercase">News Portal</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center bg-gray-50 rounded-full p-1 gap-0.5">
                <Link 
                  to="/home" 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive("/home") 
                      ? "bg-white text-blue-600 shadow-md" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                  }`}
                >
                  Home
                </Link>
                
                {/* News Dropdown */}
                <div className="relative" ref={newsDropdownRef}>
                  <button
                    onClick={toggleNewsDropdown}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isNewsDropdownOpen 
                        ? "bg-white text-blue-600 shadow-md" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                    }`}
                  >
                    <span>News</span>
                    <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isNewsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isNewsDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden z-50">
                      <div className="p-2 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                        <div className="flex items-center gap-2 px-2">
                          <FaNewspaper className="text-blue-500" />
                          <span className="font-semibold text-gray-700 text-sm">News Categories</span>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        {newsCategories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <Link
                              key={category.name}
                              to={category.path}
                              onClick={() => setIsNewsDropdownOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all group/item"
                            >
                              <div className={`w-9 h-9 rounded-lg ${category.bg} flex items-center justify-center transition-all group-hover/item:scale-110`}>
                                <Icon className={`${category.color} text-base`} />
                              </div>
                              <span className="text-gray-700 font-medium group-hover/item:text-gray-900 transition text-sm">
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
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isJobsDropdownOpen 
                        ? "bg-white text-emerald-600 shadow-md" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                    }`}
                  >
                    <span>Jobs</span>
                    <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isJobsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Jobs Dropdown Menu */}
                  {isJobsDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden z-50">
                      <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                            <MdWork className="text-white text-lg" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm">Career Opportunities</h3>
                            <p className="text-xs text-gray-500">Find your dream job</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        {jobCategories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <Link
                              key={category.name}
                              to={category.path}
                              onClick={() => setIsJobsDropdownOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-all group/item"
                            >
                              <div className={`w-11 h-11 rounded-xl ${category.bg} flex items-center justify-center transition-all group-hover/item:scale-105`}>
                                <Icon className={`${category.color} text-xl`} />
                              </div>
                              <div className="flex-1">
                                <span className="text-gray-700 font-semibold group-hover/item:text-emerald-600 transition block text-sm">
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

                <Link 
                  to="/contac" 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive("/contac") 
                      ? "bg-white text-blue-600 shadow-md" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                  }`}
                >
                  Contact
                </Link>
                <Link 
                  to="/about" 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive("/about") 
                      ? "bg-white text-blue-600 shadow-md" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                  }`}
                >
                  About
                </Link>
              </div>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoggedIn && user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={toggleProfile}
                    className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all group"
                  >
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.firstName}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                    )}
                    <span className="text-gray-700 font-medium text-sm group-hover:text-gray-900">
                      {user.firstName}
                    </span>
                    <FaChevronDown className={`text-gray-400 text-[10px] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden z-50">
                      {/* Profile Header */}
                      <div className="p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                        <div className="flex items-center gap-3">
                          {user.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt={user.firstName}
                              className="w-14 h-14 rounded-xl object-cover ring-2 ring-white/30"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center text-xl font-bold ring-2 ring-white/30">
                              {getInitials(user.firstName, user.lastName)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white truncate">
                              {user.firstName} {user.lastName}
                            </h3>
                            <p className="text-xs text-white/70 truncate">{user.email}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              user.role === "admin" 
                                ? "bg-amber-400 text-amber-900" 
                                : "bg-white/20 text-white"
                            }`}>
                              {user.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {user.role === "admin" && (
                          <Link
                            to="/admin"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-blue-50 transition group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition">
                              <MdDashboard className="text-blue-600" />
                            </div>
                            <div>
                              <span className="font-medium text-sm block">Admin Dashboard</span>
                              <span className="text-xs text-gray-400">Manage your site</span>
                            </div>
                          </Link>
                        )}
                        <Link
                          to="/my-saves"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-amber-50 transition group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition">
                            <FaBookmark className="text-amber-600 text-sm" />
                          </div>
                          <div>
                            <span className="font-medium text-sm block">Saved Items</span>
                            <span className="text-xs text-gray-400">Your bookmarks</span>
                          </div>
                        </Link>
                      </div>

                      {/* Logout Button */}
                      <div className="p-2 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition">
                            <FaSignOutAlt className="text-red-500" />
                          </div>
                          <span className="font-semibold text-sm">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full text-gray-700 hover:text-gray-900 text-sm font-medium hover:bg-gray-100 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
            onClick={closeMenu}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white lg:hidden z-50 overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
              <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-black">D</span>
                </div>
                <span className="text-lg font-bold text-gray-800">Derana</span>
              </Link>
              <button
                onClick={closeMenu}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
                aria-label="Close menu"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="p-4">
              {/* User Profile Section (Mobile) */}
              {isLoggedIn && user && (
                <div className="mb-6 p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl text-white">
                  <div className="flex items-center gap-3">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.firstName}
                        className="w-14 h-14 rounded-xl object-cover ring-2 ring-white/30"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-bold">
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold truncate">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-xs text-white/70 truncate">{user.email}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        user.role === "admin" 
                          ? "bg-amber-400 text-amber-900" 
                          : "bg-white/20 text-white"
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <nav className="space-y-1">
                <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
                
                <Link
                  to="/home"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                    isActive("/home") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={closeMenu}
                >
                  <FaHome className={isActive("/home") ? "text-blue-500" : "text-gray-400"} />
                  <span>Home</span>
                </Link>

                {/* News Dropdown (Mobile) */}
                <div>
                  <button
                    onClick={() => setIsMobileNewsOpen(!isMobileNewsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition"
                  >
                    <div className="flex items-center gap-3">
                      <FaNewspaper className="text-gray-400" />
                      <span>News</span>
                    </div>
                    <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-300 ${isMobileNewsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mobile News Categories */}
                  <div className={`overflow-hidden transition-all duration-300 ${isMobileNewsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-4 mt-1 space-y-1 pl-4 border-l-2 border-gray-100">
                      {newsCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <Link
                            key={category.name}
                            to={category.path}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                            onClick={closeMenu}
                          >
                            <div className={`w-8 h-8 rounded-lg ${category.bg} flex items-center justify-center`}>
                              <Icon className={`${category.color} text-sm`} />
                            </div>
                            <span className="text-sm font-medium">{category.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Jobs Dropdown (Mobile) */}
                <div>
                  <button
                    onClick={() => setIsMobileJobsOpen(!isMobileJobsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition"
                  >
                    <div className="flex items-center gap-3">
                      <MdWork className="text-gray-400" />
                      <span>Jobs</span>
                    </div>
                    <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-300 ${isMobileJobsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mobile Jobs Categories */}
                  <div className={`overflow-hidden transition-all duration-300 ${isMobileJobsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-4 mt-1 space-y-1 pl-4 border-l-2 border-gray-100">
                      {jobCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <Link
                            key={category.name}
                            to={category.path}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                            onClick={closeMenu}
                          >
                            <div className={`w-8 h-8 rounded-lg ${category.bg} flex items-center justify-center`}>
                              <Icon className={`${category.color} text-sm`} />
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-medium block">{category.name}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="px-3 pt-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Information</p>

                <Link
                  to="/contac"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                    isActive("/contac") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={closeMenu}
                >
                  <FaEnvelope className={isActive("/contac") ? "text-blue-500" : "text-gray-400"} />
                  <span>Contact Us</span>
                </Link>

                <Link
                  to="/about"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                    isActive("/about") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={closeMenu}
                >
                  <FaInfoCircle className={isActive("/about") ? "text-blue-500" : "text-gray-400"} />
                  <span>About</span>
                </Link>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                {isLoggedIn && user ? (
                  <>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={closeMenu}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition shadow-lg"
                      >
                        <MdDashboard />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/my-saves"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
                    >
                      <FaBookmark />
                      Saved Items
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="block w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
                      onClick={closeMenu}
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 text-center font-semibold hover:bg-gray-50 transition"
                      onClick={closeMenu}
                    >
                      Sign In
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowLogoutModal(false)}
          ></div>

          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Decorative top */}
            <div className="h-24 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 relative flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <FaSignOutAlt className="w-5 h-5 text-red-500" />
                </div>
              </div>
            </div>

            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Out?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to sign out of your account?
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:from-red-600 hover:to-rose-600 transition shadow-lg shadow-red-500/25"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}