import { useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Mail, Lock, LogIn, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from 'react-hot-toast'; // IMPORT TOAST


const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 3. Get login function

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      username: data.username,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:3000/Api/users/Login", userInfo);
      
      // Assumes your backend returns: { token: "...", user: { role: "..." } }
      if (res.data && res.data.token) { 
        
        // 4. Use Context to handle state and storage
        login(res.data.token); 
        
        alert("Login Successful!");
        // Toaster.success("Login Sucessfully 🎉")

        // 5. Check role from response OR decoded token
        // (Assuming res.data.user exists, otherwise use jwtDecode in context)
        const userRole = res.data.user?.role || "User"; 

        if (userRole === "Admin") {
             navigate("/admin-dashboard");
        } else {
             navigate("/");
        }
      }
    } catch (err) {
      if (err.response) {
        alert("Error: " + err.response.data.message);
      } else {
        console.error(err);
      }
    }
  };
  
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4">

      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl relative">
        
        {/* Close Button */}
        <Link to="/" className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </Link>

        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Login to access your library</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* user Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register("username", { required: true })}
              />
            </div>
            {errors.username && <span className="text-sm text-red-500">username is required</span>}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && <span className="text-sm text-red-500">Password is required</span>}
          </div>

          {/* Submit Button */}
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