import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-gradient-to-r from-blue-50 to-blue-100 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contac"
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/privacy"
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>

          {/* Copyright */}
          <span className="text-gray-700 text-sm text-center">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-700">Derana</span>. All rights reserved.
          </span>

          {/* Social */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-600 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-white/60"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gray-600 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-white/60"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-600 hover:text-sky-500 transition-colors p-2 rounded-full hover:bg-white/60"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}