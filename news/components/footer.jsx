import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaAngleRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand & Description */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <Link to="/" className="inline-block group">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                Derana
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your trusted source for the latest news, updates, and insights from Sri Lanka and around the world.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-110 transition-all duration-300"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-110 transition-all duration-300"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:scale-110 transition-all duration-300"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-purple-500 hover:scale-110 transition-all duration-300"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://wa.me/0775976783"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white hover:border-green-500 hover:scale-110 transition-all duration-300"
              >
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/politics", label: "Politics" },
                { to: "/sports", label: "Sports" },
                { to: "/technology", label: "Technology" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-2 group transition-all duration-300"
                  >
                    <FaAngleRight className="text-blue-500 group-hover:translate-x-1 transition-transform duration-300" size={12} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white relative inline-block">
              Categories
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/entertainment", label: "Entertainment" },
                { to: "/business", label: "Business" },
                { to: "/government-jobs", label: "Government Jobs" },
                { to: "/private-jobs", label: "Private Jobs" },
                { to: "/contac", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-2 group transition-all duration-300"
                  >
                    <FaAngleRight className="text-purple-500 group-hover:translate-x-1 transition-transform duration-300" size={12} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:077-5976783"
                  className="text-gray-400 hover:text-white text-sm flex items-start gap-3 group transition-all duration-300"
                >
                  <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <FaPhone className="text-blue-400" size={14} />
                  </span>
                  <span>077-5976783</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:malshanherath88@gmail.com"
                  className="text-gray-400 hover:text-white text-sm flex items-start gap-3 group transition-all duration-300"
                >
                  <span className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                    <FaEnvelope className="text-purple-400" size={14} />
                  </span>
                  <span className="break-all">malshanherath88@gmail.com</span>
                </a>
              </li>
              <li className="text-gray-400 text-sm flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-green-400" size={14} />
                </span>
                <span>Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter (Optional Enhancement) */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-white font-medium mb-1">Stay Updated</h4>
              <p className="text-gray-400 text-sm">Subscribe to get the latest news delivered to your inbox.</p>
            </div>
            <form className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-blue-400 font-medium">Derana</span>. Owned by{" "}
              <span className="text-purple-400 font-medium">Malshan</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-20 right-6 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center shadow-lg hover:shadow-blue-500/30 hover:scale-110 transition-all duration-300 group"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
}