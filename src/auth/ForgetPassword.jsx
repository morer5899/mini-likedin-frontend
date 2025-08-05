import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../ui/Input";
import Button from "../ui/Button";
import AuthService from "./authServices/authService";
import { FiMail, FiArrowRight } from "react-icons/fi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = useCallback((e) => setEmail(e.target.value), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await AuthService.forgotPassword({ email, setLoading, navigate });
  };

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
            Reset Password
          </motion.h2>
          <motion.p 
            className="text-blue-100 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Enter your email to receive OTP
          </motion.p>
        </motion.div>

        <div className="p-8">
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Input
                type="email"
                name="email"
                value={email}
                onChangeHandler={onChangeHandler}
                label="Email Address"
                required={true}
                placeholder="Enter your registered email"
                loading={loading}
                icon={<FiMail className="text-gray-400" />}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                loading={loading}
                initialText="Send OTP"
                loadingText="Sending OTP..."
                icon={<FiArrowRight className="ml-2" />}
                whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <motion.p
              whileHover={{ x: 2 }}
              className="text-gray-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Remember your password? <span className="text-blue-600 font-medium hover:underline">Sign In</span>
            </motion.p>
          </motion.div>
        </div>

        {/* Animated footer */}
        <motion.div 
          className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-gray-500">
            We'll send you a one-time password to reset your account
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default React.memo(ForgetPassword);