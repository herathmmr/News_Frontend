import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import AdminNews from "./adminNews";
import AddNews from "./addnews";
import EditNews from "./editnews";
import AdminUsers from "./adminUsers";
import AdminJobs from "./adminJobs";
import AddJob from "./addJob";
import EditJob from "./editJob";
import AdminDashboard from "./adminDashboard";
import { MdWork, MdDashboard } from "react-icons/md";
import { FaNewspaper, FaUsers, FaHome, FaSignOutAlt } from "react-icons/fa";

export default function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isActive = (path) => {
    if (path === "/admin" && location.pathname === "/admin") return true;
    if (path !== "/admin" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg text-gray-700 hover:bg-gray-100"
      >
        {isSidebarOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl flex flex-col fixed lg:static h-full z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
              <MdDashboard className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-gray-400">Management Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="/admin"
            onClick={closeSidebar}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
              isActive("/admin") && location.pathname === "/admin"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <MdDashboard className="text-lg" />
            Dashboard
          </Link>
          
          <Link
            to="/admin/news"
            onClick={closeSidebar}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
              isActive("/admin/news")
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <FaNewspaper className="text-lg" />
            News
          </Link>
          
          <Link
            to="/admin/jobs"
            onClick={closeSidebar}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
              isActive("/admin/jobs")
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <MdWork className="text-lg" />
            Jobs
          </Link>
          
          <Link
            to="/admin/users"
            onClick={closeSidebar}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
              isActive("/admin/users")
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <FaUsers className="text-lg" />
            Users
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            to="/"
            onClick={closeSidebar}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 rounded-xl hover:bg-gray-700/50 hover:text-white transition font-medium"
          >
            <FaHome className="text-lg" />
            View Site
          </Link>
          <Link
            to="/login"
            onClick={closeSidebar}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition font-medium"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </Link>
        </div>
      </aside>

      <div className="flex-1 p-4 sm:p-6 md:p-8 min-h-screen relative bg-gray-50 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-12 lg:mt-0">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Welcome back, Admin 👋
              </h2>
              <p className="mt-1 text-gray-500">
                Here's what's happening with your portal today.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
          
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/news" element={<AdminNews />} />
            <Route path="/news/add" element={<AddNews />} />
            <Route path="/news/edit" element={<EditNews />} />
            <Route path="/jobs" element={<AdminJobs />} />
            <Route path="/jobs/add" element={<AddJob />} />
            <Route path="/jobs/edit" element={<EditJob />} />
            <Route path="/users" element={<AdminUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}