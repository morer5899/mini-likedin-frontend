# Social Media App

A modern, responsive social media application built with React, featuring user authentication, post sharing, and real-time interactions with beautiful animations.

## 🚀 Features

### Authentication System
- **User Registration** - Create new accounts with username, email, password, and bio
- **Secure Login** - JWT-based authentication with persistent sessions
- **Password Recovery** - OTP-based password reset via email
- **Protected Routes** - Automatic redirection based on authentication status

### Social Features
- **Post Feed** - Infinite scroll timeline with real-time updates
- **User Profiles** - View user information and post history
- **Like System** - Interactive post engagement
- **Responsive Design** - Optimized for desktop and mobile devices

### User Experience
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Loading States** - Beautiful loading animations and skeleton screens
- **Toast Notifications** - Real-time feedback for user actions
- **Lazy Loading** - Optimized performance with code splitting

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: React Icons (Feather Icons)
- **Date Handling**: date-fns
- **Styling**: CSS3 with Gradient Backgrounds

## 📁 Project Structure

\`\`\`
src/
├── auth/                    # Authentication components
│   ├── Login.jsx           # Login form component
│   ├── Signup.jsx          # Registration form
│   ├── ForgetPassword.jsx  # Password recovery
│   ├── VerifyOtp.jsx       # OTP verification
│   ├── ResetPassword.jsx   # Password reset form
│   └── authServices/       # Authentication API services
│       └── authService.js  # Auth API calls
├── components/             # Main application components
│   ├── PostFeed.jsx        # Social media feed
│   ├── Profile.jsx         # User profile page
│   └── UserPosts.jsx       # User-specific posts
├── context/                # React Context providers
│   └── authContext.js      # Authentication state management
├── hooks/                  # Custom React hooks
│   └── useView.js          # Intersection Observer hook
├── pages/                  # Page components
│   └── Home.jsx            # Landing page
├── ui/                     # Reusable UI components
│   ├── Header.jsx          # Navigation header
│   ├── Loader.jsx          # Loading animation
│   ├── Input.jsx           # Form input component
│   └── Button.jsx          # Reusable button component
├── App.jsx                 # Main app component with routing
└── App.css                 # Global styles
\`\`\`

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API server running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd social-media-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm start
   # or
   yarn start
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_BACKEND_URL=http://localhost:8080
\`\`\`

### Backend Requirements

The application expects a REST API with the following endpoints:

#### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get current user
- `POST /api/auth/forgetpassword` - Request password reset
- `POST /api/auth/verifyotp` - Verify OTP
- `POST /api/auth/resetpassword` - Reset password
- `GET /api/auth/getotpexpiry` - Get OTP expiry time

#### Posts Endpoints
- `GET /api/posts` - Get posts with pagination
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id/like` - Like/unlike post
- `GET /api/posts/:userId/posts` - Get user-specific posts

#### User Endpoints
- `GET /api/users/:id` - Get user profile

## 🎨 Key Components

### Authentication Flow

1. **Public Routes** - Accessible without authentication
   - Home page (`/`)
   - Login (`/login`)
   - Signup (`/signup`)
   - Password recovery flow

2. **Protected Routes** - Require authentication
   - Post feed (`/posts`)
   - User profile (`/profile`)

### State Management

The app uses React Context for global state management:

- **AuthContext** - Manages user authentication state
- **Persistent Storage** - User data stored in localStorage
- **Loading States** - Global loading management

### Animation System

Framer Motion provides smooth animations:

- **Page Transitions** - Smooth route changes
- **Component Animations** - Staggered children animations
- **Micro-interactions** - Button hovers, form interactions
- **Loading Animations** - 3D cube loader with gradient effects

## 📱 Responsive Design

- **Mobile-First** - Optimized for mobile devices
- **Breakpoint System** - Responsive across all screen sizes
- **Touch-Friendly** - Optimized for touch interactions
- **Progressive Enhancement** - Works on all modern browsers

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **HTTP-Only Cookies** - Secure cookie storage
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Client-side form validation
- **Protected Routes** - Route-level access control

## 🚀 Performance Optimizations

- **Lazy Loading** - Code splitting for better performance
- **Memoization** - React.memo for component optimization
- **Infinite Scroll** - Efficient data loading
- **Image Optimization** - Optimized image loading
- **Bundle Splitting** - Reduced initial load time

## 🎯 Usage Examples

### Creating a Post
\`\`\`javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await axios.post('/api/posts', {
    content: newPost
  });
  setPosts([response.data.post, ...posts]);
};
\`\`\`

### Authentication Check
\`\`\`javascript
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <Loader />;
  return user ? children : <Navigate to="/login" />;
};
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- OTP expiry timer needs backend synchronization
- Image upload functionality not yet implemented
- Comment system is in development

## 🔮 Future Enhancements

- [ ] Real-time messaging
- [ ] Image/video post support
- [ ] Push notifications
- [ ] Dark mode theme
- [ ] Advanced user search
- [ ] Post categories/tags
- [ ] Social sharing features


## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons
- [React Router](https://reactrouter.com/) for routing
- [Axios](https://axios-http.com/) for HTTP requests
