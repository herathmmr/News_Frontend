import { useEffect } from "react";

export default function About() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Decorative soft blobs matching home page */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-gradient-to-tr from-amber-200 to-rose-200 opacity-40 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-gradient-to-tr from-rose-200 to-amber-200 opacity-40 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            About Us
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Learn more about our mission and achievements
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 rounded-3xl shadow-xl overflow-hidden ring-1 ring-black/5 p-5 sm:p-8 lg:p-10">
          {/* Decorative top bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400"></div>

          {/* Introduction */}
          <p className="text-gray-800 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
            In the highly competitive news broadcasting space,{" "}
            <span className="font-semibold text-red-700">Derana</span> has built
            one of the most unbiased and comprehensive news properties{" "}
            <span className="font-semibold text-red-700">"Ada Derana"</span> – with a team of
            100 journalists delivering the most accurate and timely information.
          </p>

          {/* Key Highlights */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="h-1 w-8 bg-gradient-to-r from-red-600 to-amber-400 rounded"></span>
              Key Highlights
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
              <li>
                Partnership with Dialog Telekom in 2007 to deliver SMS news alerts.
              </li>
              <li>
                Available across TV, Radio, Web, SMS, IVR, Video Alerts, and Social
                Media.
              </li>
              <li>Tri-lingual availability: Sinhala, Tamil, and English.</li>
              <li>
                Interactive portal for commenting and submitting viewer reports.
              </li>
            </ul>
          </div>

          {/* Digital Presence */}
          <div className="bg-gradient-to-br from-red-50 to-amber-50 border-l-4 border-red-600 p-4 sm:p-6 rounded-xl mb-6 sm:mb-8 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Our Digital Presence
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              The showpiece of Ada Derana is{" "}
              <a
                href="https://www.adaderana.lk"
                className="text-red-600 font-semibold hover:underline transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.adaderana.lk
              </a>
              , Sri Lanka's #1 news portal. Available in Sinhala, Tamil, and
              English, the platform enables viewer interaction through comments and
              even news submissions.
            </p>
          </div>

          {/* Awards & Recognition */}
          <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-5 sm:p-8 rounded-2xl shadow-lg mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Awards & Recognition</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li>
                SLIM Brand Excellence Silver Award – Most Innovative Brand of the
                Year.
              </li>
              <li>
                Recognized by ICTA as the Best e-Content Application among e-News
                providers.
              </li>
              <li>Silver Award at "The Most Popular Web Competition 2010".</li>
              <li>Manthan Award South Asia 2010 in the e-News & Media category.</li>
              <li>
                Global Understanding for Sustainable Development Award – 2016.
              </li>
            </ul>
          </div>

          {/* Closing Statement */}
          <p className="text-gray-800 leading-relaxed text-base sm:text-lg text-center font-medium border-t pt-6">
            Ada Derana continues to be Sri Lanka's most comprehensive and
            innovative news provider, driven by a mission to deliver accurate,
            timely, and engaging content across multiple platforms.
          </p>
        </div>
      </div>
    </section>
  );
}