import React, { useCallback, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../ui/Input";
import Button from "../ui/Button";
import AuthService from "./authServices/authService";
import { AuthContext } from "../context/authConext";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthService.login(formData, setLoading, navigate, setUser);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md"
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
            Welcome Back
          </motion.h2>
          <motion.p 
            className="text-blue-100 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to your account
          </motion.p>
        </motion.div>

        <div className="p-8">
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div
              custom={0}
              variants={itemVariants}
            >
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

            <motion.div
              custom={1}
              variants={itemVariants}
            >
              <Input
                value={formData.password}
                label="Password"
                onChangeHandler={onChangeHandler}
                required={true}
                name="password"
                type="password"
                placeholder="Enter your password"
                loading={loading}
                icon={<FiLock className="text-gray-400" />}
              />
            </motion.div>

            <motion.div
              custom={2}
              variants={itemVariants}
              className="flex justify-end"
            >
              <motion.p
                whileHover={{ x: 2 }}
                className="text-sm text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate("/forgetpassword")}
              >
                Forgot Password?
              </motion.p>
            </motion.div>

            <motion.div
              custom={3}
              variants={itemVariants}
            >
              <Button
                type="submit"
                loading={loading}
                initialText="Login"
                loadingText="Logging in..."
                icon={<FiArrowRight className="ml-2" />}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>
          </motion.form>

          <motion.div
            custom={4}
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <motion.span
                whileHover={{ x: 2 }}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </motion.span>
            </p>
          </motion.div>
        </div>

        {/* Animated footer */}
        <motion.div 
          className="bg-gray-50 px-6 py-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms and Conditions
          </p>
        </motion.div>
      </motion.div>

      {/* Floating animated elements */}
      <motion.div
        className="absolute top-10 left-10 w-12 h-12 rounded-full bg-blue-200/50"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-purple-200/50"
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </div>
  );
};

export default React.memo(Login);