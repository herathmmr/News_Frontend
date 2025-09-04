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

import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminNews() {
  const [news, setNews] = useState(samplearr);

  return (
    <div className="w-full h-full">
      <table className="table-auto border-collapse border border-gray-400 w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">id</th>
            <th className="border px-4 py-2">title</th>
            <th className="border px-4 py-2">category</th>
            <th className="border px-4 py-2">author</th>
            <th className="border px-4 py-2">date</th>
          </tr>
        </thead>
        <tbody>
          {news.map((article) => (
            <tr key={article.id}>
              <td className="border px-4 py-2">{article.id}</td>
              <td className="border px-4 py-2">{article.title}</td>
              <td className="border px-4 py-2">{article.category}</td>
              <td className="border px-4 py-2">{article.author}</td>
              <td className="border px-4 py-2">
                {new Date(article.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/admin/news/add">
        <CiCirclePlus className="text-[50px] text-blue-600 absolute right-6 bottom-2 cursor-pointer hover:scale-110 transition-transform duration-100" />
      </Link>
    </div>
  );
}
