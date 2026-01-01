import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaBookmark, FaNewspaper, FaTrash, FaArrowRight, FaBuilding, 
  FaUserTie, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaSearch,
  FaRegBookmark, FaFilter, FaTimes
} from "react-icons/fa";
import { MdWork, MdArticle } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import toast from "react-hot-toast";

export default function SaveList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [savedNews, setSavedNews] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  useEffect(() => {
    loadSavedItems();
  }, []);

  const loadSavedItems = () => {
    setLoading(true);
    try {
      // Load from localStorage
      const newsItems = JSON.parse(localStorage.getItem("savedNews") || "[]");
      const jobItems = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      setSavedNews(newsItems);
      setSavedJobs(jobItems);
    } catch (error) {
      console.error("Error loading saved items:", error);
      setSavedNews([]);
      setSavedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveNews = (newsId) => {
    setItemToDelete({ type: 'news', id: newsId });
    setShowDeleteModal(true);
  };

  const handleRemoveJob = (jobId) => {
    setItemToDelete({ type: 'job', id: jobId });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'news') {
      const updatedNews = savedNews.filter(news => news._id !== itemToDelete.id);
      localStorage.setItem("savedNews", JSON.stringify(updatedNews));
      setSavedNews(updatedNews);
      toast.success("News removed from saved list");
    } else {
      const updatedJobs = savedJobs.filter(job => job._id !== itemToDelete.id);
      localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
      setSavedJobs(updatedJobs);
      toast.success("Job removed from saved list");
    }

    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (closingDate) => {
    const today = new Date();
    const closing = new Date(closingDate);
    const diffTime = closing - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getReadingTime = (content) => {
    return Math.max(1, Math.round(((content || "").split(/\s+/).filter(Boolean).length) / 200));
  };

  // Filter items based on search
  const filteredNews = savedNews.filter(news => 
    news.title?.toLowerCase().includes(search.toLowerCase()) ||
    news.author?.toLowerCase().includes(search.toLowerCase()) ||
    news.category?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredJobs = savedJobs.filter(job => 
    job.title?.toLowerCase().includes(search.toLowerCase()) ||
    job.company?.toLowerCase().includes(search.toLowerCase()) ||
    job.location?.toLowerCase().includes(search.toLowerCase())
  );

  const totalSaved = savedNews.length + savedJobs.length;
  const displayedItems = activeTab === "all" 
    ? [...filteredNews.map(n => ({...n, itemType: 'news'})), ...filteredJobs.map(j => ({...j, itemType: 'job'}))]
    : activeTab === "news" 
    ? filteredNews 
    : filteredJobs;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaBookmark className="text-4xl text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Sign in to access your saves</h2>
          <p className="text-gray-500 mb-6">
            Create an account or sign in to save news articles and job postings for later.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition shadow-lg"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 opacity-30 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-6 sm:space-y-8">
        
        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-2xl">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="relative p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full mb-4">
                  <HiSparkles className="text-yellow-300" />
                  <span className="text-sm font-medium">Your Personal Collection</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                  My Save List
                </h1>
                <p className="text-lg text-white/80 max-w-xl mb-6">
                  All your bookmarked articles and job opportunities in one place.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-xl">
                    <FaNewspaper className="text-xl" />
                    <div>
                      <p className="text-2xl font-bold">{savedNews.length}</p>
                      <p className="text-xs text-white/70">Saved News</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-xl">
                    <MdWork className="text-xl" />
                    <div>
                      <p className="text-2xl font-bold">{savedJobs.length}</p>
                      <p className="text-xs text-white/70">Saved Jobs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-xl">
                    <FaBookmark className="text-xl" />
                    <div>
                      <p className="text-2xl font-bold">{totalSaved}</p>
                      <p className="text-xs text-white/70">Total Saved</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Illustration */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm rotate-6"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-3xl -rotate-3"></div>
                  <div className="absolute inset-0 bg-white/30 rounded-3xl flex items-center justify-center">
                    <FaBookmark className="text-6xl text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved items..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-gray-100">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaBookmark className="text-sm" />
              <span className="hidden sm:inline">All</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/20">
                {totalSaved}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === "news"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaNewspaper className="text-sm" />
              <span className="hidden sm:inline">News</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/20">
                {savedNews.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === "jobs"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MdWork className="text-sm" />
              <span className="hidden sm:inline">Jobs</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/20">
                {savedJobs.length}
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="animate-pulse bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : totalSaved === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaRegBookmark className="text-4xl text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Your save list is empty</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start exploring and save articles or job postings that interest you. They'll appear here for easy access.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/home"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition shadow-lg"
              >
                <FaNewspaper />
                Browse News
              </Link>
              <Link
                to="/jobs/government"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition shadow-lg"
              >
                <MdWork />
                Explore Jobs
              </Link>
            </div>
          </div>
        ) : displayedItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <>
            {/* News Section */}
            {(activeTab === "all" || activeTab === "news") && filteredNews.length > 0 && (
              <div className="space-y-4">
                {activeTab === "all" && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <FaNewspaper className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Saved News</h2>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">
                      {filteredNews.length}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredNews.map((news) => (
                    <div
                      key={news._id}
                      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={news.image || "https://via.placeholder.com/400x300"}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Category Badge */}
                        <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                          {news.category}
                        </span>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveNews(news._id)}
                          className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-lg"
                          title="Remove from saved"
                        >
                          <FaTrash className="text-sm" />
                        </button>

                        {/* Saved Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                          <FaBookmark className="text-xs" />
                          Saved
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                          {news.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                          {news.content}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                          <span>By {news.author}</span>
                          <div className="flex items-center gap-1">
                            <FaClock />
                            <span>{getReadingTime(news.content)} min read</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <FaCalendarAlt />
                            {news.date ? formatDate(news.date) : 'N/A'}
                          </span>
                          <Link
                            to={`/newsov/${news._id}`}
                            state={{ news }}
                            className="flex items-center gap-1 text-blue-600 font-semibold text-sm hover:gap-2 transition-all"
                          >
                            Read <FaArrowRight className="text-xs" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jobs Section */}
            {(activeTab === "all" || activeTab === "jobs") && filteredJobs.length > 0 && (
              <div className="space-y-4">
                {activeTab === "all" && (
                  <div className="flex items-center gap-3 mt-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <MdWork className="text-white text-lg" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Saved Jobs</h2>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg">
                      {filteredJobs.length}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredJobs.map((job) => {
                    const daysRemaining = getDaysRemaining(job.closingDate);
                    const isExpired = daysRemaining < 0;
                    const isUrgent = daysRemaining <= 7 && daysRemaining > 0;
                    const isGovernment = job.category === "government";

                    return (
                      <div
                        key={job._id}
                        className={`group bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                          isExpired ? 'border-gray-200 opacity-75' : 'border-gray-100'
                        }`}
                      >
                        {/* Header */}
                        <div className={`relative p-5 ${
                          isGovernment 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                            : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                        } text-white`}>
                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveJob(job._id)}
                            className="absolute top-3 right-3 p-2 bg-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all backdrop-blur-sm"
                            title="Remove from saved"
                          >
                            <FaTrash className="text-sm" />
                          </button>

                          {/* Saved Badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                            <FaBookmark className="text-xs" />
                            Saved
                          </div>

                          <div className="flex items-start gap-4 mt-6">
                            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                              {job.image ? (
                                <img src={job.image} alt={job.title} className="w-full h-full object-cover rounded-xl" />
                              ) : isGovernment ? (
                                <FaBuilding className="text-2xl" />
                              ) : (
                                <FaUserTie className="text-2xl" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-lg line-clamp-1">{job.title}</h3>
                              <p className="text-white/80 text-sm">{job.company}</p>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.location && (
                              <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                                <FaMapMarkerAlt />
                                {job.location}
                              </span>
                            )}
                            {job.salary && (
                              <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                                💰 {job.salary}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                            {job.description || "No description available"}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              {isExpired ? (
                                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-lg">
                                  Expired
                                </span>
                              ) : isUrgent ? (
                                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-lg animate-pulse">
                                  {daysRemaining} days left
                                </span>
                              ) : (
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                  <FaCalendarAlt />
                                  Due: {formatDate(job.closingDate)}
                                </span>
                              )}
                            </div>
                            <Link
                              to={`/jobs/${job._id}`}
                              className={`flex items-center gap-1 font-semibold text-sm hover:gap-2 transition-all ${
                                isGovernment ? 'text-emerald-600' : 'text-indigo-600'
                              }`}
                            >
                              View <FaArrowRight className="text-xs" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Tips Section */}
        {totalSaved > 0 && (
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white mt-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">📌 Quick Tip</h3>
                <p className="text-slate-300">
                  Click the bookmark icon on any news article or job posting to save it here for later. Your saves are stored locally and will persist across sessions.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/home"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition"
                >
                  <FaNewspaper />
                  Browse More
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowDeleteModal(false)}
          ></div>

          <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
            
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-red-50">
                <FaTrash className="w-6 h-6 text-red-500" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">Remove from Saved?</h3>
              <p className="text-sm text-gray-500 mb-6">
                This {itemToDelete?.type} will be removed from your save list. You can always save it again later.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={confirmDelete}
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
                >
                  <FaTrash className="text-sm" />
                  Remove
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
