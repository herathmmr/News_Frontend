import { useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaFax, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Get in touch with us
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden ring-1 ring-gray-200 p-5 sm:p-8 lg:p-10">
          {/* Decorative top bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-red-50 to-amber-50 border border-red-100">
                <FaMapMarkerAlt className="text-red-600 text-xl mt-1 flex-shrink-0" />
                <div className="text-gray-800 leading-relaxed text-sm sm:text-base">
                  <strong className="block text-red-700 mb-1">
                    Derana Macro Entertainment (Pvt) Ltd
                  </strong>
                  No. 320, T.B. Jayah Mawatha, Colombo 10
                  <br />
                  Sri Lanka
                </div>
              </div>

              {/* Phone & Fax */}
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                  <FaPhone className="text-red-600 text-lg flex-shrink-0" />
                  <span className="text-gray-800 text-sm sm:text-base">
                    <strong>Tel:</strong> +94 11 5300 700
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                  <FaFax className="text-red-600 text-lg flex-shrink-0" />
                  <span className="text-gray-800 text-sm sm:text-base">
                    <strong>Fax:</strong> +94 11 2680 417
                  </span>
                </div>
              </div>

              {/* Web Editors */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="h-1 w-8 bg-gradient-to-r from-red-600 to-amber-400 rounded"></span>
                  Web Editors
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition">
                    <FaEnvelope className="text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-800 text-sm sm:text-base">
                      <strong className="text-red-700">English:</strong>{" "}
                      <a
                        href="mailto:yusuf@derana.lk"
                        className="text-blue-600 hover:underline"
                      >
                        yusuf@derana.lk
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition">
                    <FaEnvelope className="text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-800 text-sm sm:text-base">
                      <strong className="text-red-700">Sinhala:</strong>{" "}
                      <a
                        href="mailto:poornima@derana.lk"
                        className="text-blue-600 hover:underline"
                      >
                        poornima@derana.lk
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition">
                    <FaEnvelope className="text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-800 text-sm sm:text-base">
                      <strong className="text-red-700">Tamil:</strong>{" "}
                      <a
                        href="mailto:bavan@derana.lk"
                        className="text-blue-600 hover:underline"
                      >
                        bavan@derana.lk
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 h-[400px] lg:h-full">
              <iframe
                title="Derana Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63319.29720763122!2d79.82920787910154!3d6.927078842648729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259604efb1d4f%3A0x1f4a5ef84fa64a4b!2sAda%20Derana!5e0!3m2!1sen!2slk!4v1704023429374!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}