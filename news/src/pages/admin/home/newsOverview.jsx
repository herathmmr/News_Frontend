import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NewsOver() {
  const { id } = useParams();
  const location = useLocation();
  const news = location.state?.news; // from Link

  return (
    
    <div className=" max-w-2xl mx-auto p-6 bg-white/80 rounded-3xl shadow-lg pb-7 m-8">
    
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/home" className="hover:underline text-red-600">
          Home
        </Link>
        / <span className="capitalize">{news?.category}</span>
      </div>

      <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-4">
            {news?.title}
          </h1>

          <div className="flex items-center justify-between text-gray-500 text-sm mb-6 border-b pb-4">
            <div className="flex items-center space-x-4">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                {news?.category}
              </span>
              <span>By {news?.author}</span>
            </div>
            <span>{news?.date ? new Date(news.date).toLocaleDateString() : ""}</span>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {news?.content ||
              "No content available. Please check back later for updates on this article."}
          </p>

          
          <div className="flex justify-between items-center mt-8 border-t pt-4">
           
            <Link 
              to ="/home"
              className="text-red-600 font-semibold hover:underline"
            >
              ← Back to News
            </Link>.
          </div>
        </div>
      
    </div>
   
  );
}
