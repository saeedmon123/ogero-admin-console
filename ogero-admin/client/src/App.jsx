import { BrowserRouter, Routes, Route  ,Navigate } from 'react-router-dom';
import Sidebar from './componenets/Sidebar.jsx';
import { useState, useEffect } from "react";
import Users from "./pages/Users.jsx";
import Permissions from "./pages/Permissions.jsx";
import Roles from "./pages/Roles.jsx";
import Hierarchy from "./pages/Hierarchy.jsx";
import NotFound from './pages/NotFound.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  
   useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="relative min-h-screen md:flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      
      {/* Sidebar */}
       {token && <Sidebar setToken={setToken} />}

      {/* Main content area */}
  <main className="relative z-0 flex-1 transition-colors duration-300">
  <div className="min-h-screen px-6 py-8">
    <Routes>
       <Route path="/login" element={<Login setToken={setToken} />} />
       <Route
                path="/"
                element={
                  token ? <Dashboard /> : <Navigate to="/login" />
                }
              />
      <Route path="/permissions" element={ token ? <Permissions /> : <Navigate to="/login" />} />
      <Route path="/roles" element={token ?  <Roles /> : <Navigate to="/login" />} />
      <Route path="/hierarchy" element={token ? <Hierarchy /> : <Navigate to="/login" />} />
      <Route path="/users" element={token ? <Users /> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFound /> } />
    </Routes>
  </div>
</main>
    </div>
  );
}
