import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../ui/Input";
import Button from "../ui/Button";
import AuthService from "./authServices/authService";
import { FiUser, FiMail, FiLock, FiEdit2, FiArrowRight } from "react-icons/fi";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await AuthService.signup(formData, setLoading, navigate);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

  const floatingBalloon = {
    float: {
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-400/20 blur-xl"
        variants={floatingBalloon}
        animate="float"
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-purple-400/20 blur-xl"
        variants={floatingBalloon}
        animate="float"
        transition={{ delay: 1, duration: 6 }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-indigo-300/20 blur-xl"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-14 h-14 rounded-full bg-pink-300/20 blur-xl"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md z-10"
      >
        {/* Header section */}
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
            Join Us Today
          </motion.h2>
          <motion.p 
            className="text-blue-100 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Create your account in just a minute
          </motion.p>
        </motion.div>

        {/* Main form section */}
        <div className="p-8">
          {error && (
            <motion.div 
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <motion.form onSubmit={handleSubmit} className="space-y-5">
            {/* Username field */}
            <motion.div variants={itemVariants}>
              <Input
                value={formData.username}
                label="Username"
                onChangeHandler={onChangeHandler}
                required={true}
                name="username"
                type="text"
                placeholder="Enter your username"
                loading={loading}
                icon={<FiUser className="text-gray-400" />}
                minLength={3}
                maxLength={30}
              />
            </motion.div>

            {/* Email field */}
            <motion.div variants={itemVariants}>
              <Input
                value={formData.email}
                label="Email"
                onChangeHandler={onChangeHandler}
                required={true}
                name="email"
                type="email"
                placeholder="Enter your email"
                loading={loading}
                icon={<FiMail className="text-gray-400" />}
              />
            </motion.div>

            {/* Password field */}
            <motion.div variants={itemVariants}>
              <Input
                value={formData.password}
                label="Password"
                onChangeHandler={onChangeHandler}
                required={true}
                name="password"
                type="password"
                placeholder="Create a password"
                loading={loading}
                icon={<FiLock className="text-gray-400" />}
                minLength={6}
              />
            </motion.div>

            {/* Bio field */}
            <motion.div variants={itemVariants}>
              <Input
                value={formData.bio}
                label="Bio (Optional)"
                onChangeHandler={onChangeHandler}
                required={false}
                name="bio"
                type="text"
                placeholder="Tell us about yourself (max 500 chars)"
                loading={loading}
                icon={<FiEdit2 className="text-gray-400" />}
                maxLength={500}
                textarea={true}
                rows={3}
              />
            </motion.div>

            {/* Submit button */}
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                loading={loading}
                initialText="Sign Up Now"
                loadingText="Creating account..."
                icon={<FiArrowRight className="ml-2" />}
                whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              />
            </motion.div>
          </motion.form>

          {/* Login link */}
          <motion.div
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <motion.span
                whileHover={{ x: 2 }}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Sign In
              </motion.span>
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">Terms</span> and{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default memo(SignUp);