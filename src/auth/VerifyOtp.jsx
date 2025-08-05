import React, { useContext, useState, useEffect, useRef, useCallback, memo } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authConext";
import Button from "../ui/Button";
import AuthService from "./authServices/authService";
import { FiMail, FiClock, FiRefreshCw } from "react-icons/fi";

const VerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const { getOtpTime, otpExpiryTime } = useContext(AuthContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  useEffect(() => {
    if (otpExpiryTime) {
      const expiryTimestamp = new Date(otpExpiryTime).getTime();
      const now = Date.now();
      const timeRemaining = Math.max(0, Math.floor((expiryTimestamp - now) / 1000));
      setTimeLeft(timeRemaining);
    }
  }, [otpExpiryTime]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleOtpChange = useCallback((index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  }, [otp]);

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) {
      toast.error("Invalid OTP. Please enter a 6-digit number.");
      return;
    }
    const otpArray = pastedData.split("");
    setOtp(otpArray);
    if (inputRefs.current[5]) {
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }
    setLoading(true);
    await AuthService.verifyOtp({ otpCode, navigate, setLoading, email });
  };

  const resendOtp = async () => {
    setResendLoading(true);
    await AuthService.resendOtp({ email, getOtpTime, setResendLoading });
  };

  useEffect(() => {
    if (email) {
      getOtpTime(email);
    }
  }, [email, getOtpTime]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Balloon 1 (Blue) */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-400/20"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating Balloon 2 (Purple) */}
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-purple-400/20"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md z-10"
      >
        {/* Animated header */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-white"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Verify OTP
          </motion.h2>
          <motion.p 
            className="text-blue-100 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Enter the 6-digit code sent to your email
          </motion.p>
        </motion.div>

        <div className="p-8">
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center justify-center text-gray-600 mb-2">
              <FiMail className="mr-2" />
              <span className="font-medium">{email}</span>
            </div>
            
            {timeLeft > 0 ? (
              <motion.div 
                className="flex items-center justify-center text-red-500"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <FiClock className="mr-2" />
                <span>
                  Expires in: {Math.floor(timeLeft / 60)}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </span>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center justify-center text-red-500"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ type: "spring" }}
              >
                <span>OTP Expired!</span>
              </motion.div>
            )}
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="flex justify-center gap-3"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <motion.input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                  maxLength="1"
                  inputMode="numeric"
                  disabled={loading}
                  whileFocus={{ scale: 1.05, borderColor: "#3b82f6" }}
                />
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              {timeLeft === 0 ? (
                <Button
                  type="button"
                  loading={resendLoading}
                  initialText="Resend OTP"
                  loadingText="Resending..."
                  icon={<FiRefreshCw className="ml-2" />}
                  onClick={resendOtp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                />
              ) : (
                <Button
                  type="submit"
                  loading={loading}
                  initialText="Verify & Continue"
                  loadingText="Verifying..."
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                />
              )}
            </motion.div>
          </motion.form>
        </div>

        {/* Animated footer */}
        <motion.div 
          className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-gray-500">
            Didn't receive the code? Check your spam folder or request a new code
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default memo(VerifyOtp);