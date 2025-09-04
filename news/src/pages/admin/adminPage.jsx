import { Link, Route, Routes } from "react-router-dom";
import AdminNews from "./adminNews";
import AddNews from "./addnews";
import EditNews from "./editnews";

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-green-600">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition">
            📊 Dashboard
          </button>
          <Link to="/admin/news"  className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition">
            📰 News
          </Link>
          <Link to ="/admin/Users" className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition">
            👥 Users
          </Link>
          <button className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition">
            ⚙️ Settings
          </button>
        </nav>
        <div className="p-4 border-t">
          <Link to="/login" className="w-full text-left text-red-600 hover:text-red-800">
            🚪 Logout
          </Link>
        </div>
      </aside>

      
      <div className="flex-1 p-8 h-screen relative">
        


        <h2 className="text-3xl font-semibold text-gray-800">Welcome, Admin 👋</h2>
        <p className="mt-2 text-gray-600">
          Here you can manage users, news articles, and dashboard stats.
        </p>
        <Routes path="/*">
        <Route path="/Users" element={<h1>user Management</h1>} />
        <Route path="/news" element={<AdminNews/>} />
        <Route path="/news/add" element={<AddNews/>} />
        <Route path="/news/edit" element={<EditNews/>} />
        </Routes>

      </div>
    </div>
  );
}
