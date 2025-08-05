import axios from "axios";
const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;
console.log(backendUrl)
import { toast } from "react-toastify";

const AuthService = {
  login: async (formData, setLoading, navigate,setUser) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/login`, formData, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        navigate("/posts");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Login failed", { autoClose: 1500 });
    } finally {
      setLoading(false);
    }
  },

  signup: async (formData, setLoading, navigate) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/signup`, formData, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/login"); // Redirect to login after successful signup
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  },

  forgotPassword:async({email,setLoading,navigate})=>{
    try {
      const { data } = await axios.post(
        `${backendUrl}/forgetpassword`,
        { email },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        navigate(`/verifyotp?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    
    } finally {
      setLoading(false); // Stop loading
    }
  },

  verifyOtp:async({email,otpCode,navigate,setLoading})=>{
    try {
      const { data } = await axios.post(
        `${backendUrl}/verifyotp`,
        { email, otp: otpCode },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/resetpassword");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Invalid OTP");
   
    }
    setLoading(false);
  },

  resendOtp:async({email,getOtpTime,setResendLoading})=>{
    try {
      setResendLoading(true);
          const { data } = await axios.post(
            `${backendUrl}/forgetpassword`,
            { email },
            { withCredentials: true }
          );
          if (data.success) {
            toast.success(data.message);
            getOtpTime(email);
          }
        } catch (error) {
          console.log(error.message);
          toast.error(error.response?.data?.message || "Failed to resend OTP");
         
        }finally{
          setResendLoading(false);
        }
  },

  resetpassword:async({newPassword,confirmPassword,setLoading,navigate})=>{
    try {
      const { data } = await axios.post(
        `${backendUrl}/resetpassword`,
        { newPassword, confirmPassword },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Password reset successful!");
        navigate("/login"); // Redirect to login page after success
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    
    }finally{
      setLoading(false);
    }
  },

  fetchUser: async ({setLoading,setUser,setError}) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/user`, {
        withCredentials: true,
      });

      if (data.success) {
        setUser(data.user);
      } else {
        setError("Failed to load user data");
      }
    } catch (err) {
      console.error("User Fetch Error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    
    } finally {
      setLoading(false);
    }
  },

  logout:async({navigate,setLogoutLoading,setUser})=>{
    setLogoutLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/logout`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setUser(null); 
        localStorage.removeItem('user');
        navigate("/");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    
    }finally{
      setLogoutLoading(false);
    }
  }
};

export default AuthService;
