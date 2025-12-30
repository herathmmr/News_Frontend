import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { FaFacebook, FaWhatsapp, FaArrowLeft, FaShare, FaBookmark, FaCalendarAlt, FaUser, FaClock } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdArticle, MdCategory } from "react-icons/md";

export default function NewsOver() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const newsFromState = location.state?.news;
  
  const [news, setNews] = useState(newsFromState || null);
  const [loading, setLoading] = useState(!newsFromState);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch from API if news wasn't passed via state
    if (!newsFromState && id) {
      fetchNews();
    }
  }, [id, newsFromState]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/news/${id}`);
      setNews(response.data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setError("Article not found or an error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    return Math.max(1, Math.round(((content || "").split(/\s+/).filter(Boolean).length) / 200));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: `Check out this article: ${news.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // Category color mapping
  const getCategoryColors = (category) => {
    const colors = {
      politics: { gradient: 'from-red-600 via-red-700 to-rose-700', bg: 'bg-red-100', text: 'text-red-600', badge: 'bg-red-500/20 text-red-100' },
      sports: { gradient: 'from-green-600 via-green-700 to-emerald-700', bg: 'bg-green-100', text: 'text-green-600', badge: 'bg-green-500/20 text-green-100' },
      technology: { gradient: 'from-blue-600 via-blue-700 to-indigo-700', bg: 'bg-blue-100', text: 'text-blue-600', badge: 'bg-blue-500/20 text-blue-100' },
      entertainment: { gradient: 'from-purple-600 via-purple-700 to-violet-700', bg: 'bg-purple-100', text: 'text-purple-600', badge: 'bg-purple-500/20 text-purple-100' },
      business: { gradient: 'from-amber-600 via-amber-700 to-orange-700', bg: 'bg-amber-100', text: 'text-amber-600', badge: 'bg-amber-500/20 text-amber-100' },
      default: { gradient: 'from-gray-600 via-gray-700 to-slate-700', bg: 'bg-gray-100', text: 'text-gray-600', badge: 'bg-gray-500/20 text-gray-100' }
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-red-600 font-medium">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-red-50">
        <div className="text-center p-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdArticle className="text-4xl text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
          <p className="text-gray-500 mb-6">{error || "The article you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const categoryColors = getCategoryColors(news.category);
  const readingTime = getReadingTime(news.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section with Image */}
      <div className={`relative bg-gradient-to-r ${categoryColors.gradient}`}>
        {news.image && (
          <div className="absolute inset-0">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
          </div>
        )}
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-6 font-medium"
          >
            <FaArrowLeft />
            Back to News
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Article Image Card */}
            {news.image && (
              <div className="hidden lg:block w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 flex-shrink-0">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${categoryColors.badge}`}>
                  <MdCategory />
                  {news.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                {news.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-2 text-white/90 text-lg mb-4">
                <FaUser />
                <span className="font-medium">By {news.author}</span>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-white/80">
                {news.date && (
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>{formatDate(news.date)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex lg:flex-col gap-3 mt-4 lg:mt-0">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition font-medium backdrop-blur-sm"
              >
                <FaShare />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition font-medium backdrop-blur-sm">
                <FaBookmark />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MdArticle className={categoryColors.text} />
                Article
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                  {news.content || "No content available. Please check back later for updates on this article."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Reading Time Card */}
            <div className={`rounded-2xl p-6 border-2 ${categoryColors.bg} border-opacity-50`}>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-white`}>
                  <FaClock className={`text-2xl ${categoryColors.text}`} />
                </div>
                <h3 className={`text-lg font-bold ${categoryColors.text}`}>{readingTime} Min Read</h3>
                <p className="text-gray-600 text-sm mt-1">Estimated reading time</p>
              </div>
            </div>

            {/* Article Details Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Article Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${categoryColors.bg}`}>
                    <MdCategory className={categoryColors.text} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold text-gray-800 capitalize">{news.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${categoryColors.bg}`}>
                    <FaUser className={categoryColors.text} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Author</p>
                    <p className="font-semibold text-gray-800">{news.author}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${categoryColors.bg}`}>
                    <FaCalendarAlt className={categoryColors.text} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Published Date</p>
                    <p className="font-semibold text-gray-800">{news.date ? formatDate(news.date) : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Share Article</h3>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on Facebook"
                  className="w-12 h-12 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook className="text-xl" />
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(news?.title || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on X"
                  className="w-12 h-12 rounded-xl bg-black text-white hover:bg-neutral-800 transition flex items-center justify-center"
                  aria-label="Share on X"
                >
                  <FaXTwitter className="text-xl" />
                </a>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent((news?.title || "") + " " + currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on WhatsApp"
                  className="w-12 h-12 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition flex items-center justify-center"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp className="text-xl" />
                </a>
              </div>
            </div>

            {/* Back Link */}
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <Link
                to="/home"
                className={`inline-flex items-center gap-2 font-semibold ${categoryColors.text} hover:underline`}
              >
                <FaArrowLeft />
                Back to News
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}