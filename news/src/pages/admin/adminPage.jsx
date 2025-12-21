import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import AdminNews from "./adminNews";
import AddNews from "./addnews";
import EditNews from "./editnews";
import AdminUsers from "./adminUsers";
import AdminJobs from "./adminJobs";
import AddJob from "./addJob";
import EditJob from "./editJob";
import { MdWork } from "react-icons/md";

export default function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

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
        className={`w-64 bg-white shadow-xl flex flex-col fixed lg:static h-full z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-green-600">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={closeSidebar}
            className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition"
          >
            📊 Dashboard
          </button>
          <Link
            to="/admin/news"
            onClick={closeSidebar}
            className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition"
          >
            📰 News
          </Link>
          <Link
            to="/admin/jobs"
            onClick={closeSidebar}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-emerald-100 hover:text-emerald-700 transition"
          >
            <MdWork className="text-lg" />
            Jobs
          </Link>
          <Link
            to="/admin/users"
            onClick={closeSidebar}
            className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition"
          >
            👥 Users
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Link
            to="/login"
            onClick={closeSidebar}
            className="w-full text-left text-red-600 hover:text-red-800"
          >
            🚪 Logout
          </Link>
        </div>
      </aside>

      <div className="flex-1 p-4 sm:p-6 md:p-8 min-h-screen relative bg-gray-50 overflow-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mt-12 lg:mt-0">
          Welcome, Admin 👋
        </h2>
        <p className="mt-2 text-gray-600">
          Here you can manage users, news articles, jobs, and dashboard stats.
        </p>
        <Routes path="/*">
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
  );
}