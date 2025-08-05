import React, { useState, useEffect, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/authConext';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import useView from '../hooks/useView';
import { FiHeart, FiMessageSquare, FiSend, FiX } from 'react-icons/fi';
import { memo } from 'react';

const PostFeed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Animation variants
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

  const postVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
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

  const buttonVariants = {
    hover: { 
      y: -2,
      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
      transition: { duration: 0.2 }
    },
    tap: { 
      y: 1,
      transition: { duration: 0.1 }
    }
  };

  const likeVariants = {
    initial: { scale: 1 },
    liked: { 
      scale: [1, 1.4, 1],
      color: "#e0245e",
      transition: { duration: 0.4 }
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

  // View hook for infinite scroll
  const [setLastElement] = useView(() => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  });

  // Fetch posts with pagination
  const fetchPosts = useCallback(async () => {
    if (!hasMore) return;
    
    try {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts?page=${page}&limit=10`);
      const newPosts = response.data.posts;
      
      setPosts(prevPosts => page === 1 ? newPosts : [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length >= 10);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
        { content: newPost },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setPosts(prevPosts => [response.data.post, ...prevPosts]);
      setNewPost('');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true
        }
      );

      setPosts(posts.map(post => 
        post._id === postId ? response.data.post : post
      ));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to like post');
    }
  };

  const getColorFromName = (name) => {
    if (!name) return '#1da1f2';
    const colors = [
      '#1da1f2', '#ffad1f', '#e0245e', 
      '#17bf63', '#794bc4', '#f45d22',
      '#66757f', '#3b94d9', '#9266cc'
    ];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  const getInitial = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <motion.div 
      className="post-feed-container min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-2 sm:p-4 md:p-6 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Hide scrollbar for Webkit browsers */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Floating decorative elements */}
      <motion.div
        className="hidden sm:block absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-200/30 blur-xl"
        variants={floatingVariants}
        animate="float"
      />
      
      <motion.div
        className="hidden sm:block absolute bottom-20 right-10 w-20 h-20 rounded-full bg-purple-200/30 blur-xl"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 0.5 }}
      />

      {user && (
        <motion.div 
          className="create-post-section bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 mx-auto max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <form onSubmit={handleSubmit}>
            <motion.div 
              className="post-input flex items-start gap-3 sm:gap-4"
              whileHover={{ scale: 1.005 }}
            >
              <motion.div 
                className="user-initial-avatar w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
                style={{ backgroundColor: getColorFromName(user.name || user.username) }}
                whileHover={{ rotate: [0, 5, -2, 0] }}
                transition={{ duration: 0.5 }}
              >
                {getInitial(user.name || user.username)}
              </motion.div>
              <motion.div className="flex-1 relative">
                <textarea
                  className="w-full border-none focus:ring-0 resize-none text-gray-700 placeholder-gray-400 bg-gray-50 rounded-lg p-3 sm:p-4 pr-10 sm:pr-12 focus:bg-white focus:shadow-sm transition-all duration-200 text-sm sm:text-base"
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                  maxLength={1000}
                />
                <motion.div 
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-xs sm:text-sm text-gray-400"
                  animate={{ 
                    opacity: newPost.length > 0 ? 1 : 0.5,
                    y: newPost.length > 0 ? 0 : 2
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {newPost.length}/1000
                </motion.div>
              </motion.div>
            </motion.div>
            <div className="post-actions flex justify-end mt-3 sm:mt-4">
              <motion.button 
                type="submit" 
                disabled={isLoading || !newPost.trim()}
                className={`post-button px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md flex items-center text-sm sm:text-base ${isLoading ? 'opacity-80' : ''}`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block mr-2"
                    >
                      <FiSend className="text-sm sm:text-lg" />
                    </motion.span>
                    Posting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FiSend className="mr-2 text-sm sm:text-lg" />
                    Post
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div 
            className="error-message bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 mb-4 sm:mb-6 rounded-lg shadow-sm mx-auto max-w-3xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-between items-center">
              <p className="text-sm sm:text-base">{error}</p>
              <motion.button 
                onClick={() => setError(null)} 
                className="close-error text-red-700 hover:text-red-900 p-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="text-base" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="posts-list space-y-4 sm:space-y-6 overflow-y-auto mx-auto max-w-3xl"
        variants={containerVariants}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div 
              className="post-card bg-white rounded-xl shadow-md p-4 sm:p-6 overflow-hidden"
              key={post._id}
              variants={postVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              ref={index === posts.length - 1 ? setLastElement : null}
            >
              <div className="post-header flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <motion.div 
                  className="user-initial-avatar w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
                  style={{ backgroundColor: getColorFromName(post.author?.name || post.author?.username) }}
                  whileHover={{ rotate: [0, 5, -2, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {getInitial(post.author?.name || post.author?.username || 'U')}
                </motion.div>
                <div className="post-author">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    {post.author?.name || post.author?.username || 'Unknown User'}
                  </h4>
                  <span className="post-time text-xs sm:text-sm text-gray-500">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <div className="post-content mb-3 sm:mb-4">
                <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base">{post.content}</p>
              </div>
              <div className="post-actions flex gap-2 sm:gap-4">
                <motion.button 
                  onClick={() => handleLike(post._id)}
                  className={`like-button flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm ${post.likes?.includes(user?._id) ? 'text-red-500 bg-red-50' : 'text-gray-500 bg-gray-50'}`}
                  variants={likeVariants}
                  animate={post.likes?.includes(user?._id) ? "liked" : "initial"}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiHeart className="text-xs sm:text-sm" />
                  {post.likes?.length || 0} Likes
                </motion.button>
                <motion.button 
                  className="comment-button flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm text-gray-500 bg-gray-50"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiMessageSquare className="text-xs sm:text-sm" />
                  {post.comments?.length || 0} Comments
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            className="loading-spinner flex flex-col items-center justify-center py-6 sm:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="spinner w-8 h-8 sm:w-10 sm:h-10 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base">Loading more posts...</p>
          </motion.div>
        )}
        
        {posts.length === 0 && !isLoading && (
          <motion.div 
            className="no-posts bg-white rounded-xl shadow-md p-6 sm:p-8 text-center mx-auto max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-gray-600 text-sm sm:text-base">No posts yet. Be the first to share!</p>
          </motion.div>
        )}
        
        {!hasMore && posts.length > 0 && (
          <motion.div 
            className="no-more-posts text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p>You've reached the end</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default memo(PostFeed);