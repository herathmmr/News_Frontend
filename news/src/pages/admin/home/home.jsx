import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import NewsCard from "../../../../components/newsCard";

const CATEGORIES = ["All", "Sports", "Business", "Entertainment", "Politics", "Technology"];

export default function Home() {
  const [state, setState] = useState("loading");
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (state === "loading") {
      axios
        .get("http://localhost:3005/api/news")
        .then((res) => {
          setNews(res.data);
          setState("success");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error fetching news!");
          setState("error");
        });
    }
  }, [state]);

  const filteredNews = useMemo(() => {
    const term = search.toLowerCase();
    return news.filter((item) => {
      const matchesTerm =
        item.title?.toLowerCase().includes(term) ||
        item.content?.toLowerCase().includes(term) ||
        item.author?.toLowerCase().includes(term);
      const matchesCategory =
        category === "All" || item.category?.toLowerCase() === category.toLowerCase();
      return matchesTerm && matchesCategory;
    });
  }, [news, search, category]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Soft gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-gradient-to-tr from-amber-200 to-rose-200 opacity-40 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-gradient-to-tr from-rose-200 to-amber-200 opacity-40 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-6">
        {/* Hero / Header */}
        {/* Gradient wave animation helper */}
        <style>
          {`
            @keyframes waveGradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>

        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 sm:p-8 shadow-xl">
          {/* Animated wave strip (inspired by capsule-render) */}
          <div
            className="
              absolute -top-10 inset-x-0 h-24
              bg-[length:200%_200%]
              bg-[linear-gradient(120deg,#4f46e5,#9333ea,#ec4899,#f97316,#22d3ee,#4f46e5)]
              opacity-70 blur-2xl
            "
            style={{ animation: "waveGradient 12s ease infinite" }}
          ></div>

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-white/80">Top stories</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Stay updated with the latest news
              </h1>
              <p className="text-white/80">
                Curated headlines across categories. Search, filter, and dive in.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur rounded-xl p-2 shadow-lg">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search headlines, topics, authors…"
                  className="w-full lg:w-80 bg-transparent text-white placeholder-white/70 focus:outline-none px-3 py-2"
                />
                <span className="px-3 py-2 text-sm font-semibold bg-white text-blue-700 rounded-lg">
                  Search
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition shadow-sm ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
          {state === "loading" &&
            Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse rounded-2xl bg-white border border-gray-200 shadow-sm p-4 space-y-3"
              >
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
              </div>
            ))}

          {state === "error" && (
            <div className="col-span-full">
              <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-6 sm:px-6 text-center shadow-sm">
                <p className="font-semibold">Failed to load news</p>
                <button
                  onClick={() => setState("loading")}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {state === "success" && filteredNews.length === 0 && (
            <p className="col-span-full text-center text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-10 shadow-sm">
              No news matched your filters. Try another category or search term.
            </p>
          )}

          {state === "success" &&
            filteredNews.map((article) => (
              <NewsCard key={article._id || article.id} news={article} />
            ))}
        </div>
      </div>
    </section>
  );
}