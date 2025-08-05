import axios from "axios";
import { useMemo } from "react";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const backend_url=useMemo(()=>import.meta.env.VITE_BACKEND_URL,[]);
  const [otpExpiryTime, setOtpExpiryTime] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOtpTime = async (email) => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/auth/getotpexpiry?email=${email}`,
        { withCredentials: true }
      );
      if (data.success) {
        setOtpExpiryTime(data.otpExpiryTime);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backend_url}/api/auth/user`,
        { withCredentials: true }
      );
      if (data.success) {
        console.log("User data received:", data.user); // Debug log
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  const handleLoginSuccess = (userData) => {
    console.log("Login successful, user data:", userData); // Debug log
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  useEffect(() => {
    fetchUser();
    
    console.log(location)
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        getOtpTime,
        otpExpiryTime,
        user,
        loading,
        setUser,
        fetchUser,
        handleLoginSuccess // Add this to context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};