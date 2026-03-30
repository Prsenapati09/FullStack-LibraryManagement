import { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Home, Info, Mail, BookOpen, Menu, X,LogIn, UserPlus, LogOut, Crown,LayoutDashboard } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false); 
    navigate("/login"); 
  };

  return (
    <nav className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-indigo-500 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Book<span className="text-indigo-500">Nova</span>
            </h1>
          </Link>

          {/* --- DESKTOP MENU (Center) --- */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItem to="/" icon={<Home size={18} />} label="Home" />
            <NavItem to="/about" icon={<Info size={18} />} label="About" />
            <NavItem to="/books" icon={<BookOpen size={18} />} label="Books" />
            <NavItem to="/contact" icon={<Mail size={18} />} label="Contact" />
            
            {/* --- ADMIN ONLY ROUTE (DESKTOP) --- */}
            {user && user.role === "Admin" && (
               <NavItem 
                 to="/admin-dashboard" 
                 icon={<LayoutDashboard size={18} className="text-amber-400" />} 
                 label="Dashboard" 
               />
            )}
          </div>

          {/* RIGHT SIDE (Auth & Actions) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // LOGGED IN STATE
              <>
                <Link to="/prime" className="px-3 py-1.5 bg-linear-to-r from-amber-500 to-orange-500 rounded-full text-white text-sm font-bold flex items-center gap-1 hover:opacity-90 transition">
                  <Crown size={16} fill="currentColor" /> Prime
                </Link>

                <div className="h-6 w-px bg-gray-700 mx-2"></div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-200">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                      {(user.username || user.name || "U").charAt(0).toUpperCase()}
                    </div>
                    {user.username || user.name}
                  </span>
                  <button 
                    onClick={handleLogout} 
                    className="text-gray-400 hover:text-red-400 transition p-2 rounded-full hover:bg-gray-800"
                    title="Logout"
                  >
                    <LogOut size={20}/>
                  </button>
                </div>
              </>
            ) : (
              // LOGGED OUT STATE
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition font-medium flex items-center gap-2">
                  <LogIn size={18} /> Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                >
                  <UserPlus size={18} /> Register
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <MobileNavItem to="/" label="Home" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/about" label="About" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/books" label="Books" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/contact" label="Contact" onClick={() => setIsOpen(false)} />
            
            {/* --- ADMIN ONLY ROUTE (MOBILE) --- */}
            {user && user.role === "Admin" && (
                <MobileNavItem 
                  to="/admin-dashboard" 
                  label="Admin Dashboard" 
                  onClick={() => setIsOpen(false)} 
                  className="text-amber-400"
                />
            )}

            <div className="border-t border-gray-800 my-4 pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-3 py-2 bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {(user.username || user.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.username || user.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{user.role || 'Member'}</p>
                    </div>
                  </div>
                  
                  <MobileNavItem to="/prime" label="My Prime" onClick={() => setIsOpen(false)} />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-800 rounded-md flex items-center gap-2"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 px-4 py-2 text-gray-300 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                  >
                    <LogIn size={18} /> Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    <UserPlus size={18} /> Join
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- REUSABLE COMPONENTS ---

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative flex items-center gap-2 text-sm font-medium transition-colors duration-300 
      ${isActive ? "text-indigo-400" : "text-gray-400 hover:text-white"}`
    }
  >
    {({ isActive }) => (
      <>
        {icon}
        {label}
        {isActive && (
          <span className="absolute -bottom-6 left-0 w-full h-0.5 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] rounded-full" />
        )}
      </>
    )}
  </NavLink>
);

const MobileNavItem = ({ to, label, onClick, className }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block px-3 py-2 rounded-md text-base font-medium transition-colors 
      ${isActive ? "bg-indigo-500/10 text-indigo-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"} ${className || ""}`
    }
  >
    {label}
  </NavLink>
);

export default Navbar;