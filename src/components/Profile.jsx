import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import AuthService from "../auth/authServices/authService";
import { AuthContext } from "../context/authConext";
import { formatDistanceToNow } from 'date-fns';
import { FiLogOut, FiUser, FiMail, FiCalendar, FiEdit2 } from 'react-icons/fi';
import Loader from "../ui/Loader";
import { memo } from "react";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Animation variants matching login page theme
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      y: -3,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      transition: { duration: 0.3 }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      await AuthService.fetchUser({ setLoading, setError, setUser });
    } catch (err) {
      setError("Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await AuthService.logout({ navigate, setLogoutLoading, setUser });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Loader message="Loading profile..." />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-white p-6 rounded-xl shadow-lg text-red-500">
          {error}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Floating decorative elements matching login page */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-200/30 blur-xl"
        variants={floatingVariants}
        animate="float"
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-purple-200/30 blur-xl"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 0.5 }}
      />

      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="profile-header bg-white rounded-xl shadow-lg p-6 mb-6 text-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.div 
            className="profile-avatar mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-4xl flex items-center justify-center mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: [0, 5, -2, 0] }}
            transition={{ duration: 0.5 }}
          >
            {user.username?.charAt(0).toUpperCase() || 'U'}
          </motion.div>
          <motion.h1 className="text-2xl font-bold text-gray-800 mb-2">
            {user.username}
          </motion.h1>
          <motion.p className="profile-join-date text-gray-500">
            Joined {formatDistanceToNow(new Date(user.createdAt))} ago
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          variants={containerVariants}
        >
          <motion.div 
            className="detail-card bg-white rounded-xl shadow-md p-6"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <FiUser className="mr-2 text-blue-500" /> Account Information
            </h3>
            <div className="space-y-3">
              <motion.div 
                className="detail-item flex justify-between py-2 border-b border-gray-100"
                whileHover={{ x: 5 }}
              >
                <span className="text-gray-600 flex items-center">
                  <FiUser className="mr-2" /> Username:
                </span>
                <span className="font-medium">{user.username}</span>
              </motion.div>
              <motion.div 
                className="detail-item flex justify-between py-2 border-b border-gray-100"
                whileHover={{ x: 5 }}
              >
                <span className="text-gray-600 flex items-center">
                  <FiMail className="mr-2" /> Email:
                </span>
                <span className="font-medium">{user.email}</span>
              </motion.div>
              <motion.div 
                className="detail-item flex justify-between py-2"
                whileHover={{ x: 5 }}
              >
                <span className="text-gray-600 flex items-center">
                  <FiCalendar className="mr-2" /> Member Since:
                </span>
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {user.bio && (
            <motion.div 
              className="detail-card bg-white rounded-xl shadow-md p-6"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <FiEdit2 className="mr-2 text-purple-500" /> Bio
              </h3>
              <motion.p 
                className="text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {user.bio}
              </motion.p>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          className="profile-posts bg-white rounded-xl shadow-md p-6 mb-6"
          variants={cardVariants}
          whileHover="hover"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Posts</h2>
          {user.posts?.length > 0 ? (
            <div className="space-y-4">
              <AnimatePresence>
                {user.posts.map(post => (
                  <motion.div 
                    className="post-card bg-gray-50 rounded-lg p-4"
                    key={post._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="post-content mb-2">
                      <p className="text-gray-700">{post.content}</p>
                    </div>
                    <div className="post-meta text-sm text-gray-500">
                      <span>
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.p 
              className="no-posts text-gray-500 text-center py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              No posts yet
            </motion.p>
          )}
        </motion.div>

        <motion.div 
          className="profile-actions flex justify-center"
          variants={cardVariants}
        >
          <Button
            type="button"
            loading={logoutLoading}
            initialText="Logout"
            loadingText="Logging out..."
            onClick={handleLogout}
            icon={<FiLogOut className="ml-2" />}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default memo(Profile);