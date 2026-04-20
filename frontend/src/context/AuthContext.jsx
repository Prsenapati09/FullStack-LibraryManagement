import { createContext, useState, useEffect } from "react"; // Fixed import source
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

// specific prop name "children" (lowercase) is standard React practice
export const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decode = jwtDecode(token);
                // Check if token is expired
                if (decode.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser(decode);
                }
            } catch (error) {
                console.error("Invalid token", error);
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const decode = jwtDecode(token);
        setUser(decode);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};