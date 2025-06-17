import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Users", path: "/" },
  { label: "Permissions", path: "/permissions" },
  { label: "Roles", path: "/roles" },
  { label: "Hierarchy", path: "/hierarchy" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gray-800">
        Ogero Admin
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
