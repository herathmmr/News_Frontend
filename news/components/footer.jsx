import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 border-t border-gray-200  w-full">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        
       
        <nav className="flex space-x-6 mb-4 md:mb-0">
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-700 text-sm transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/contac"
            className="text-gray-600 hover:text-blue-700 text-sm transition-colors duration-200"
          >
            Contact Us
          </Link>
          <Link
            to="/privacy"
            className="text-gray-600 hover:text-blue-700 text-sm transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </nav>

        
        <span className="text-gray-700 text-sm text-center mb-4 md:mb-0">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-blue-700">Derana</span>. All rights reserved.
        </span>

       
        <div className="flex space-x-5">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-red-600 transition-colors duration-200"
          >
            <FaYoutube size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-sky-500 transition-colors duration-200"
          >
            <FaTwitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
