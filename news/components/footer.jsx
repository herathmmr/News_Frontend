import { Link } from "react-router-dom";
import { useState } from "react";
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
  FaHeart,
  FaPaperPlane,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: FaFacebookF, href: "https://www.facebook.com", label: "Facebook", color: "hover:bg-blue-600 hover:border-blue-600" },
    { icon: FaYoutube, href: "https://www.youtube.com", label: "YouTube", color: "hover:bg-red-600 hover:border-red-600" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", color: "hover:bg-sky-500 hover:border-sky-500" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-500" },
    { icon: FaWhatsapp, href: "https://wa.me/0775976783", label: "WhatsApp", color: "hover:bg-green-500 hover:border-green-500" },
  ];

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/politics", label: "Politics" },
    { to: "/sports", label: "Sports" },
    { to: "/technology", label: "Technology" },
  ];

  const categories = [
    { to: "/entertainment", label: "Entertainment" },
    { to: "/business", label: "Business" },
    { to: "/jobs/government", label: "Government Jobs" },
    { to: "/jobs/private", label: "Private Jobs" },
    { to: "/contac", label: "Contact Us" },
  ];

  return (
    <footer className="mt-auto w-full bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Description */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-black text-xl">D</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Derana</h2>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <HiSparkles className="text-amber-400" />
                  News Portal
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Your trusted source for the latest news, updates, and career opportunities from Sri Lanka and around the world.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-3 pt-2 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:scale-110 transition-all duration-300 ${social.color}`}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white relative inline-flex items-center gap-2">
              Quick Links
              <span className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white text-sm flex items-center gap-2 group transition-all duration-300"
                  >
                    <FaAngleRight className="text-blue-500 group-hover:translate-x-1 transition-transform duration-300" size={12} />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white relative inline-flex items-center gap-2">
              Categories
              <span className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white text-sm flex items-center gap-2 group transition-all duration-300"
                  >
                    <FaAngleRight className="text-purple-500 group-hover:translate-x-1 transition-transform duration-300" size={12} />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white relative inline-flex items-center gap-2">
              Contact Us
              <span className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:077-5976783" className="text-slate-400 hover:text-white text-sm flex items-start gap-3 group transition-all duration-300">
                  <span className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                    <FaPhone className="text-blue-400" size={14} />
                  </span>
                  <div>
                    <span className="text-xs text-slate-500 block mb-0.5">Phone</span>
                    <span>077-5976783</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:malshanherath88@gmail.com" className="text-slate-400 hover:text-white text-sm flex items-start gap-3 group transition-all duration-300">
                  <span className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all">
                    <FaEnvelope className="text-purple-400" size={14} />
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs text-slate-500 block mb-0.5">Email</span>
                    <span className="break-all">malshanherath88@gmail.com</span>
                  </div>
                </a>
              </li>
              <li className="text-slate-400 text-sm flex items-start gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-emerald-400" size={14} />
                </span>
                <div>
                  <span className="text-xs text-slate-500 block mb-0.5">Location</span>
                  <span>Colombo, Sri Lanka</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 sm:mt-16 pt-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold text-white mb-2 flex items-center justify-center lg:justify-start gap-2">
                <FaPaperPlane className="text-blue-400" />
                Stay Updated
              </h4>
              <p className="text-slate-400 text-sm max-w-md">Subscribe to get the latest news and job opportunities delivered to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
              <div className="relative flex-1 sm:min-w-[280px]">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 flex items-center justify-center gap-2"
              >
                {isSubscribed ? (
                  <>
                    <FaHeart className="animate-pulse" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/5 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-blue-400 font-semibold">Derana</span>. Developed with{" "}
              <FaHeart className="inline text-red-500 mx-1" size={12} />
              by <span className="text-purple-400 font-semibold">Malshan</span>
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-slate-500 hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 group z-40"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
}