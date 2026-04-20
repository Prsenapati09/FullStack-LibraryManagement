import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Edit, Trash2, X, BookOpen } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast'; // IMPORT TOAST

const AdminBookManager = () => {
  // 1. STATE MANAGEMENT
  const [books, setBooks] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    Bookname: '',
    author: '',
    image: '',
    description: '',
    publishYear:''
  });

  // 2. FETCH DATA (READ) - Removed Token Logic
  const fetchBooks = async () => {
    try {
      const res = await axios.get("https://full-stack-library-management.vercel.app/Api/Books/books");
      
      // Safety check: Ensure we only set an array to state
      if (Array.isArray(res.data)) {
        setBooks(res.data);
      } else if (res.data && Array.isArray(res.data.books)) {
        setBooks(res.data.books);
      } else {
        setBooks([]);
      }
    } catch (error) {
      toast.error("Failed to load books."); // Toast Error
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 3. DELETE DATA
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this book?")) {
      try {
        await axios.delete(`https://full-stack-library-management.vercel.app/Api/Books/delete/${id}`);
        toast.success("Book deleted successfully!"); // Toast Success
        fetchBooks(); 
      } catch (error) {
        toast.error("Error deleting book."); // Toast Error
        console.error(error);
      }
    }
  };

  // 4. SUBMIT DATA (CREATE or UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await axios.post("https://full-stack-library-management.vercel.app/Api/Books/creat", formData);
        toast.success("Book added successfully!"); // Toast Success
      } else {
        await axios.put(`https://full-stack-library-management.vercel.app/Api/Books/update/${editId}`, formData);
        toast.success("Book updated successfully!"); // Toast Success
      }
      
      setIsModalOpen(false);
      fetchBooks();
      
    } catch (error) {
      toast.error("Error saving book data."); // Toast Error
      console.error(error);
    }
  };

  // --- UI Handlers ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setModalMode('add');
    setEditId(null);
    setFormData({ Bookname: '', author: '', image: '', description: '',publishYear:'',Url:'' });
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setModalMode('edit');
    setEditId(book._id);
    setFormData({
      // FIXED: Removed the extra space in book.Bookname
      Bookname: book.Bookname || '',
      author: book.author || '',
      image: book.image || '',
      description: book.description || '',
      publishYear:book.publishYear || '',
      Url:book.Url || ''
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 pt-24 md:pt-28 font-sans">
      
      {/* ADD TOASTER COMPONENT HERE */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500 text-white rounded-lg shadow-md">
              <BookOpen size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Library Management</h1>
              <p className="text-gray-500 text-sm mt-1">Add, update, and manage your database inventory.</p>
            </div>
          </div>
          
          <button 
            onClick={openAddModal}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg shadow-indigo-200"
          >
            <PlusCircle size={20} /> Add New Book
          </button>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-5 font-semibold">Cover</th>
                  <th className="p-5 font-semibold">Book Details</th>
                  <th className="p-5 font-semibold">Author</th>
                  <th className="p-5 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                
                {books?.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-5">
                      <img src={book.image} alt={book.title} className="w-14 h-20 object-cover rounded shadow-sm bg-gray-200" />
                    </td>
                    <td className="p-5">
                      <p className="font-bold text-gray-800 text-lg">{book.Bookname}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{book.description}</p>
                    </td>
                    <td className="p-5 font-medium text-gray-600">
                      {book.author}
                    </td>
                    
                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => openEditModal(book)} 
                          className="text-indigo-500 hover:text-white hover:bg-indigo-500 p-2 border border-indigo-100 rounded-lg transition"
                          title="Edit Book"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(book._id)} 
                          className="text-red-500 hover:text-white hover:bg-red-500 p-2 border border-red-100 rounded-lg transition"
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
                    <td colSpan="4" className="p-12 text-center text-gray-500">
                      <BookOpen size={40} className="mx-auto mb-3 text-gray-300" />
                      <p className="text-lg font-medium text-gray-600">No books found in the database.</p>
                      <p className="text-sm mt-1">Click "Add New Book" to populate your library.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- ADD / EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-800">
                {modalMode === 'add' ? 'Add a New Book' : 'Update Book Details'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 p-1.5 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Book Title *</label>
                  {/* FIXED: changed name="title" to name="Bookname" */}
                  <input type="text" name="Bookname" value={formData.Bookname} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g., The Great Gatsby" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Author Name *</label>
                  <input type="text" name="author" value={formData.author} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g., F. Scott Fitzgerald" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Publish Year *</label>
                <input type="number" name="publishYear" value={formData.publishYear} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Publish Year...." />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL *</label>
                <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://example.com/image.jpg" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Book URL *</label>
                <input type="text" name="Url" value={formData.Url} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://booksource.com/" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="5" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Write a brief summary about the book..."></textarea>
              </div>

              <div className="pt-4 flex gap-4 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-3 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition shadow-lg shadow-indigo-200">
                  {modalMode === 'add' ? 'Save Book to Database' : 'Update Book in Database'}
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