import { useState,useEffect } from "react";

import { toast } from "sonner";
import api from './../api/api.js';
import axios from "axios";

export default function RoleModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);
  const [permissionsList, setPermissionsList] = useState([]);

  const fetchPermissions = async () => {
    try {
      const { data } = await axios.get(api.permissions.list);
      setPermissionsList(data);
    } catch {
      toast.error("Failed to load permissions.");
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);
  
  const togglePermission = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };
  const handleSubmit = () => {
    if (!name || selected.length === 0) {
      return toast.error("Please enter a name and select permissions.");
    }

    const newRole = {
      id: Math.floor(Math.random() * 10000),
      name,
      permissions: selected,
    };

    try {
      onAdd(newRole);
      toast.success("Role created successfully!");
      onClose(); 
    } catch (err) {
      toast.error("Failed to create role.");
    }
  };

 

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-white/10">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 shadow space-y-4 border dark:border-gray-700 w-full max-w-md">
     
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl"
        >
          &times;
        </button>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Create New Role</h3>
        <input
          type="text"
          placeholder="Role name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">Select Permissions:</p>
          <div className="flex flex-wrap gap-2">
            {permissionsList.map((perm) => (
              <label key={perm.key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selected.includes(perm.key)}
                  onChange={() => togglePermission(perm.key)}
                />
                {perm.name}
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Role
        </button>
      </div>
    </div>
  );
}

