const samplearr = [
  {
    id: 1,
    title: "Sri Lanka Wins Asia Cup 2025",
    category: "Sports",
    author: "Sports Desk",
    date: new Date("2025-08-15"),
  },
  {
    id: 2,
    title: "Stock Market Hits Record High",
    category: "Business",
    author: "Business Insider",
    date: new Date("2025-08-20"),
  },
  {
    id: 3,
    title: "New Movie Breaks Box Office Records",
    category: "Entertainment",
    author: "Entertainment Today",
    date: new Date("2025-08-25"),
  },
];

import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminNews() {
  const [news, setNews] = useState(samplearr);

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
  }, []);  //dependencies arr

async function handleDelete(id) {
  if (window.confirm("Are you sure you want to delete this news article?")) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3005/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      //root
      setNews(news.filter((article) => article.id !== id));
      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the article. Please try again.");
    }
  }
}


  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Manage News Articles
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
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
                  <Link
                    to={`/admin/news/edit/${article.id}`}
                    className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </Link>
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

      {/* Add Button */}
      <Link to="/admin/news/add">
        <CiCirclePlus className="text-[60px] text-blue-600 fixed right-8 bottom-8 cursor-pointer hover:scale-110 transition-transform duration-150 drop-shadow-lg" />
      </Link>
    </div>
  );
}
