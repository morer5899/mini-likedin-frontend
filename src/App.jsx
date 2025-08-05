import './App.css';
import { Route, Routes, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useContext, Suspense } from 'react';
import { AuthContext } from './context/authConext';
import { lazy } from 'react';
import Header from './ui/Header';
import Loader from './ui/Loader';
import { memo } from 'react';

// Lazy load components
const SignUP = lazy(() => import('./auth/Signup'));
const Login = lazy(() => import('./auth/Login'));
const ForgetPassword = lazy(() => import('./auth/ForgetPassword'));
const VerifyOtp = lazy(() => import('./auth/VerifyOtp'));
const ResetPassword = lazy(() => import('./auth/ResetPassword'));
const Home = lazy(() => import('./pages/Home'));
const PostFeed = lazy(() => import('./components/PostFeed'));
const Profile = lazy(() => import('./components/Profile'));

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    // Check if we have any indication of a possible session
    const possibleSession = localStorage.getItem('user') || 
                          document.cookie.includes('sessionid');
    return possibleSession ? <Loader /> : <Navigate to="/login" replace />;
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    const hasPotentialSession = localStorage.getItem('user') || 
                              document.cookie.includes('session');
    return hasPotentialSession ? <Loader /> : children;
  }
  return user ? <Navigate to="/posts" replace /> : children;
};

const LayoutWithHeader = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && <Header />}
      <Outlet />
    </>
  );
};

const AuthLayout = () => {
  return <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Routes with conditional header */}
          <Route element={<LayoutWithHeader />}>
            <Route path='/' element={<PublicRoute><Home /></PublicRoute>} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/posts' element={<ProtectedRoute><PostFeed /></ProtectedRoute>} />
          </Route>
          
          {/* Auth routes without header */}
          <Route element={<AuthLayout />}>
            <Route path='/signup' element={<PublicRoute><SignUP /></PublicRoute>} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/forgetpassword' element={<PublicRoute><ForgetPassword /></PublicRoute>} />
            <Route path='/verifyotp' element={<PublicRoute><VerifyOtp /></PublicRoute>} />
            <Route path='/resetpassword' element={<PublicRoute><ResetPassword /></PublicRoute>} />
          </Route>
          
          {/* 404 */}
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default memo(App);