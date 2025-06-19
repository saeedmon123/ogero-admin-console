import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const navItems = [
  { label: "Dashboard", path: "/" },
   { label: "Users", path: "/users" },
  { label: "Permissions", path: "/permissions" },
  { label: "Roles", path: "/roles" },
  { label: "Hierarchy", path: "/hierarchy" },
 
];

export default function Sidebar() {
  return (
   <aside className="w-64 min-h-screen flex flex-col bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-white shadow-lg border-r border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <ThemeToggle />
      {/* Logo / Title */}
      <div className="px-6 py-4 text-xl font-semibold tracking-wide border-b border-gray-800 dark:border-gray-200">
         
        Ogero Admin
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
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
       
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Ogero
        </p>
      </div>
    </aside>
  );
}
