import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NewsCard({ news }) {
  const [likes, setLikes] = useState(news.likes || 0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl bg-white
        border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-0.5
        transition-all duration-300 max-w-sm w-full m-4 flex flex-col
      "
    >
      {/* Decorative top bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400"></div>

      {/* Image */}
      <div className="relative h-48 md:h-52 overflow-hidden rounded-t-2xl">
        <img
          src={news.image || "bg.png"}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image overlay gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

        {/* Category badge */}
        <span
          className="
            absolute bottom-3 left-3 z-10
            bg-white/90 backdrop-blur px-3 py-1 rounded-full
            text-xs font-semibold text-red-700 shadow-sm border border-red-100
          "
        >
          {news.category}
        </span>

        {/* Like button */}
        <button
          onClick={handleLike}
          className="
            absolute top-3 right-3 z-10
            flex items-center gap-1.5 rounded-full
            bg-white/95 border border-gray-200 shadow-sm
            px-3 py-1.5 text-gray-700 hover:text-red-600
            transition-colors
          "
          aria-label="Like"
        >
          <FaThumbsUp className="text-sm" />
          <span className="text-xs font-medium">{likes}</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2
          className="
            text-xl font-extrabold text-slate-900 mb-2 line-clamp-2
            group-hover:text-red-700 transition-colors
          "
        >
          {news.title}
        </h2>

        <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
          <span className="italic font-medium">By {news.author}</span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-5">
          {news.content}
        </p>

        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <span className="text-xs text-gray-500">
            {new Date(news.date).toLocaleDateString()}
          </span>

          <Link
            to={`/newsov/${news.id}`}
            state={{ news }} // pass whole object
            className="
              inline-flex items-center justify-center
              bg-red-600 text-white text-sm font-semibold
              px-4 py-2 rounded-lg hover:bg-red-700
              transition-colors duration-300
            "
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}