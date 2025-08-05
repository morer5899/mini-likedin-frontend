import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authConext.jsx";
createRoot(document.getElementById("root")).render(
 
    <AuthProvider>
      <ToastContainer pauseOnFocusLoss={false} autoClose={1000}/>
      <App />
    </AuthProvider>

);
