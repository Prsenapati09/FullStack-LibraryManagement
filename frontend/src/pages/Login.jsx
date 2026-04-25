import { useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Mail, Lock, LogIn, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      username: data.username,
      password: data.password,
    };

    try {
      const res = await axios.post("https://full-stack-library-management.vercel.app/Api/users/Login", userInfo);
      
      if (res.data && res.data.token) { 
        // 1. Update Auth State
        login(res.data.token); 
        
        // 2. Show Success Toast
        toast.success("Login Successfully 🎉");

        // 3. Determine Role and Redirect
        const userRole = res.data.user?.role || "User"; 
        
        // Short delay allows the user to actually see the success toast before the page flips
        setTimeout(() => {
          if (userRole === "Admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        }, 1000); 
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message || "Invalid credentials";
        
        // Handle inline errors under text fields
        if (errorMessage.toLowerCase().includes("user")) {
          setError("username", { type: "manual", message: errorMessage });
        } else if (errorMessage.toLowerCase().includes("password")) {
          setError("password", { type: "manual", message: errorMessage });
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Network error. Please try again.");
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

        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Login to access your library</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Username Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${errors.username ? "text-red-400" : "text-gray-400"}`} />
              </div>
              <input
                type="text"
                placeholder="Enter your username"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition ${
                    errors.username ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
                }`}
                {...register("username", { required: "Username is required" })}
              />
            </div>
            {errors.username && <span className="text-sm text-red-500">{errors.username.message}</span>}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${errors.password ? "text-red-400" : "text-gray-400"}`} />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition ${
                    errors.password ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
                }`}
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
          >
            <LogIn size={20} /> Login
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;