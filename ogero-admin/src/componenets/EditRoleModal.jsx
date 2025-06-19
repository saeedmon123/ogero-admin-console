import { useState } from "react";
import { toast } from "sonner";
import permissionsList from "../data/permissions.json";

export default function EditRoleModal({ role, onClose }) {
  const [form, setForm] = useState({ ...role });

  const togglePermission = (perm) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const handleSubmit = () => {
    if (!form.name || form.permissions.length === 0) {
      toast.error("Role name and at least one permission required.");
      return;
    }
 
    toast.success("Role updated.");
    onClose();
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
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Edit Role</h2>

        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          placeholder="Role Name"
        />

        <div className="space-y-1">
          <p className="text-sm dark:text-gray-300">Permissions:</p>
          <div className="flex flex-wrap gap-2">
            {permissionsList.map((perm) => (
              <label key={perm.key} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={form.permissions.includes(perm.key)}
                  onChange={() => togglePermission(perm.key)}
                />
                {perm.name}
              </label>
            ))}
          </div>
        </div>

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
