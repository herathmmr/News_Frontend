import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import NewsCard from "../../../../components/newsCard";

export default function Sport() {
  const [state, setState] = useState("loading");
  const [sportsNews, setSportsNews] = useState([]);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get("http://localhost:3005/api/news")
        .then((res) => {
          const filtered = res.data.filter(
            (article) => article.category === "Business"
          );
          setSportsNews(filtered);
          setState("success");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error fetching business news!");
          setState("error");
        });
    }
  }, [state]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Decorative soft blobs matching home page */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-gradient-to-tr from-amber-200 to-rose-200 opacity-40 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-gradient-to-tr from-rose-200 to-amber-200 opacity-40 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Business News
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Stay updated with the latest business stories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {state === "loading" && (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading business news...</p>
              </div>
            </div>
          )}

          {state === "error" && (
            <div className="col-span-full">
              <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-6 sm:px-6 text-center">
                <p className="font-semibold">Failed to load business news</p>
                <button 
                  onClick={() => setState("loading")}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {state === "success" && sportsNews.length === 0 && (
            <p className="col-span-full text-center text-gray-600 bg-gray-50/80 backdrop-blur border border-gray-200 rounded-lg px-4 py-8">
              No business news available at the moment.
            </p>
          )}

          {state === "success" &&
            sportsNews.map((article) => (
              <NewsCard key={article.id} news={article} />
            ))}
        </div>
      </div>
    </section>
  );
}