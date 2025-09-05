import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NewsCard({ news }) {
  const [likes, setLikes] = useState(news.likes || 0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="bg-gradient-to-r from-red-50 to-gray-100 
    sm:max-w-sm rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] 
    duration-300 max-w-sm w-full m-4 flex flex-col justify-between">
      <img
        src={news.image || "bg.png"}
        alt={news.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      <div className="p-6 flex flex-col flex-1 bg-white rounded-b-2xl">
        <h2 className="text-2xl font-extrabold text-red-700 mb-3 line-clamp-2">
          {news.title}
        </h2>

        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
            {news.category}
          </span>
          <span className="italic font-medium">By {news.author}</span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-6">
          {news.content}
        </p>

        <Link
          to={`/newsov/${news.id}`}
          state={{ news }} // pass whole object 
          className="inline-block bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 mb-4 self-start"
        >
          View More
        </Link>

        <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-4 mt-auto">
          <span className="font-medium">
            {new Date(news.date).toLocaleDateString()}
          </span>
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaThumbsUp className="text-base" />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
