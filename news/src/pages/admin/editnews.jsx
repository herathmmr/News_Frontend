import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { FiUploadCloud, FiX } from "react-icons/fi";

export default function EditNews() {
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState(location.state._id);
  const [displayId, setDisplayId] = useState(location.state.id);
  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);
  const [category, setCategory] = useState(location.state.category);
  const [date, setDate] = useState(location.state.date);
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

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("date", date);
      if (image) {
        formData.append("image", image);
      }

      const result = await axios.put("http://localhost:3005/api/news/" + id, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(result);
      toast.success("News updated successfully");
      navigate("/admin/news");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update news");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit News</h2>
     <p className="text-sm italic text-gray-500 mt-1">
  Here you can edit news articles.
</p>

      <div className="space-y-4">
        {/* ID */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">ID</span>
          <input
            disabled
            type="number"
            placeholder="Enter ID"
            value={displayId}
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-100"
          />
        </div>

        {/* Title */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Title</span>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Content */}
        <div className="flex justify-between items-start border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Content</span>
          <textarea
            placeholder="Write news content..."
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Category</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Politics">Politics</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex justify-between items-start border-b pb-4">
          <span className="font-medium text-gray-700 w-1/4">Image</span>
          <div className="w-3/4">
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-28 object-cover rounded-lg border-2 border-blue-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-md"
                >
                  <FiX size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                <FiUploadCloud className="text-3xl text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload image</span>
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

        {/* Date */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-right">
  <button
    onClick={() => navigate("/admin/news")}
    className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500 transition mr-4"
  >
    Cancel
  </button>
  <button
    onClick={handleSubmit}
    disabled={uploading}
    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {uploading ? "Uploading..." : "Update News"}
  </button>
</div>

    </div>
  );
}
