import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { FaNewspaper } from "react-icons/fa";
import { MdSportsScore, MdBusinessCenter, MdTheaters, MdAccountBalance, MdComputer } from "react-icons/md";

export default function AddNews() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Auto-select today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

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
    if (!id || !title || !content || !category || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("date", date);
      if (image) {
        formData.append("image", image);
      }

      const result = await axios.post("http://localhost:3005/api/news", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(result);
      toast.success("News added successfully");
      navigate("/admin/news");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add news");
    } finally {
      setUploading(false);
    }
  }

  const categories = [
    { value: "Sports", icon: MdSportsScore, color: "emerald" },
    { value: "Business", icon: MdBusinessCenter, color: "blue" },
    { value: "Entertainment", icon: MdTheaters, color: "pink" },
    { value: "Politics", icon: MdAccountBalance, color: "amber" },
    { value: "Technology", icon: MdComputer, color: "indigo" },
  ];

  const getCategoryStyles = (cat, colorName) => {
    const colors = {
      emerald: { active: "border-emerald-500 bg-emerald-50 text-emerald-700", hover: "hover:border-emerald-300 hover:bg-emerald-50" },
      blue: { active: "border-blue-500 bg-blue-50 text-blue-700", hover: "hover:border-blue-300 hover:bg-blue-50" },
      pink: { active: "border-pink-500 bg-pink-50 text-pink-700", hover: "hover:border-pink-300 hover:bg-pink-50" },
      amber: { active: "border-amber-500 bg-amber-50 text-amber-700", hover: "hover:border-amber-300 hover:bg-amber-50" },
      indigo: { active: "border-indigo-500 bg-indigo-50 text-indigo-700", hover: "hover:border-indigo-300 hover:bg-indigo-50" },
    };
    return category === cat ? colors[colorName].active : `border-gray-200 text-gray-600 ${colors[colorName].hover}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <FaNewspaper className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Add New Article</h2>
              <p className="text-sm text-gray-500">Create a new news article</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
          <div className="space-y-6">
            {/* Row 1: ID and Date */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  News ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter unique news ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Publish Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                News Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Breaking: Major Event Unfolds"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {categories.map(({ value, icon: Icon, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCategory(value)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition font-medium ${getCategoryStyles(value, color)}`}
                  >
                    <Icon />
                    {value}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                News Content <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Write the full news article content here..."
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition resize-none"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Featured Image
              </label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-xl border-2 border-blue-200 shadow-sm"
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
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition group">
                  <FiUploadCloud className="text-4xl text-gray-400 mb-2 group-hover:text-blue-500 transition" />
                  <span className="text-sm text-gray-500 group-hover:text-blue-600">Click to upload image</span>
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
              onClick={() => navigate("/admin/news")}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-semibold shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Add News"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}