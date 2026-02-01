import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewsCard from "../../../../components/newsCard";
import LanguageSwitcher from "../../../../components/LanguageSwitcher";
import { 
  FaSearch, FaNewspaper, FaBuilding, FaUserTie, FaMapMarkerAlt, 
  FaCalendarAlt, FaArrowRight, FaClock, FaFire, FaTrophy,
  FaFootballBall, FaBriefcase, FaFilm, FaLandmark, FaLaptop
} from "react-icons/fa";
import { MdWork, MdTrendingUp } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

const CATEGORY_KEYS = ["all", "sports", "business", "entertainment", "politics", "technology"];

const CATEGORY_ICONS = {
  sports: FaFootballBall,
  business: FaBriefcase,
  entertainment: FaFilm,
  politics: FaLandmark,
  technology: FaLaptop
};

const CATEGORY_COLORS = {
  sports: "from-green-500 to-emerald-600",
  business: "from-blue-500 to-indigo-600",
  entertainment: "from-purple-500 to-pink-600",
  politics: "from-red-500 to-rose-600",
  technology: "from-cyan-500 to-blue-600"
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState("loading");
  const [news, setNews] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("news");

  useEffect(() => {
    if (state === "loading") {
      axios
        .get("http://localhost:3005/api/news")
        .then((res) => {
          setNews(res.data);
          setState("success");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error fetching news!");
          setState("error");
        });
    }
  }, [state]);

  // Fetch jobs
  useEffect(() => {
    axios
      .get("http://localhost:3005/api/jobs/active")
      .then((res) => {
        setJobs(res.data);
        setJobsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setJobsLoading(false);
      });
  }, []);

  const filteredNews = useMemo(() => {
    const term = search.toLowerCase();
    return news.filter((item) => {
      const matchesTerm =
        item.title?.toLowerCase().includes(term) ||
        item.content?.toLowerCase().includes(term) ||
        item.author?.toLowerCase().includes(term);
      const matchesCategory =
        category === "all" || item.category?.toLowerCase() === category.toLowerCase();
      return matchesTerm && matchesCategory;
    });
  }, [news, search, category]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(i18n.language === 'si' ? 'si-LK' : 'en-US', {
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

  const featuredNews = news.slice(0, 1)[0];
  const trendingNews = news.slice(1, 4);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-200 to-cyan-200 opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 opacity-30 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative p-6 sm:p-10 lg:p-12">
            {/* Language Switcher */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
              <LanguageSwitcher />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              {/* Left Content */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                  <HiSparkles className="text-yellow-400" />
                  <span className="text-sm font-medium text-white/90">{t('home.yourDailyDigest')}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  {t('home.stayInformed')}
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t('home.stayAhead')}
                  </span>
                </h1>
                
                <p className="text-lg text-white/70 max-w-xl">
                  {t('home.heroDescription')}
                </p>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t('home.searchPlaceholder')}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition"
                    />
                  </div>
                  <button className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300">
                    {t('common.search')}
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <FaNewspaper className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{news.length}+</p>
                      <p className="text-xs text-white/60">{t('common.articles')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <MdWork className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{jobs.length}+</p>
                      <p className="text-xs text-white/60">{t('common.activeJobs')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <MdTrendingUp className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">24/7</p>
                      <p className="text-xs text-white/60">{t('common.updates')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Featured News Card */}
              {featuredNews && (
                <div className="lg:w-96 xl:w-[420px]">
                  <Link to={`/newsov/${featuredNews._id}`} state={{ news: featuredNews }} className="block group">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={featuredNews.image || "https://via.placeholder.com/400x300"}
                        alt={featuredNews.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full mb-3">
                          <FaFire className="text-xs" />
                          {t('home.featured')}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition">
                          {featuredNews.title}
                        </h3>
                        <p className="text-white/70 text-sm line-clamp-2">{featuredNews.content}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 p-2 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("news")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "news"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaNewspaper />
            {t('tabs.news')}
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "jobs"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MdWork />
            {t('tabs.jobs')}
          </button>
        </div>

        {/* News Section */}
        {activeTab === "news" && (
          <div className="space-y-8">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORY_KEYS.map((catKey) => {
                const Icon = CATEGORY_ICONS[catKey];
                return (
                  <button
                    key={catKey}
                    onClick={() => setCategory(catKey)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      category === catKey
                        ? `bg-gradient-to-r ${CATEGORY_COLORS[catKey] || "from-blue-500 to-purple-600"} text-white shadow-lg`
                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    {Icon && <Icon className="text-xs" />}
                    {t(`categories.${catKey}`)}
                  </button>
                );
              })}
            </div>

            {/* Trending Section */}
            {trendingNews.length > 0 && category === "all" && !search && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <FaTrophy className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{t('trending.title')}</h2>
                    <p className="text-sm text-gray-500">{t('trending.subtitle')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {trendingNews.map((article, index) => (
                    <Link
                      key={article._id}
                      to={`/newsov/${article._id}`}
                      state={{ news: article }}
                      className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition"
                    >
                      <span className="text-4xl font-bold text-gray-200 group-hover:text-blue-500 transition">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${
                          article.category === "Sports" ? "bg-green-100 text-green-700" :
                          article.category === "Business" ? "bg-blue-100 text-blue-700" :
                          article.category === "Entertainment" ? "bg-purple-100 text-purple-700" :
                          article.category === "Politics" ? "bg-red-100 text-red-700" :
                          article.category === "Technology" ? "bg-cyan-100 text-cyan-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {article.category}
                        </span>
                        <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">
                          {article.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {state === "loading" &&
                Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="animate-pulse rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-5 bg-gray-200 rounded w-full"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-10 bg-gray-200 rounded-xl"></div>
                    </div>
                  </div>
                ))}

              {state === "error" && (
                <div className="col-span-full">
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaNewspaper className="text-3xl text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('errors.failedToLoad')}</h3>
                    <p className="text-gray-500 mb-6">{t('errors.somethingWrong')}</p>
                    <button
                      onClick={() => setState("loading")}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg"
                    >
                      {t('common.tryAgain')}
                    </button>
                  </div>
                </div>
              )}

              {state === "success" && filteredNews.length === 0 && (
                <div className="col-span-full">
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaSearch className="text-3xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('errors.noResults')}</h3>
                    <p className="text-gray-500">{t('errors.adjustSearch')}</p>
                  </div>
                </div>
              )}

              {state === "success" &&
                filteredNews.map((article) => (
                  <NewsCard key={article._id || article.id} news={article} />
                ))}
            </div>
          </div>
        )}

        {/* Jobs Section */}
        {activeTab === "jobs" && (
          <div className="space-y-8">
            {/* Jobs Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Government Jobs Card */}
              <Link
                to="/jobs/government"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaBuilding className="text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t('jobs.governmentJobs')}</h3>
                  <p className="text-emerald-100 mb-6">{t('jobs.governmentDescription')}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">
                      {jobs.filter(j => j.category === "government").length}
                      <span className="text-lg font-normal text-emerald-200 ml-2">{t('common.positions')}</span>
                    </span>
                    <span className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                      {t('common.browse')} <FaArrowRight />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Private Jobs Card */}
              <Link
                to="/jobs/private"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaUserTie className="text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t('jobs.privateJobs')}</h3>
                  <p className="text-indigo-100 mb-6">{t('jobs.privateDescription')}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">
                      {jobs.filter(j => j.category === "private").length}
                      <span className="text-lg font-normal text-indigo-200 ml-2">{t('common.positions')}</span>
                    </span>
                    <span className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                      {t('common.browse')} <FaArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Latest Jobs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <MdWork className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{t('jobs.latestOpportunities')}</h2>
                    <p className="text-sm text-gray-500">{t('jobs.freshPostings')}</p>
                  </div>
                </div>
                <Link
                  to="/jobs/government"
                  className="hidden sm:flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition"
                >
                  {t('common.viewAll')} <FaArrowRight />
                </Link>
              </div>

              {jobsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="animate-pulse p-4 border border-gray-100 rounded-xl">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MdWork className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('jobs.noJobs')}</h3>
                  <p className="text-gray-500">{t('jobs.checkBackLater')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobs.slice(0, 6).map((job) => {
                    const daysRemaining = getDaysRemaining(job.closingDate);
                    const isUrgent = daysRemaining <= 7 && daysRemaining > 0;

                    return (
                      <Link
                        key={job._id}
                        to={`/jobs/${job._id}`}
                        className="group p-4 border border-gray-100 rounded-xl hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex gap-4">
                          {job.image ? (
                            <img
                              src={job.image}
                              alt={job.title}
                              className="w-14 h-14 rounded-xl object-cover"
                            />
                          ) : (
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                              job.category === "government"
                                ? "bg-emerald-100"
                                : "bg-indigo-100"
                            }`}>
                              {job.category === "government" ? (
                                <FaBuilding className="text-emerald-600 text-xl" />
                              ) : (
                                <FaUserTie className="text-indigo-600 text-xl" />
                              )}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-emerald-600 transition">
                                {job.title}
                              </h3>
                              {isUrgent && (
                                <span className="flex-shrink-0 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                                  {daysRemaining}{t('jobs.daysLeft')}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-1">{job.company}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                              {job.location && (
                                <span className="flex items-center gap-1">
                                  <FaMapMarkerAlt />
                                  {job.location}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <FaCalendarAlt />
                                {formatDate(job.closingDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            job.category === "government"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}>
                            {job.category}
                          </span>
                          <span className="text-emerald-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            {t('common.apply')} <FaArrowRight className="text-xs" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Mobile View All Button */}
              <Link
                to="/jobs/government"
                className="sm:hidden flex items-center justify-center gap-2 mt-6 w-full py-3 bg-emerald-50 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-100 transition"
              >
                {t('common.viewAll')} <FaArrowRight />
              </Link>
            </div>

            {/* Job Tips Section */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{t('jobs.dreamJob')}</h3>
                  <p className="text-slate-300">{t('jobs.dreamJobDescription')}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/jobs/government"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-semibold transition shadow-lg"
                  >
                    <FaBuilding />
                    {t('jobs.governmentJobs')}
                  </Link>
                  <Link
                    to="/jobs/private"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition"
                  >
                    <FaUserTie />
                    {t('jobs.privateJobs')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}