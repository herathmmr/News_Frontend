import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; 
import NewsCard from "../../../../components/newsCard";

export default function Home() {
  const [state, setState] = useState("loading");
  const [news, setNews] = useState([]); 

  useEffect(() => {
    if (state === "loading") {
      axios
        .get("http://localhost:3005/api/news") 
        .then((res) => {
          setNews(res.data); 
          setState("success");
          console.log(res.data)
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error fetching news!");
          setState("error");
        });
    }
  }, [state]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Decorative soft blobs matching card accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-200 to-rose-200 opacity-40 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-rose-200 to-amber-200 opacity-40 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {state === "loading" && (
            <p className="col-span-full text-gray-600 bg-gray-50/80 backdrop-blur border border-gray-200 rounded-lg px-4 py-3">
              Loading news...
            </p>
          )}

          {state === "error" && (
            <p className="col-span-full text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              Failed to load news.
            </p>
          )}

          {state === "success" &&
            news.map((article) => (
              <NewsCard key={article.id} news={article} />
            ))}
        </div>
      </div>
    </section>
  );
}