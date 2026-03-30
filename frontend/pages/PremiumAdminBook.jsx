import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Edit, Trash2, X, Crown, Star } from 'lucide-react'; // Added Crown and Star for premium look
import toast, { Toaster } from 'react-hot-toast'; 

const AdminBookManager = () => {
  // 1. STATE MANAGEMENT (Unchanged)
  const [books, setBooks] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); 
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    Bookname: '',
    author: '',
    image: '',
    description: '',
    publishYear:''
  });

  // Optional: Setup auth headers if your API requires a token (Unchanged)
  const getHeaders = () => {
    const token = localStorage.getItem("Token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  // 2. FETCH DATA (READ) (Unchanged)
  const fetchBooks = async () => {
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
      toast.error("Failed to load books."); 
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 3. DELETE DATA (Unchanged)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this premium book?")) {
      try {
        await axios.delete(`http://localhost:3000/Api/PremiumBooks/delete/${id}`);
        toast.success("Premium book deleted!"); 
        fetchBooks(); 
      } catch (error) {
        toast.error("Error deleting book."); 
        console.error(error);
      }
    }
  };

  // 4. SUBMIT DATA (CREATE or UPDATE) (Unchanged)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await axios.post("http://localhost:3000/Api/PremiumBooks/creat", formData);
        toast.success("Premium book added successfully!"); 
      } else {
        await axios.put(`http://localhost:3000/Api/PremiumBooks/update/${editId}`, formData);
        toast.success("Premium book updated!"); 
      }
      
      setIsModalOpen(false); 
      fetchBooks(); 
      
    } catch (error) {
      toast.error("Error saving book data."); 
      console.error(error);
    }
  };

  // --- UI Handlers --- (Unchanged)
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setModalMode('add');
    setEditId(null);
    setFormData({ Bookname: '', author: '', image: '',SourceUrl:'',  description: '', publishYear:''});
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setModalMode('edit');
    setEditId(book._id);
    setFormData({
      Bookname: book.Bookname || '',
      author: book.author || '',
      image: book.image || '',
      SourceUrl :book.SourceUrl || '',
      description: book.description || '',
      publishYear: book.publishYear || ''
    });
    setIsModalOpen(true);
  };

  return (
    // Updated Background to a sleek slate/purple hint
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 pt-24 md:pt-28 font-sans">
      
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        
        {/* PREMIUM Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-linear-to-br from-purple-600 to-indigo-700 text-white rounded-2xl shadow-lg shadow-purple-500/30 border border-purple-400/20">
              <Crown size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Premium Library
              </h1>
              <p className="text-purple-600 font-medium text-sm mt-1 flex items-center gap-1">
                <Star size={14} fill="currentColor" /> Exclusive Collection Management
              </p>
            </div>
          </div>
          
          <button 
            onClick={openAddModal}
            className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-purple-500/30 transform hover:-translate-y-1"
          >
            <PlusCircle size={20} /> Add Premium Book
          </button>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="bg-linear-to-r from-slate-50 to-white border-b border-slate-200 text-slate-500 text-xs uppercase tracking-widest font-bold">
                  <th className="p-6">Cover</th>
                  <th className="p-6">Book Details</th>
                  <th className="p-6">Author & Year</th>
                  <th className="p-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                
                {books?.map((book) => (
                  <tr key={book._id} className="hover:bg-purple-50/50 transition-colors duration-200 group">
                    <td className="p-6">
                      <div className="relative">
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-16 h-24 object-cover rounded-lg shadow-md border border-slate-200 group-hover:shadow-lg transition-shadow duration-300" 
                        />
                        {/* Tiny premium badge on the image */}
                        <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-1 rounded-full shadow-md">
                          <Star size={10} fill="currentColor" />
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="font-extrabold text-gray-900 text-lg group-hover:text-purple-700 transition-colors">
                        {book.Bookname}
                      </p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed max-w-md">
                        {book.description}
                      </p>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">{book.author}</span>
                        <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-md w-max mt-2">
                          Published: {book.publishYear || 'N/A'}
                        </span>
                      </div>
                    </td>
                    
                    <td className="p-6">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => openEditModal(book)} 
                          className="text-purple-600 hover:text-white hover:bg-purple-600 p-2.5 border border-purple-200 rounded-xl transition-all duration-200 hover:shadow-md"
                          title="Edit Book"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(book._id)} 
                          className="text-red-500 hover:text-white hover:bg-red-500 p-2.5 border border-red-200 rounded-xl transition-all duration-200 hover:shadow-md"
                          title="Delete Book"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {(!books || books.length === 0) && (
                  <tr>
                    <td colSpan="4" className="p-16 text-center text-slate-500 bg-slate-50/50">
                      <Crown size={48} className="mx-auto mb-4 text-purple-300" />
                      <p className="text-xl font-bold text-slate-700">No premium books found.</p>
                      <p className="text-sm mt-2 text-slate-500">Your exclusive collection is currently empty.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- PREMIUM ADD / EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 transform transition-all">
            
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-linear-to-r from-slate-50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <Crown size={20} />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  {modalMode === 'add' ? 'Add Premium Book' : 'Update Premium Details'}
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-red-500 bg-slate-100 hover:bg-red-50 p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Book Title *</label>
                  <input type="text" name="Bookname" value={formData.Bookname} onChange={handleInputChange} required className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow bg-slate-50 focus:bg-white" placeholder="e.g., The Great Gatsby" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Author Name *</label>
                  <input type="text" name="author" value={formData.author} onChange={handleInputChange} required className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow bg-slate-50 focus:bg-white" placeholder="e.g., F. Scott Fitzgerald" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Publish Year *</label>
                <input type="number" name="publishYear" value={formData.publishYear} onChange={handleInputChange} required className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow bg-slate-50 focus:bg-white" placeholder="YYYY" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">High-Res Image URL *</label>
                <input type="url" name="image" value={formData.image} onChange={handleInputChange} required className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow bg-slate-50 focus:bg-white" placeholder="https://example.com/premium-image.jpg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Source URL *</label>
                <input type="url" name="SourceUrl" value={formData.SourceUrl} onChange={handleInputChange} required className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow bg-slate-50 focus:bg-white" placeholder="Enter Source of the Book" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Premium Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none transition-shadow bg-slate-50 focus:bg-white" placeholder="Write a compelling summary for premium members..."></textarea>
              </div>

              {/* Modal Footer */}
              <div className="pt-6 flex gap-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-6 py-3.5 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30 transform hover:-translate-y-0.5">
                  {modalMode === 'add' ? 'Save Premium Book' : 'Update Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBookManager;
