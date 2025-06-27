
import { useState } from "react";
import { toast } from "sonner";

export default function PermissionModal({ onClose, onAdd, existingKeys }) {
  const [permission, setPermission] = useState({ name: "", key: "" });

  const handleSubmit = () => {
    if (!permission.name || !permission.key) {
      toast.error("Both name and key are required.");
      return;
    }
    if (existingKeys.includes(permission.key)) {
      toast.error("Key already exists.");
      return;
    }

    onAdd(permission);
    toast.success("Permission added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg space-y-4 border dark:border-gray-700">
        
    
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          x
        </button>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Permission</h3>

        <input
          type="text"
          placeholder="Permission Name"
          value={permission.name}
          onChange={(e) => setPermission({ ...permission, name: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />

        <input
          type="text"
          placeholder="Permission Key"
          value={permission.key}
          onChange={(e) => setPermission({ ...permission, key: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded dark:border-gray-600 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );}
