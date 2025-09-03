import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

export default function ErrorNotFound() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-gray-100 px-6">
      <div className="text-center bg-white shadow-xl rounded-2xl p-10 max-w-lg">
      
        <h1 className="text-7xl font-extrabold text-red-700 mb-4">404</h1>

        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Page Not Found
        </h2>

       
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

      
        <div className="flex items-center mb-6 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search news..."
            className="flex-grow px-4 py-2 outline-none"
          />
          <button className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition">
            <FaSearch />
          </button>
        </div>

       
        <Link
          to="/home"
          className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
        >
          <FaHome className="mr-2" /> Go Back Home
        </Link>
      </div>
    </section>
  );
}
