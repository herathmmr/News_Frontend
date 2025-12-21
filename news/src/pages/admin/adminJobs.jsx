import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBuilding, FaUserTie, FaCalendarAlt, FaMapMarkerAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdWork } from "react-icons/md";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [jobsLoaded, setJobsLoaded] = useState(false);
  const [filter, setFilter] = useState("all"); // all, government, private
  const [showExpired, setShowExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [jobsLoaded, showExpired]);

  const fetchJobs = async () => {
    const token = localStorage.getItem("token");
    try {
      let url = "http://localhost:3005/api/jobs";
      if (showExpired) {
        url = "http://localhost:3005/api/jobs/expired";
      }
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3005/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(jobs.filter((job) => job._id !== id));
        setJobsLoaded(!jobsLoaded);
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete the job. Please try again.");
      }
    }
  };

  const toggleJobStatus = async (job) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3005/api/jobs/${job._id}`,
        { isActive: !job.isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobsLoaded(!jobsLoaded);
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    return job.category === filter;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = (closingDate) => {
    return new Date(closingDate) < new Date();
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <MdWork className="text-emerald-600" />
              Manage Jobs
            </h2>
            <p className="text-gray-500 mt-1">Create and manage job postings</p>
          </div>
          
          <Link
            to="/admin/jobs/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-semibold shadow-lg shadow-emerald-200"
          >
            <CiCirclePlus className="text-xl" />
            Add New Job
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-gray-800 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Jobs
            </button>
            <button
              onClick={() => setFilter("government")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                filter === "government"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaBuilding className="text-xs" />
              Government
            </button>
            <button
              onClick={() => setFilter("private")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                filter === "private"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaUserTie className="text-xs" />
              Private
            </button>
          </div>

          <button
            onClick={() => setShowExpired(!showExpired)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 border ${
              showExpired
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {showExpired ? <FaEyeSlash /> : <FaEye />}
            {showExpired ? "Show Active" : "Show Expired"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500">Total Jobs</p>
            <p className="text-2xl font-bold text-gray-800">{jobs.length}</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-sm text-emerald-600">Government</p>
            <p className="text-2xl font-bold text-emerald-700">
              {jobs.filter(j => j.category === "government").length}
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="text-sm text-indigo-600">Private</p>
            <p className="text-2xl font-bold text-indigo-700">
              {jobs.filter(j => j.category === "private").length}
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-sm text-orange-600">Active</p>
            <p className="text-2xl font-bold text-orange-700">
              {jobs.filter(j => j.isActive && !isExpired(j.closingDate)).length}
            </p>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto shadow-lg rounded-2xl border border-gray-100">
          <table className="table-auto border-collapse w-full text-left bg-white">
            <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <tr>
                <th className="px-4 py-4 font-semibold">ID</th>
                <th className="px-4 py-4 font-semibold">Title</th>
                <th className="px-4 py-4 font-semibold">Company</th>
                <th className="px-4 py-4 font-semibold">Category</th>
                <th className="px-4 py-4 font-semibold">Closing Date</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4 text-gray-600">#{job.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {job.image && (
                        <img
                          src={job.image}
                          alt={job.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-800 line-clamp-1">
                        {job.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{job.company}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      job.category === "government"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}>
                      {job.category === "government" ? <FaBuilding /> : <FaUserTie />}
                      {job.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className={`text-sm ${isExpired(job.closingDate) ? 'text-red-400' : 'text-gray-400'}`} />
                      <span className={isExpired(job.closingDate) ? 'text-red-600' : 'text-gray-600'}>
                        {formatDate(job.closingDate)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleJobStatus(job)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        job.isActive && !isExpired(job.closingDate)
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {isExpired(job.closingDate) ? 'Expired' : job.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          navigate("/admin/jobs/edit", { state: job });
                        }}
                        className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border border-gray-100"
            >
              {/* Header */}
              <div className="flex gap-4 mb-4">
                {job.image && (
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1 line-clamp-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{job.company}</p>
                </div>
                <span className="text-xs text-gray-400">#{job.id}</span>
              </div>

              {/* Category & Status */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  job.category === "government"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-indigo-100 text-indigo-700"
                }`}>
                  {job.category === "government" ? <FaBuilding /> : <FaUserTie />}
                  {job.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  job.isActive && !isExpired(job.closingDate)
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {isExpired(job.closingDate) ? 'Expired' : job.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                {job.location && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className={isExpired(job.closingDate) ? 'text-red-400' : 'text-gray-400'} />
                  <span className={isExpired(job.closingDate) ? 'text-red-600' : ''}>
                    Closes: {formatDate(job.closingDate)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    navigate("/admin/jobs/edit", { state: job });
                  }}
                  className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdWork className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Jobs Found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first job posting</p>
            <Link
              to="/admin/jobs/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-semibold"
            >
              <CiCirclePlus className="text-xl" />
              Add First Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
