import { useParams, useLocation, Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function NewsOver() {
  const { id } = useParams();
  const location = useLocation();
  const news = location.state?.news;

  if (!news) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-xl w-full bg-white/90 rounded-2xl shadow p-6 sm:p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Article not found</h2>
          <p className="text-gray-600 mb-6">This article is unavailable or the link is incorrect.</p>
          <Link to="/home" className="text-red-600 font-semibold hover:underline">
            ← Back to News
          </Link>
        </div>
      </section>
    );
  }

  const readingTime = Math.max(
    1,
    Math.round(((news?.content || "").split(/\s+/).filter(Boolean).length) / 200)
  );
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4 sm:mb-6">
          <Link to="/home" className="hover:underline text-red-600">
            Home
          </Link>
          <span className="mx-1">/</span>
          <span className="capitalize">{news?.category}</span>
        </nav>

        {/* Card */}
        <div className="bg-white/95 rounded-3xl shadow-xl overflow-hidden ring-1 ring-black/5">
          {/* Cover */}
          {news?.image && (
            <div className="relative h-56 sm:h-72 md:h-80 lg:h-[22rem]">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
              <span className="absolute bottom-4 left-4 z-10 bg-white/95 border border-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                {news?.category}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="p-5 sm:p-8 lg:p-10">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4">
              {news?.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 text-sm sm:text-base mb-5 sm:mb-7 border-b pb-4">
              <div className="flex items-center gap-3">
                <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-red-100">
                  {news?.category}
                </span>
                <span className="italic">By {news?.author}</span>
              </div>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span>{news?.date ? new Date(news.date).toLocaleDateString() : ""}</span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span>{readingTime} min read</span>
            </div>

            {/* Body */}
            <div className="max-w-none text-gray-800">
              <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {news?.content ||
                  "No content available. Please check back later for updates on this article."}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between border-t pt-4 sm:pt-6">
              <Link
                to="/home"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:underline"
              >
                ← Back to News
              </Link>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm text-gray-500 mr-1">Share:</span>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on Facebook"
                  className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook className="text-lg" />
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(news?.title || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on X"
                  className="p-2 rounded-lg bg-black text-white hover:bg-neutral-800 transition"
                  aria-label="Share on X"
                >
                  <FaXTwitter className="text-lg" />
                </a>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent((news?.title || "") + " " + currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on WhatsApp"
                  className="p-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}