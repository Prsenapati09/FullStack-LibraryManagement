
import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useForm } from "react-hook-form"; 
import axios from "axios"; 
import { User, Mail, Lock, X } from "lucide-react"; 
import toast, { Toaster } from 'react-hot-toast'; 

const Signup = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      username: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:3000/Api/users/signup", userInfo);
      console.log(res.data);
      
      if (res.data) {
        toast.success("Register successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        // Small delay so they can see the toast before redirecting
        setTimeout(() => {
          navigate("/Login"); 
        }, 1000); 
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message); // Changed to toast for consistency
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl relative">
        
        <Link to="/" className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </Link>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join BookNova to start reading</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* 1. Username Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                {...register("fullname", { 
                  required: "Full name is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/, // Only allows letters and spaces
                    message: "Name can only contain letters and spaces"
                  },
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long"
                  }
                })}
              />
            </div>
            {/* Display dynamic error message */}
            {errors.fullname && <span className="text-sm text-red-500 ml-1">{errors.fullname.message}</span>}
          </div>

          {/* 2. Email Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    // Standard Email Regex Pattern
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address (e.g., user@gmail.com)"
                  }
                })}
              />
            </div>
            {/* Display dynamic error message */}
            {errors.email && <span className="text-sm text-red-500 ml-1">{errors.email.message}</span>}
          </div>

          {/* 3. Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                {...register("password", { 
                  required: "Password is required" 
                })}
              />
            </div>
            {errors.password && <span className="text-sm text-red-500 ml-1">{errors.password.message}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg shadow-indigo-500/30"
          >
            Register
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;