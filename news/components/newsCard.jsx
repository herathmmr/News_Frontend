export default function NewsCard({ news }) {
  return (
    <div className="bg-gradient-to-r from-red-50 to-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300 max-w-sm w-full m-4 flex flex-col justify-between">
      {/* Image */}
      <img
        src={news.image || "bg.png"}
        alt={news.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      <div className="p-6 flex flex-col flex-1 bg-white rounded-b-2xl">
        {/* Title */}
        <h2 className="text-2xl font-extrabold text-red-700 mb-3 line-clamp-2">
          {news.title}
        </h2>

        {/* Category + Author */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
            {news.category}
          </span>
          <span className="italic font-medium">By {news.author}</span>
        </div>

        {/* Content */}
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-6">
          {news.content}
        </p>

        {/* Footer with Date, Views, Likes */}
        <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-4 mt-auto">
          <span className="font-medium">
            {new Date(news.date).toLocaleDateString()}
          </span>
          <div className="flex space-x-5">
            <span className="flex items-center space-x-1">
              <i className="fa-regular fa-eye text-gray-600"></i>
              <span>{news.views}</span>
            </span>
            <span className="flex items-center space-x-1">
              <i className="fa-regular fa-thumbs-up text-gray-600"></i>
              <span>{news.likes}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
