import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Contact Info (Dark Theme) */}
        <div className="bg-gray-900 text-white p-10 md:w-1/2 flex flex-col justify-between relative overflow-hidden">
          {/* Abstract Circle Decoration */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-400 mb-8">
              Have a question about a book? Want to suggest a new title? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg text-indigo-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-gray-400 text-sm">support@bookNova.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg text-indigo-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <p className="text-gray-400 text-sm">+91 0000000000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg text-indigo-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Location</h3>
                  <p className="text-gray-400 text-sm">Nc autonomus college,jajpur,odisha</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            <p className="text-gray-500 text-xs">
              &copy; 2024 BookHaven. We reply within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form (Light Theme) */}
        <div className="p-10 md:w-1/2 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                id="name"
                placeholder="Enter Your Name" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email"
                placeholder="Enter Your Email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                id="message"
                rows="4" 
                placeholder="Tell us about your favorite book..." 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none resize-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
            >
              Send Message
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;