import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { FiUser, FiCalendar, FiHeart, FiMessageSquare } from 'react-icons/fi';
import Loader from '../ui/Loader';
import { memo } from 'react';

const UserPosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // New animation variants with different effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      rotate: [0, 15, -15, 0],
      transition: { duration: 0.7 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  const postCardVariants = {
    hidden: { opacity: 0, x: -100, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const metaItemVariants = {
    hover: {
      scale: 1.1,
      color: "#6366f1",
      transition: { duration: 0.2 }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setIsLoading(true);
        const [postsResponse, userResponse] = await Promise.all([
          axios.get(`${VITE_BACKEND_URL}/api/posts/${id}/posts`),
          axios.get(`${VITE_BACKEND_URL}http://localhost:8080/api/users/${id}`)
        ]);
        setPosts(postsResponse.data.posts);
        setUserInfo(userResponse.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [id]);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Enhanced floating elements with different motion */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-200/30 blur-xl"
        variants={floatingVariants}
        animate="float"
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-purple-200/30 blur-xl"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 0.3, duration: 12 }}
      />

      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {userInfo && (
          <motion.div 
            className="profile-header bg-white rounded-xl shadow-lg p-6 mb-6 text-center"
            variants={headerVariants}
          >
            <motion.div 
              className="profile-avatar mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-4xl flex items-center justify-center mb-4"
              variants={avatarVariants}
              whileHover="hover"
            >
              {userInfo.username?.charAt(0).toUpperCase() || 'U'}
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {userInfo.username}
            </motion.h1>
            <motion.p 
              className="profile-join-date text-gray-500 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FiCalendar className="mr-2" />
              Joined {formatDistanceToNow(new Date(userInfo.createdAt))} ago
            </motion.p>
          </motion.div>
        )}

        <motion.div 
          className="profile-posts bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2 
            className="text-xl font-semibold text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {userInfo ? `${userInfo.username}'s Posts` : 'Posts'}
          </motion.h2>
          
          {isLoading && posts.length === 0 ? (
            <div className="flex justify-center py-8">
              <Loader message="Loading posts..." />
            </div>
          ) : error ? (
            <motion.div 
              className="profile-error bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
            >
              {error}
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.p 
              className="no-posts text-gray-500 text-center py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              This user hasn't posted anything yet.
            </motion.p>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {posts.map((post, index) => (
                  <motion.div 
                    className="post-card bg-gray-50 rounded-lg p-4"
                    key={post._id}
                    custom={index}
                    variants={postCardVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -100 }}
                    whileHover="hover"
                  >
                    <div className="post-content mb-2">
                      <p className="text-gray-700">{post.content}</p>
                    </div>
                    <div className="post-meta flex items-center text-sm text-gray-500 space-x-4">
                      <motion.span 
                        className="flex items-center"
                        variants={metaItemVariants}
                        whileHover="hover"
                      >
                        <FiHeart className="mr-1" />
                        {post.likeCount || 0} likes
                      </motion.span>
                      <motion.span 
                        className="flex items-center"
                        variants={metaItemVariants}
                        whileHover="hover"
                      >
                        <FiMessageSquare className="mr-1" />
                        {post.commentCount || 0} comments
                      </motion.span>
                      <motion.span
                        variants={metaItemVariants}
                        whileHover="hover"
                      >
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default memo(UserPosts);