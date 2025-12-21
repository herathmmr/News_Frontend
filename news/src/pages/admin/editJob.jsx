import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { FaBuilding, FaUserTie } from "react-icons/fa";
import { MdWork } from "react-icons/md";

export default function EditJob() {
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState(location.state._id);
  const [displayId, setDisplayId] = useState(location.state.id);
  const [title, setTitle] = useState(location.state.title);
  const [description, setDescription] = useState(location.state.description);
  const [company, setCompany] = useState(location.state.company);
  const [jobLocation, setJobLocation] = useState(location.state.location || "");
  const [category, setCategory] = useState(location.state.category);
  const [salary, setSalary] = useState(location.state.salary || "");
  const [requirements, setRequirements] = useState(location.state.requirements || "");
  const [closingDate, setClosingDate] = useState(
    location.state.closingDate 
      ? new Date(location.state.closingDate).toISOString().split('T')[0] 
      : ""
  );
  const [isActive, setIsActive] = useState(location.state.isActive);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(location.state.image || null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  async function handleSubmit() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    // Validation
    if (!title || !description || !company || !category || !closingDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("company", company);
      formData.append("location", jobLocation);
      formData.append("category", category);
      formData.append("salary", salary);
      formData.append("requirements", requirements);
      formData.append("closingDate", closingDate);
      formData.append("isActive", isActive);
      if (image) {
        formData.append("image", image);
      }

      const result = await axios.put("http://localhost:3005/api/jobs/" + id, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(result);
      toast.success("Job updated successfully");
      navigate("/admin/jobs");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update job");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
              <MdWork className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Edit Job</h2>
              <p className="text-sm text-gray-500">Update job posting details</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
          <div className="space-y-6">
            {/* Row 1: ID and Category */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job ID
                </label>
                <input
                  disabled
                  type="number"
                  value={displayId}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-100 text-gray-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory("government")}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition font-medium ${
                      category === "government"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    <FaBuilding />
                    Government
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory("private")}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition font-medium ${
                      category === "private"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50"
                    }`}
                  >
                    <FaUserTie />
                    Private
                  </button>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Senior Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition"
              />
            </div>

            {/* Company and Location */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company/Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Colombo, Sri Lanka"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition"
                />
              </div>
            </div>

            {/* Salary, Closing Date, and Status */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salary Range
                </label>
                <input
                  type="text"
                  placeholder="e.g., Rs. 50,000 - 80,000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Closing Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition font-medium ${
                    isActive
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-red-300 bg-red-50 text-red-700"
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Describe the job role, responsibilities, and expectations..."
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition resize-none"
              ></textarea>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Requirements & Qualifications
              </label>
              <textarea
                placeholder="List the required qualifications, skills, and experience..."
                rows="4"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition resize-none"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Image/Banner
              </label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-xl border-2 border-amber-200 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition shadow-lg"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition group">
                  <FiUploadCloud className="text-4xl text-gray-400 mb-2 group-hover:text-amber-500 transition" />
                  <span className="text-sm text-gray-500 group-hover:text-amber-600">Click to upload image</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={() => navigate("/admin/jobs")}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition font-semibold shadow-lg shadow-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Job"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
