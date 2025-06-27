import { useState } from "react";
import { toast } from "sonner";
import api from './../api/api.js';
import axios from "axios";
export default function EditPermissionModal({ permission, onClose }) {
  const [form, setForm] = useState({ ...permission });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.key) {
      toast.error("Both name and key are required.");
      return;
    }

    try {
      await axios.put(api.permissions.update(form._id), form);
      toast.success("Permission updated.");
      onClose();
    } catch {
      toast.error("Failed to update permission.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md border dark:border-gray-700 space-y-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Edit Permission</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Permission Name"
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
        />
        <input
          type="text"
          name="key"
          value={form.key}
          onChange={handleChange}
          placeholder="Permission Key"
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded dark:text-white">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
