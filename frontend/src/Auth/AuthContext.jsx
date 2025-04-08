import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true);
    let role=user?.role;
     
    const navigate = useNavigate();
    
    // Get CSRF Cookie
    const csrf = async () => {
        await axios.get("/sanctum/csrf-cookie");
    };

    // Get Authenticated User
    const getUser = async () => { 
        const token = localStorage.getItem("token"); // Get token from localStorage
            if (!token) {
                console.log("No token found, skipping user fetch.");
                setLoading(false);
                return; // Stop execution if no token
            }
            setLoading(true);
            try {
                const { data } = await axios.get("api/user");
                setUser(data.user);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            } 
    };
    
    
    // Login User
    const login = async ({ email, password }) => {
        await csrf();
        setLoading(true);
        try {
            const response = await axios.post("api/login", { email, password });
            const role =  response.data.user?.role;

            const fullToken = response.data.token; // Get full token
            const extractedToken = fullToken.split('|')[1].trim(); // Extract token after '|'
            localStorage.setItem("token", extractedToken); // Save token to localStorage
            localStorage.setItem("role",role); // Save token to localStorage
              
            await getUser(); // Fetch user after login
            if(role === '1'){
                navigate("/admin");
            }else if(role === '2'){
                navigate('/moderator')
            }else{
                navigate('/login')
            }

            setError(null)
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.errors || "An error occurred");
            if(error.response?.data?.message == "وشە نهێنیەکەت هەڵەیە"){
                setError({
                    password:error.response?.data?.message
                })
            }
        }finally{
            setLoading(false);
        }
    };

    // Logout User
    const logout = async () => {
        await csrf();
        setLoading(true);
        try {
            await axios.get("api/logout"); // No need to send { id } if it's not required
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            console.log("Removing token...");
            localStorage.removeItem("token"); // Ensuring token is removed
            localStorage.removeItem("role");
            setUser(null); // Clear user state
            navigate("/"); // Redirect after logout
            setLoading(false);
        }
    };
    

    useEffect(() => { 
        getUser();
        
    }, []);
    
 

    return (
        <AuthContext.Provider value={{ user, loading, setLoading, role, error, login, logout, getUser ,csrf}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for Accessing Auth Context
export default function UseAuth() { 
    return useContext(AuthContext);
}
