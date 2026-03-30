import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star } from 'lucide-react';
import { FaBookReader } from 'react-icons/fa'; // react-icons

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10 pt-24 font-sans flex flex-col items-center">
      
      <div className="flex items-center gap-3 mb-12">
        <div className="p-3 bg-indigo-500 text-white rounded-xl shadow-lg">
          <FaBookReader className="text-3xl" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* The Two Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* Free Books Box */}
        <Link 
          to="/admin-dashboard/free" 
          className="group bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-2xl hover:border-green-400 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
            <BookOpen size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Free Books</h2>
          <p className="text-gray-500">View, edit, and delete standard free books from the database.</p>
        </Link>

        {/* Premium Books Box */}
        <Link 
          to="/admin-dashboard/premium" 
          className="group bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-2xl hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
            <Star size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Premium Books</h2>
          <p className="text-gray-500">View, edit, and delete exclusive premium content.</p>
        </Link>

      </div>
    </div>
  );
};

export default AdminHome;
