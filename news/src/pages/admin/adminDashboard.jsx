import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  FaUsers, FaNewspaper, FaBuilding, FaUserTie, FaArrowRight, 
  FaChartLine, FaCalendarAlt, FaEye, FaClock, FaCheckCircle,
  FaFootballBall, FaBriefcase, FaFilm, FaLandmark, FaLaptop
} from "react-icons/fa";
import { MdWork, MdTrendingUp, MdBusinessCenter } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: { total: 0, admins: 0, regular: 0 },
    news: { total: 0, byCategory: {} },
    jobs: { total: 0, government: 0, private: 0, active: 0, expired: 0 }
  });
  const [recentNews, setRecentNews] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");
    try {
      // Fetch all data in parallel
      const [usersRes, newsRes, jobsRes] = await Promise.all([
        axios.get("http://localhost:3005/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: [] })),
        axios.get("http://localhost:3005/api/news", {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: [] })),
        axios.get("http://localhost:3005/api/jobs", {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: [] }))
      ]);

      const users = usersRes.data || [];
      const news = newsRes.data || [];
      const jobs = jobsRes.data || [];

      // Calculate user stats
      const userStats = {
        total: users.length,
        admins: users.filter(u => u.role === "admin").length,
        regular: users.filter(u => u.role !== "admin").length
      };

      // Calculate news stats by category
      const newsCategories = {};
      news.forEach(article => {
        const cat = article.category || "Uncategorized";
        newsCategories[cat] = (newsCategories[cat] || 0) + 1;
      });

      // Calculate job stats
      const now = new Date();
      const jobStats = {
        total: jobs.length,
        government: jobs.filter(j => j.category === "government").length,
        private: jobs.filter(j => j.category === "private").length,
        active: jobs.filter(j => j.isActive && new Date(j.closingDate) >= now).length,
        expired: jobs.filter(j => new Date(j.closingDate) < now).length
      };

      setStats({
        users: userStats,
        news: { total: news.length, byCategory: newsCategories },
        jobs: jobStats
      });

      // Get recent items
      setRecentNews(news.slice(0, 5));
      setRecentJobs(jobs.slice(0, 5));

    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Sports: FaFootballBall,
      Business: FaBriefcase,
      Entertainment: FaFilm,
      Politics: FaLandmark,
      Technology: FaLaptop
    };
    return icons[category] || HiOutlineDocumentText;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Sports: "text-green-500 bg-green-100",
      Business: "text-blue-500 bg-blue-100",
      Entertainment: "text-purple-500 bg-purple-100",
      Politics: "text-red-500 bg-red-100",
      Technology: "text-cyan-500 bg-cyan-100"
    };
    return colors[category] || "text-gray-500 bg-gray-100";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Users Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Users</p>
              <h3 className="text-4xl font-bold mt-2">{stats.users.total}</h3>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-300"></span>
                  {stats.users.admins} Admins
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-200"></span>
                  {stats.users.regular} Users
                </span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaUsers className="text-2xl" />
            </div>
          </div>
          <Link to="/admin/users" className="inline-flex items-center gap-1 mt-4 text-sm text-blue-100 hover:text-white transition">
            View all users <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Total News Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total News</p>
              <h3 className="text-4xl font-bold mt-2">{stats.news.total}</h3>
              <p className="text-sm text-purple-200 mt-3">
                {Object.keys(stats.news.byCategory).length} Categories
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaNewspaper className="text-2xl" />
            </div>
          </div>
          <Link to="/admin/news" className="inline-flex items-center gap-1 mt-4 text-sm text-purple-100 hover:text-white transition">
            Manage news <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Total Jobs Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Total Jobs</p>
              <h3 className="text-4xl font-bold mt-2">{stats.jobs.total}</h3>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1">
                  <FaBuilding className="text-xs" />
                  {stats.jobs.government} Govt
                </span>
                <span className="flex items-center gap-1">
                  <FaUserTie className="text-xs" />
                  {stats.jobs.private} Private
                </span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <MdWork className="text-2xl" />
            </div>
          </div>
          <Link to="/admin/jobs" className="inline-flex items-center gap-1 mt-4 text-sm text-emerald-100 hover:text-white transition">
            Manage jobs <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Active Jobs Card */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Active Jobs</p>
              <h3 className="text-4xl font-bold mt-2">{stats.jobs.active}</h3>
              <div className="flex items-center gap-2 mt-3 text-sm">
                <span className="flex items-center gap-1 text-orange-200">
                  <FaClock className="text-xs" />
                  {stats.jobs.expired} Expired
                </span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaCheckCircle className="text-2xl" />
            </div>
          </div>
          <Link to="/admin/jobs" className="inline-flex items-center gap-1 mt-4 text-sm text-orange-100 hover:text-white transition">
            View details <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News by Category */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">News by Category</h3>
            <Link to="/admin/news" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {Object.entries(stats.news.byCategory).length > 0 ? (
              Object.entries(stats.news.byCategory).map(([category, count]) => {
                const Icon = getCategoryIcon(category);
                const colorClass = getCategoryColor(category);
                const percentage = stats.news.total > 0 ? Math.round((count / stats.news.total) * 100) : 0;
                
                return (
                  <div key={category} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                      <Icon className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-700">{category}</span>
                        <span className="text-sm text-gray-500">{count} articles</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${colorClass.split(' ')[1].replace('bg-', 'bg-').replace('100', '500')}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaNewspaper className="text-4xl mx-auto mb-2 text-gray-300" />
                <p>No news articles yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Jobs Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Jobs Distribution</h3>
            <Link to="/admin/jobs" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View All
            </Link>
          </div>
          
          {stats.jobs.total > 0 ? (
            <>
              {/* Visual Chart */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="20"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="20"
                      strokeDasharray={`${(stats.jobs.government / stats.jobs.total) * 377} 377`}
                      className="transition-all duration-500"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="20"
                      strokeDasharray={`${(stats.jobs.private / stats.jobs.total) * 377} 377`}
                      strokeDashoffset={`${-(stats.jobs.government / stats.jobs.total) * 377}`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">{stats.jobs.total}</span>
                    <span className="text-xs text-gray-500">Total Jobs</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <FaBuilding className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-700">{stats.jobs.government}</p>
                    <p className="text-xs text-emerald-600">Government</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
                    <FaUserTie className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-indigo-700">{stats.jobs.private}</p>
                    <p className="text-xs text-indigo-600">Private</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MdWork className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>No job postings yet</p>
            </div>
          )}
        </div>

        {/* Users Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Users Overview</h3>
            <Link to="/admin/users" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>

          {stats.users.total > 0 ? (
            <>
              {/* User Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                      <FaUsers className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.users.total}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      <span className="text-sm font-medium text-amber-700">Admins</span>
                    </div>
                    <p className="text-3xl font-bold text-amber-600">{stats.users.admins}</p>
                  </div>
                  <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                      <span className="text-sm font-medium text-sky-700">Regular</span>
                    </div>
                    <p className="text-3xl font-bold text-sky-600">{stats.users.regular}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">Admin Ratio</span>
                  <span className="font-medium text-gray-700">
                    {stats.users.total > 0 ? Math.round((stats.users.admins / stats.users.total) * 100) : 0}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${stats.users.total > 0 ? (stats.users.admins / stats.users.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FaUsers className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>No users registered yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaNewspaper className="text-purple-500" />
              Recent News
            </h3>
            <Link to="/admin/news/add" className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-lg hover:bg-purple-200 transition font-medium">
              + Add New
            </Link>
          </div>
          
          {recentNews.length > 0 ? (
            <div className="space-y-3">
              {recentNews.map((article, index) => (
                <div key={article._id || index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition group">
                  {article.image ? (
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                      <FaNewspaper className="text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 truncate group-hover:text-purple-600 transition">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span className={`px-2 py-0.5 rounded-full ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <span>•</span>
                      <span>{formatDate(article.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FaNewspaper className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>No recent news</p>
              <Link to="/admin/news/add" className="inline-block mt-3 text-purple-600 hover:text-purple-700 font-medium">
                Add your first article →
              </Link>
            </div>
          )}
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <MdWork className="text-emerald-500" />
              Recent Jobs
            </h3>
            <Link to="/admin/jobs/add" className="text-sm bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg hover:bg-emerald-200 transition font-medium">
              + Add New
            </Link>
          </div>
          
          {recentJobs.length > 0 ? (
            <div className="space-y-3">
              {recentJobs.map((job, index) => (
                <div key={job._id || index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition group">
                  {job.image ? (
                    <img 
                      src={job.image} 
                      alt={job.title}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                  ) : (
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      job.category === "government" ? "bg-emerald-100" : "bg-indigo-100"
                    }`}>
                      {job.category === "government" ? (
                        <FaBuilding className="text-emerald-500" />
                      ) : (
                        <FaUserTie className="text-indigo-500" />
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 truncate group-hover:text-emerald-600 transition">
                      {job.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span className={`px-2 py-0.5 rounded-full ${
                        job.category === "government" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-indigo-100 text-indigo-700"
                      }`}>
                        {job.category}
                      </span>
                      <span>•</span>
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    job.isActive && new Date(job.closingDate) >= new Date()
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {job.isActive && new Date(job.closingDate) >= new Date() ? "Active" : "Closed"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MdWork className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>No recent jobs</p>
              <Link to="/admin/jobs/add" className="inline-block mt-3 text-emerald-600 hover:text-emerald-700 font-medium">
                Post your first job →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/admin/news/add"
            className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center group-hover:scale-110 transition">
              <FaNewspaper className="text-white text-xl" />
            </div>
            <span className="text-white text-sm font-medium text-center">Add News</span>
          </Link>
          <Link
            to="/admin/jobs/add"
            className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition">
              <MdWork className="text-white text-xl" />
            </div>
            <span className="text-white text-sm font-medium text-center">Post Job</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center group-hover:scale-110 transition">
              <FaUsers className="text-white text-xl" />
            </div>
            <span className="text-white text-sm font-medium text-center">Manage Users</span>
          </Link>
          <Link
            to="/"
            className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center group-hover:scale-110 transition">
              <FaEye className="text-white text-xl" />
            </div>
            <span className="text-white text-sm font-medium text-center">View Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
