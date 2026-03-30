import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, BookOpen, Calendar, Lock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const PremiumBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH PREMIUM BOOKS
  const fetchPremiumBooks = async () => {
    try {
      
      const res = await axios.get("http://localhost:3000/Api/PremiumBooks/books");
      
      if (Array.isArray(res.data)) {
        setBooks(res.data);
      } else if (res.data && Array.isArray(res.data.books)) {
        setBooks(res.data.books);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching premium books:", error);
      toast.error("Failed to load premium collection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPremiumBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        
        {/* Hero Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 text-purple-600 rounded-full mb-4">
            <Star size={32} fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Premium Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock our exclusive library of high-quality reads. Dive into top-tier content carefully curated for our premium members.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books?.map((book) => (
                <div 
                  key={book._id} 
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Book Cover Image */}
                  <div className="relative h-64 w-full bg-gray-200 overflow-hidden group">
                    <img 
                      src={book.image} 
                      alt={book.Bookname} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> Premium
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="p-5 flex flex-col grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                      {book.Bookname}
                    </h3>
                    
                    <p className="text-purple-600 font-medium text-sm mb-3">
                      by {book.author}
                    </p>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 grow">
                      {book.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-5">
                      <Calendar size={14} />
                      <span>Published: {book.publishYear || "Unknown"}</span>
                    </div>

                    {/* Action Button */}
                    <a 
                    href={book.SourceUrl}
                    target="#"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30">

                      <BookOpen size={18} /> Read Now
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State (If no books exist) */}
            {(!books || books.length === 0) && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto mt-8">
                <Lock size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Premium Books Available</h3>
                <p className="text-gray-500">
                  We are currently updating our premium catalog. Please check back later for exclusive new titles.
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default PremiumBooks;