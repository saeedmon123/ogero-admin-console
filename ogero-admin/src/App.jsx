import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './componenets/Sidebar.jsx';

import Users from "./pages/Users";
import Permissions from "./pages/Permissions";
import Roles from "./pages/Roles";
import Hierarchy from "./pages/Hierarchy";
import NotFound from './pages/NotFound.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen md:flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
  <main className="relative z-0 flex-1 transition-colors duration-300">
  <div className="min-h-screen px-6 py-8">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/permissions" element={<Permissions />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/hierarchy" element={<Hierarchy />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
</main>
    </div>
  );
}
