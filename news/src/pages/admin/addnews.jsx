export default function AddNews() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add News </h2>
      <p className="text-gray-600">Here you can Add news articles.</p>

      
      <div className="space-y-4">
        {/* ID */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">ID</span>
          <input
            type="number"
            placeholder="Enter ID"
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Title */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Title</span>
          <input
            type="text"
            placeholder="Enter Title"
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Content */}
        <div className="flex justify-between items-start border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Content</span>
          <textarea
            placeholder="Write news content..."
            rows="4"
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Category</span>
          <select className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none">
            <option value="">Select Category</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        {/* Author */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Author</span>
          <input
            type="text"
            placeholder="Author Name"
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Date */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Date</span>
          <input
            type="date"
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
          Add News
        </button>
      </div>
    </div>
  );
}
