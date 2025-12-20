import { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function NewsCard({ news }) {
  const [likes, setLikes] = useState(news.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Fetch like status on component mount
  useEffect(() => {
    if (token) {
      fetchLikeStatus();
    }
  }, [news._id]);

  const fetchLikeStatus = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/newslike/${news._id}/like-status`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
        setIsLiked(data.isLiked);
      }
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

  const handleLike = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3005/api/newslike/${news._id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Network response was not ok");
      }

      const data = await res.json();
      console.log(data); // Log the response data

      if (data.likes !== undefined) {
        setLikes(data.likes);
        setIsLiked(data.isLiked);
      } else {
        console.error("Likes not returned in response");
      }
    } catch (error) {
      console.error("Like failed:", error);
      alert(error.message || 'Failed to like news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}></div>

          <div className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden mx-auto">
            <div className="p-6 sm:p-8 text-center">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-red-50 text-red-600">
                <FaThumbsUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Please sign in to like</h3>
              <p className="text-sm text-slate-500 mb-6 px-2">You need an account to like articles. Sign in to save favorites and interact with content.</p>

              <div className="flex gap-3 justify-center px-2">
                <button
                  onClick={() => { setShowLoginModal(false); navigate('/login'); }}
                  className="inline-flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Sign in
                </button>

                <button
                  onClick={() => setShowLoginModal(false)}
                  className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
      className="
        group relative overflow-hidden rounded-2xl bg-white
        border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-0.5
        transition-all duration-300 max-w-sm w-full m-4 flex flex-col
      "
    >
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400"></div>

      {/* Image */}
      <div className="relative h-48 md:h-52 overflow-hidden rounded-t-2xl">
        <img
          src={news.image || "bg.png"}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
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
          disabled={loading}
          className={`
            absolute top-3 right-3 z-10
            flex items-center gap-1.5 rounded-full
            bg-white/95 border shadow-sm
            px-3 py-1.5 transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isLiked 
              ? 'border-red-500 text-red-600 bg-red-50' 
              : 'border-gray-200 text-gray-700 hover:text-red-600 hover:border-red-300'
            }
          `}
        >
          <FaThumbsUp className={`text-sm transition-transform ${isLiked ? 'scale-110' : ''}`} />
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
            to={`/newsov/${news._id}`}
            state={{ news }}
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
    </>
  );
}