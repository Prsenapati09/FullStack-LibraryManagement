
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const FreeBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/Api/Books/books");

        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else if (res.data.books && Array.isArray(res.data.books)) {
          setBooks(res.data.books); 
        } else if (res.data.book && Array.isArray(res.data.book)) {
          setBooks(res.data.book);
        } else {
          setBooks([]); 
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Explore Our <span className="text-indigo-500">Library</span>
          </h1>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Unlock a world of knowledge. Dive into our complete collection of books.
          </p>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-md animate-pulse">
                <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="text-center py-20">
             <div className="text-red-500 text-xl font-semibold mb-2">Oops! Something went wrong.</div>
             <p className="text-gray-500">{error}</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && books.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No books found</h3>
          </div>
        )}

        {/* BOOK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {!loading && !error && books.map((item) => (
            <div 
              key={item.id || item._id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden h-72 w-full bg-gray-100">
                <img
                  src= {item.image}
                  alt={item.Bookname}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {item.category}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col grow">
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {item.Bookname}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {item.author} 
                    </p>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 grow">
                  {item.description || "No description available."}
                </p>
                
                <div className="flex items-center justify-between gap-2 mt-auto">
                    <span className="text-green-600 font-bold text-lg">Free</span>
                    <a
                        href={item.Url}
                        target=" "
                        className="px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 transition-colors shadow-indigo-200 shadow-lg"
                    > 
                        Read Now
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FreeBooks;