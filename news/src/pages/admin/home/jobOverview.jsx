import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
  FaBuilding, FaUserTie, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, 
  FaClock, FaArrowLeft, FaShare, FaBookmark, FaCheckCircle, FaClipboardList 
} from "react-icons/fa";
import { MdWork, MdBusinessCenter } from "react-icons/md";

export default function JobOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.error("Failed to fetch job:", error);
      setError("Job not found or an error occurred");
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

  const getDaysRemaining = (closingDate) => {
    const today = new Date();
    const closing = new Date(closingDate);
    const diffTime = closing - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading Job Details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-red-50">
        <div className="text-center p-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdWork className="text-4xl text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-500 mb-6">{error || "The job you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(job.closingDate);
  const isExpired = daysRemaining < 0;
  const isUrgent = daysRemaining <= 7 && daysRemaining > 0;
  const isGovernment = job.category === "government";

  const primaryColor = isGovernment ? "emerald" : "indigo";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section with Image */}
      <div className={`relative bg-gradient-to-r ${isGovernment ? 'from-emerald-600 via-emerald-700 to-teal-700' : 'from-indigo-600 via-indigo-700 to-purple-700'}`}>
        {job.image && (
          <div className="absolute inset-0">
            <img
              src={job.image}
              alt={job.title}
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
            Back to Jobs
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Job Image Card */}
            {job.image && (
              <div className="hidden lg:block w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 flex-shrink-0">
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  isGovernment 
                    ? 'bg-emerald-500/20 text-emerald-100' 
                    : 'bg-indigo-500/20 text-indigo-100'
                }`}>
                  {isGovernment ? <FaBuilding /> : <FaUserTie />}
                  {isGovernment ? 'Government Job' : 'Private Sector'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                {job.title}
              </h1>

              {/* Company */}
              <div className="flex items-center gap-2 text-white/90 text-lg mb-4">
                {isGovernment ? <FaBuilding /> : <MdBusinessCenter />}
                <span className="font-medium">{job.company}</span>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-white/80">
                {job.location && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <span>{job.location}</span>
                  </div>
                )}
                {job.salary && (
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave />
                    <span>{job.salary}</span>
                  </div>
                )}
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
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MdWork className={`text-${primaryColor}-500`} />
                Job Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaClipboardList className={`text-${primaryColor}-500`} />
                  Requirements
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {job.requirements}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`rounded-2xl p-6 border-2 ${
              isExpired 
                ? 'bg-red-50 border-red-200' 
                : isUrgent 
                  ? 'bg-orange-50 border-orange-200' 
                  : isGovernment 
                    ? 'bg-emerald-50 border-emerald-200' 
                    : 'bg-indigo-50 border-indigo-200'
            }`}>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isExpired 
                    ? 'bg-red-100' 
                    : isUrgent 
                      ? 'bg-orange-100' 
                      : isGovernment 
                        ? 'bg-emerald-100' 
                        : 'bg-indigo-100'
                }`}>
                  <FaClock className={`text-2xl ${
                    isExpired 
                      ? 'text-red-500' 
                      : isUrgent 
                        ? 'text-orange-500' 
                        : isGovernment 
                          ? 'text-emerald-500' 
                          : 'text-indigo-500'
                  }`} />
                </div>
                
                {isExpired ? (
                  <>
                    <h3 className="text-lg font-bold text-red-700">Application Closed</h3>
                    <p className="text-red-600 text-sm mt-1">This job is no longer accepting applications</p>
                  </>
                ) : isUrgent ? (
                  <>
                    <h3 className="text-lg font-bold text-orange-700">Closing Soon!</h3>
                    <p className="text-orange-600 text-sm mt-1">Only {daysRemaining} days remaining</p>
                  </>
                ) : (
                  <>
                    <h3 className={`text-lg font-bold ${isGovernment ? 'text-emerald-700' : 'text-indigo-700'}`}>
                      {daysRemaining} Days Remaining
                    </h3>
                    <p className={`text-sm mt-1 ${isGovernment ? 'text-emerald-600' : 'text-indigo-600'}`}>
                      Apply before deadline
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Job Details Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Job Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isGovernment ? 'bg-emerald-100' : 'bg-indigo-100'
                  }`}>
                    {isGovernment ? <FaBuilding className="text-emerald-600" /> : <MdBusinessCenter className="text-indigo-600" />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Organization</p>
                    <p className="font-semibold text-gray-800">{job.company}</p>
                  </div>
                </div>

                {job.location && (
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isGovernment ? 'bg-emerald-100' : 'bg-indigo-100'
                    }`}>
                      <FaMapMarkerAlt className={isGovernment ? 'text-emerald-600' : 'text-indigo-600'} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-gray-800">{job.location}</p>
                    </div>
                  </div>
                )}

                {job.salary && (
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isGovernment ? 'bg-emerald-100' : 'bg-indigo-100'
                    }`}>
                      <FaMoneyBillWave className={isGovernment ? 'text-emerald-600' : 'text-indigo-600'} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-semibold text-gray-800">{job.salary}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isGovernment ? 'bg-emerald-100' : 'bg-indigo-100'
                  }`}>
                    <FaCalendarAlt className={isGovernment ? 'text-emerald-600' : 'text-indigo-600'} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Closing Date</p>
                    <p className="font-semibold text-gray-800">{formatDate(job.closingDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isGovernment ? 'bg-emerald-100' : 'bg-indigo-100'
                  }`}>
                    <FaCheckCircle className={isGovernment ? 'text-emerald-600' : 'text-indigo-600'} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Posted On</p>
                    <p className="font-semibold text-gray-800">{formatDate(job.postedDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Posted By */}
            <div className="bg-gray-50 rounded-2xl p-4 text-center text-sm text-gray-500">
              Posted by <span className="font-semibold text-gray-700">{job.postedBy}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
