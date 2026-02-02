import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX, HiSparkles } from "react-icons/hi";
import { FaHome, FaFootballBall, FaBriefcase, FaFilm, FaEnvelope, FaInfoCircle, FaSignOutAlt, FaNewspaper, FaLandmark, FaLaptop, FaBuilding, FaUserTie, FaBookmark, FaSearch, FaChevronDown, FaChevronRight } from "react-icons/fa";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const newsDropdownRef = useRef(null);
  const jobsDropdownRef = useRef(null);
  const searchRef = useRef(null);
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
    { name: "Sports", path: "/sports", icon: FaFootballBall, color: "text-red-600", bg: "bg-red-50", hover: "hover:bg-red-100" },
    { name: "Business", path: "/business", icon: FaBriefcase, color: "text-red-600", bg: "bg-red-50", hover: "hover:bg-red-100" },
    { name: "Entertainment", path: "/entertainment", icon: FaFilm, color: "text-red-600", bg: "bg-red-50", hover: "hover:bg-red-100" },
    { name: "Politics", path: "/politics", icon: FaLandmark, color: "text-red-600", bg: "bg-red-50", hover: "hover:bg-red-100" },
    { name: "Technology", path: "/technology", icon: FaLaptop, color: "text-red-600", bg: "bg-red-50", hover: "hover:bg-red-100" },
  ];

  const jobCategories = [
    { name: "Government Jobs", path: "/jobs/government", icon: FaBuilding, color: "text-amber-600", bg: "bg-amber-50", description: "Public sector opportunities" },
    { name: "Private Jobs", path: "/jobs/private", icon: FaUserTie, color: "text-amber-600", bg: "bg-amber-50", description: "Private sector careers" },
  ];

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(e.target)) setIsNewsDropdownOpen(false);
      if (jobsDropdownRef.current && !jobsDropdownRef.current.contains(e.target)) setIsJobsDropdownOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    const handleScroll = () => {
      setIsProfileOpen(false);
      setIsNewsDropdownOpen(false);
      setIsJobsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setIsProfileOpen(false);
    setIsNewsDropdownOpen(false);
    setIsJobsDropdownOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/home?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-900/5" 
          : "bg-white/80 backdrop-blur-md"
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0" onClick={closeMenu}>
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-black text-lg sm:text-xl">D</span>
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-500 rounded-full border-2 border-white animate-pulse"></span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Derana</span>
                <div className="flex items-center gap-1 -mt-0.5">
                  <HiSparkles className="text-amber-500 text-xs" />
                  <span className="text-[10px] lg:text-xs text-slate-400 font-semibold tracking-wider uppercase">News Portal</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center flex-1 justify-center px-8">
              <div className="flex items-center bg-slate-100/80 rounded-full p-1.5 gap-1 border border-slate-200/50 backdrop-blur-sm">
                <Link to="/home" className={`flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive("/home") || isActive("/") 
                    ? "bg-white text-red-600 shadow-md shadow-red-500/10" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}>
                  <FaHome className="text-sm" />
                  <span>Home</span>
                </Link>
                
                {/* News Dropdown */}
                <div className="relative" ref={newsDropdownRef}>
                  <button onClick={toggleNewsDropdown} className={`flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isNewsDropdownOpen 
                      ? "bg-white text-red-600 shadow-md shadow-red-500/10" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}>
                    <FaNewspaper className="text-sm" />
                    <span>News</span>
                    <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isNewsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isNewsDropdownOpen && (
                    <div className="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50">
                      <div className="p-3 bg-gradient-to-r from-red-50 to-amber-50 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
                            <FaNewspaper className="text-white text-sm" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 text-sm block">News Categories</span>
                            <span className="text-xs text-slate-500">Explore latest stories</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        {newsCategories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <Link key={cat.name} to={cat.path} onClick={() => setIsNewsDropdownOpen(false)}
                              className={`group flex items-center gap-3 px-3 py-3 rounded-xl ${cat.hover} transition-all duration-300`}>
                              <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                <Icon className={`${cat.color} text-lg`} />
                              </div>
                              <span className="flex-1 text-slate-700 font-medium text-sm group-hover:text-slate-900">{cat.name}</span>
                              <FaChevronRight className="text-slate-300 text-xs group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Jobs Dropdown */}
                <div className="relative" ref={jobsDropdownRef}>
                  <button onClick={toggleJobsDropdown} className={`flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isJobsDropdownOpen 
                      ? "bg-white text-amber-600 shadow-md shadow-amber-500/10" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}>
                    <MdWork className="text-base" />
                    <span>Jobs</span>
                    <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isJobsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isJobsDropdownOpen && (
                    <div className="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50">
                      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                            <MdWork className="text-white text-xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800">Career Opportunities</h3>
                            <p className="text-xs text-slate-500">Find your dream job today</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        {jobCategories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <Link key={cat.name} to={cat.path} onClick={() => setIsJobsDropdownOpen(false)}
                              className="group flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-slate-50 transition-all duration-300">
                              <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                <Icon className={`${cat.color} text-xl`} />
                              </div>
                              <div className="flex-1">
                                <span className="text-slate-800 font-semibold group-hover:text-emerald-600 transition block">{cat.name}</span>
                                <span className="text-xs text-slate-400">{cat.description}</span>
                              </div>
                              <FaChevronRight className="text-slate-300 text-xs group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/contac" className={`flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive("/contac") 
                    ? "bg-white text-blue-600 shadow-md shadow-blue-500/10" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}>
                  <FaEnvelope className="text-sm" />
                  <span>Contact</span>
                </Link>
                
                <Link to="/about" className={`flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive("/about") 
                    ? "bg-white text-blue-600 shadow-md shadow-blue-500/10" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}>
                  <FaInfoCircle className="text-sm" />
                  <span>About</span>
                </Link>
              </div>
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Button */}
              <div className="relative" ref={searchRef}>
                <button onClick={() => setSearchOpen(!searchOpen)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  searchOpen ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                }`} aria-label="Search">
                  <FaSearch />
                </button>
                {searchOpen && (
                  <div className="dropdown-menu absolute top-full right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-4">
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search news, jobs..."
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition text-sm" autoFocus />
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition">Search</button>
                        <button type="button" onClick={() => setSearchOpen(false)} className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              {isLoggedIn && user ? (
                <div className="relative" ref={profileRef}>
                  <button onClick={toggleProfile} className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-300 group">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt={user.firstName} className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                    )}
                    <span className="text-slate-700 font-medium text-sm group-hover:text-slate-900 hidden xl:inline">{user.firstName}</span>
                    <FaChevronDown className={`text-slate-400 text-[10px] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="dropdown-menu absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                      {/* Profile Header */}
                      <div className="p-5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
                        <div className="relative flex items-center gap-4">
                          {user.profilePicture ? (
                            <img src={user.profilePicture} alt={user.firstName} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg" />
                          ) : (
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center text-2xl font-bold ring-4 ring-white/20">
                              {getInitials(user.firstName, user.lastName)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white text-lg truncate">{user.firstName} {user.lastName}</h3>
                            <p className="text-sm text-white/70 truncate">{user.email}</p>
                            <span className={`inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                              user.role === "admin" ? "bg-amber-400 text-amber-900" : "bg-white/20 text-white"
                            }`}>
                              <HiSparkles className="text-xs" />{user.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        {user.role === "admin" && (
                          <Link to="/admin" onClick={() => setIsProfileOpen(false)}
                            className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-110 transition-all">
                              <MdDashboard className="text-blue-600 text-lg" />
                            </div>
                            <div>
                              <span className="font-semibold text-sm block group-hover:text-blue-600 transition">Admin Dashboard</span>
                              <span className="text-xs text-slate-400">Manage your site</span>
                            </div>
                          </Link>
                        )}
                        <Link to="/my-saves" onClick={() => setIsProfileOpen(false)}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-amber-50 transition-all">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 group-hover:scale-110 transition-all">
                            <FaBookmark className="text-amber-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-sm block group-hover:text-amber-600 transition">Saved Items</span>
                            <span className="text-xs text-slate-400">Your bookmarks</span>
                          </div>
                        </Link>
                      </div>

                      <div className="p-2 border-t border-slate-100">
                        <button onClick={handleLogout}
                          className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all">
                          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 group-hover:scale-110 transition-all">
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
                  <Link to="/login" className="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-semibold hover:bg-slate-100 transition-all">Sign In</Link>
                  <Link to="/register" className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105 overflow-hidden">
                    <span className="relative z-10">Get Started</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Right Section */}
            <div className="flex lg:hidden items-center gap-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-all" aria-label="Search">
                <FaSearch />
              </button>
              <button onClick={toggleMenu} className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-all" aria-label="Toggle menu">
                {isMenuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-4 border-t border-slate-100 bg-white/95 backdrop-blur-xl fade-in">
            <form onSubmit={handleSearch} className="pt-4">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search news, jobs..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" autoFocus />
              </div>
              <div className="flex gap-2 mt-3">
                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm">Search</button>
                <button type="button" onClick={() => setSearchOpen(false)} className="px-5 py-3 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm lg:hidden z-40 fade-in" onClick={closeMenu}></div>
          <div className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white lg:hidden z-50 overflow-y-auto shadow-2xl mobile-slide">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 p-4 flex justify-between items-center z-10">
              <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">D</span>
                </div>
                <span className="text-lg font-bold text-slate-800">Derana</span>
              </Link>
              <button onClick={closeMenu} className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition" aria-label="Close menu">
                <HiX size={22} />
              </button>
            </div>

            <div className="p-5">
              {/* User Profile (Mobile) */}
              {isLoggedIn && user && (
                <div className="mb-6 p-5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
                  <div className="relative flex items-center gap-4">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt={user.firstName} className="w-14 h-14 rounded-xl object-cover ring-2 ring-white/30" />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-bold">
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold truncate text-lg">{user.firstName} {user.lastName}</h3>
                      <p className="text-sm text-white/70 truncate">{user.email}</p>
                      <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        user.role === "admin" ? "bg-amber-400 text-amber-900" : "bg-white/20 text-white"
                      }`}>
                        <HiSparkles className="text-xs" />{user.role}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <nav className="space-y-1">
                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Main Menu</p>
                
                <Link to="/home" className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                  isActive("/home") || isActive("/") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                }`} onClick={closeMenu}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive("/home") || isActive("/") ? "bg-blue-100" : "bg-slate-100"}`}>
                    <FaHome className={isActive("/home") || isActive("/") ? "text-blue-500" : "text-slate-400"} />
                  </div>
                  <span>Home</span>
                </Link>

                {/* News Dropdown (Mobile) */}
                <div>
                  <button onClick={() => setIsMobileNewsOpen(!isMobileNewsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold transition-all">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <FaNewspaper className="text-slate-400" />
                      </div>
                      <span>News</span>
                    </div>
                    <FaChevronDown className={`text-xs text-slate-400 transition-transform duration-300 ${isMobileNewsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isMobileNewsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-5 mt-2 space-y-1 pl-5 border-l-2 border-slate-200">
                      {newsCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Link key={cat.name} to={cat.path} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all" onClick={closeMenu}>
                            <div className={`w-9 h-9 rounded-lg ${cat.bg} flex items-center justify-center`}>
                              <Icon className={`${cat.color} text-sm`} />
                            </div>
                            <span className="text-sm font-medium">{cat.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Jobs Dropdown (Mobile) */}
                <div>
                  <button onClick={() => setIsMobileJobsOpen(!isMobileJobsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold transition-all">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <MdWork className="text-slate-400 text-lg" />
                      </div>
                      <span>Jobs</span>
                    </div>
                    <FaChevronDown className={`text-xs text-slate-400 transition-transform duration-300 ${isMobileJobsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isMobileJobsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-5 mt-2 space-y-1 pl-5 border-l-2 border-slate-200">
                      {jobCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Link key={cat.name} to={cat.path} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all" onClick={closeMenu}>
                            <div className={`w-9 h-9 rounded-lg ${cat.bg} flex items-center justify-center`}>
                              <Icon className={`${cat.color} text-sm`} />
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-medium block">{cat.name}</span>
                              <span className="text-xs text-slate-400">{cat.description}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="px-3 pt-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Information</p>

                <Link to="/contac" className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                  isActive("/contac") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                }`} onClick={closeMenu}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive("/contac") ? "bg-blue-100" : "bg-slate-100"}`}>
                    <FaEnvelope className={isActive("/contac") ? "text-blue-500" : "text-slate-400"} />
                  </div>
                  <span>Contact Us</span>
                </Link>

                <Link to="/about" className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                  isActive("/about") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                }`} onClick={closeMenu}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive("/about") ? "bg-blue-100" : "bg-slate-100"}`}>
                    <FaInfoCircle className={isActive("/about") ? "text-blue-500" : "text-slate-400"} />
                  </div>
                  <span>About</span>
                </Link>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                {isLoggedIn && user ? (
                  <>
                    {user.role === "admin" && (
                      <Link to="/admin" onClick={closeMenu}
                        className="flex items-center justify-center gap-2.5 w-full px-4 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold hover:shadow-lg transition-all">
                        <MdDashboard className="text-lg" />Admin Dashboard
                      </Link>
                    )}
                    <Link to="/my-saves" onClick={closeMenu}
                      className="flex items-center justify-center gap-2.5 w-full px-4 py-4 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all">
                      <FaBookmark />Saved Items
                    </Link>
                    <button onClick={handleLogout}
                      className="flex items-center justify-center gap-2.5 w-full px-4 py-4 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all">
                      <FaSignOutAlt />Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="block w-full px-4 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white text-center font-bold hover:shadow-lg transition-all" onClick={closeMenu}>
                      Get Started
                    </Link>
                    <Link to="/login" className="block w-full px-4 py-4 rounded-xl border-2 border-slate-200 text-slate-700 text-center font-bold hover:bg-slate-50 transition-all" onClick={closeMenu}>
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md fade-in" onClick={() => setShowLogoutModal(false)}></div>
          <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden scale-in">
            <div className="h-28 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
              <div className="w-18 h-18 bg-white rounded-2xl shadow-xl flex items-center justify-center relative">
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                  <FaSignOutAlt className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Sign Out?</h3>
              <p className="text-sm text-slate-500 mb-6">Are you sure you want to sign out of your account?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowLogoutModal(false)} className="flex-1 px-4 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all">Cancel</button>
                <button onClick={confirmLogout} className="flex-1 px-4 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold hover:shadow-lg shadow-red-500/25 transition-all">Sign Out</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}