import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [newsLoaded, setNewsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3005/api/news", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setNews(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newsLoaded]);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3005/api/news/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNews(news.filter((article) => article.id !== id));
        setNewsLoaded(!newsLoaded);
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete the article. Please try again.");
      }
    }
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
          Manage News Articles
        </h2>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto border-collapse w-full text-left bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map((article) => (
                <tr
                  key={article.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{article.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {article.title}
                  </td>
                  <td className="px-4 py-3">{article.category}</td>
                  <td className="px-4 py-3">{article.author}</td>
                  <td className="px-4 py-3">
                    {new Date(article.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-3">
                    <button
                      onClick={() => {
                        navigate("/admin/news/edit", { state: article });
                      }}
                      className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {news.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-5 border border-gray-200"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1 line-clamp-2">
                    {article.title}
                  </h3>
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <span className="text-xs text-gray-500 ml-2">#{article.id}</span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Author:</span>
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Date:</span>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    navigate("/admin/news/edit", { state: article });
                  }}
                  className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {news.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No news articles found.</p>
            <Link
              to="/admin/news/add"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add First Article
            </Link>
          </div>
        )}
      </div>

      {/* Add Button - Fixed */}
      <Link to="/admin/news/add">
        <CiCirclePlus className="text-[50px] sm:text-[60px] text-blue-600 fixed right-4 sm:right-8 bottom-4 sm:bottom-8 cursor-pointer hover:scale-110 transition-transform duration-150 drop-shadow-lg bg-white rounded-full" />
      </Link>
    </div>
  );
}