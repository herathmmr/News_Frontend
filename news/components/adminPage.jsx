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
          <button className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition">
            📰 News
          </button>
          <button className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition">
            👥 Users
          </button>
          <button className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition">
            ⚙️ Settings
          </button>
        </nav>
        <div className="p-4 border-t">
          <button className="w-full text-left text-red-600 hover:text-red-800">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-semibold text-gray-800">Welcome, Admin 👋</h2>
        <p className="mt-2 text-gray-600">
          Here you can manage users, news articles, and dashboard stats.
        </p>

        {/* Example cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="text-xl font-bold text-green-600">Users</h3>
            <p className="text-gray-500 mt-2">Manage all registered users.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="text-xl font-bold text-green-600">News</h3>
            <p className="text-gray-500 mt-2">Add or update news articles.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="text-xl font-bold text-green-600">Analytics</h3>
            <p className="text-gray-500 mt-2">Track views & likes easily.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
