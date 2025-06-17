
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './componenets/Sidebar.jsx';

import Users from "./pages/Users";
import Permissions from "./pages/Permissions";
import Roles from "./pages/Roles";
import Hierarchy from "./pages/Hierarchy";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
     <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/hierarchy" element={<Hierarchy />} />
        </Routes>
      </main>
    </div>
  );
}
