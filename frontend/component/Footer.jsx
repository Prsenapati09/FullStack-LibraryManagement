import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 font-sans">
      {/* Top Section: Newsletter & Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-wide">BookNova</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your gateway to a universe of stories. From timeless classics to modern bestsellers, we bring the library to your fingertips.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<FaFacebookF />} />
              <SocialLink icon={<FaTwitter />} />
              <SocialLink icon={<FaInstagram />} />
              <SocialLink icon={<FaLinkedinIn />} />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Discover</h3>
            <ul className="space-y-4 text-sm">
              <li><FooterLink to="/" text="Home" /></li>
              <li><FooterLink to="/bestsellers" text="Bestsellers" /></li>
              <li><FooterLink to="/new-arrivals" text="New Arrivals" /></li>
              <li><FooterLink to="/authors" text="Featured Authors" /></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-500 mt-0.5" />
                <span>jajpur,odisha<br />Nc autonomous</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-500" />
                <span>+91 0000000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-500" />
                <span>support@bookNova.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter (Engagement Focus) */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest book news and exclusive deals.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-500"
                />
              </div>
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group">
                Subscribe
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BookNova Store. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-indigo-400 transition">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-indigo-400 transition">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components for Cleaner Code
const SocialLink = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 transform hover:scale-110">
    {icon}
  </a>
);

const FooterLink = ({ to, text }) => (
  <Link to={to} className="flex items-center gap-2 hover:text-indigo-400 transition-colors group">
    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
    <span className="group-hover:translate-x-1 transition-transform duration-300">{text}</span>
  </Link>
);

export default Footer;