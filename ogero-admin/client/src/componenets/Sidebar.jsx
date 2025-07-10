import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import ThemeToggle from "./ThemeToggle.jsx";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Users", path: "/users" },
  { label: "Permissions", path: "/permissions" },
  { label: "Roles", path: "/roles" },
  { label: "Hierarchy", path: "/hierarchy" },
];

export default function Sidebar({setToken}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem("token");
     setToken(null);
    navigate("/login");
  };



  return (
    <>
      {/* 🔘 Toggle Button (mobile) */}
      
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-md dark:bg-gray-200 dark:text-black"
      >
        ☰
      </button>

      {/* 🧱 Sidebar */}
       {/* <aside className="w-64 min-h-screen flex flex-col bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-white shadow-lg border-r border-gray-200 dark:border-gray-800 transition-colors duration-300"></aside> */}
      <aside
  className={`fixed z-40 min-h-screen flex flex-col top-0 left-0 w-64
    bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg
    border-r border-gray-300 dark:border-gray-800 transform
    transition-transform duration-300
    md:static md:z-auto md:translate-x-0
    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
>
        <ThemeToggle />
        <div className="px-6 py-4 text-xl font-semibold tracking-wide border-b border-gray-800 dark:border-gray-200">
          Ogero Admin
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-black shadow-inner"
                    : "text-gray-600 hover:bg-gray-800 hover:text-white dark:text-gray-400 dark:hover:bg-gray-100 dark:hover:text-black"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-gray-800 dark:border-gray-200 space-y-3">
            <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Ogero
          </p>
        </div>
      </aside>

      {/* 🔲 Overlay when sidebar is open (on mobile only) */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
    </>
  );
}
