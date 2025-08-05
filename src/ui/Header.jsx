import React, { useContext,memo } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/authConext';
import { Link } from 'react-router-dom';
import { FiLogIn, FiHome, FiUser, FiX, FiMenu } from 'react-icons/fi';

const Header = () => {
  const { user } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
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
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Function to get user's first initial
  const getInitial = () => {
    if (!user || !user.username) return 'U';
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <motion.header 
      className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          variants={itemVariants}
        >
          <Link to={user ? "/posts" : "/"} className="flex items-center">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              SocialApp
            </motion.h1>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex items-center space-x-6"
          variants={itemVariants}
        >
          {user && (
            <>
              <motion.div 
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link 
                  to="/posts" 
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiHome className="mr-1" /> 
                  <motion.span>Home</motion.span>
                </Link>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link 
                  to="/profile" 
                  className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <FiUser className="mr-1" /> 
                  <motion.span>Profile</motion.span>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Mobile Menu Button */}
        {user && (
          <motion.button
            className="md:hidden p-2 rounded-lg focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
          >
            {mobileMenuOpen ? (
              <FiX className="text-xl text-gray-700" />
            ) : (
              <FiMenu className="text-xl text-gray-700" />
            )}
          </motion.button>
        )}

        {/* Profile Section */}
        <motion.div 
          className="flex items-center ml-4"
          variants={itemVariants}
        >
          {user ? (
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: [0, 10, -5, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                to="/profile" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-md hover:shadow-lg transition-all"
              >
                {getInitial()}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(99, 102, 241, 0.3)"
              }}
              whileTap={{ 
                scale: 0.98,
                boxShadow: "0 2px 5px rgba(99, 102, 241, 0.3)"
              }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                to="/login" 
                className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                <FiLogIn className="mr-2" /> 
                <motion.span>Login</motion.span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      {user && (
        <motion.div 
          className="md:hidden bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden"
          initial="hidden"
          animate={mobileMenuOpen ? "visible" : "hidden"}
          variants={mobileMenuVariants}
        >
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <motion.div 
              variants={mobileItemVariants}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="border-b border-gray-200/50 pb-2"
            >
              <Link 
                to="/posts" 
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiHome className="mr-3 text-lg" /> 
                <span>Home</span>
              </Link>
            </motion.div>
            <motion.div 
              variants={mobileItemVariants}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="border-b border-gray-200/50 pb-2"
            >
              <Link 
                to="/profile" 
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiUser className="mr-3 text-lg" /> 
                <span>Profile</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Floating decorative elements */}
      {mobileMenuOpen && (
        <>
          <motion.div
            className="absolute top-20 left-1/4 w-8 h-8 rounded-full bg-blue-200/50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div
            className="absolute top-32 right-1/4 w-6 h-6 rounded-full bg-purple-200/50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        </>
      )}
    </motion.header>
  );
};

export default memo(Header);