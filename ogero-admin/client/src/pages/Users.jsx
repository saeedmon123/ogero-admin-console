
import { toast } from "sonner";
import Table from '../componenets/Table.jsx';
import EditUserModal from '../componenets/EditUserModal.jsx';
import { useState,useEffect } from "react";
import axios from "axios";
import api  from './../api/api.js';

import ConfirmDeleteModal from '../componenets/ConfirmDeleteModal.jsx';
const columns = [
  { id: "id", accessorKey: "id", header: "ID" },
  { id: "name", accessorKey: "name", header: "Name" },
  { id: "email", accessorKey: "email", header: "Email" },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            value === "Admin"
              ? "bg-red-100 text-red-700"
              : value === "Editor"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {value}
        </span>
      );
    },
  },
];



export default function Users() {
  const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get(api.users.list);
      setUsers(res.data);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);
  const [userToDelete, setUserToDelete] = useState(null);

const handleDelete = (user) => {
  setUserToDelete(user);
};
const handleUserUpdate = (updatedUser) => {
  setUsers(prev =>
    prev.map(user => (user._id === updatedUser._id ? updatedUser : user))
  );
};

const confirmDelete = async () => {
  try {
    await axios.delete(api.users.delete(userToDelete._id));
    toast.success("User deleted");

    
    setUsers(prev => prev.filter(u => u._id !== userToDelete._id));
  } catch (error) {
    toast.error("Failed to delete user");
  } finally {
    setUserToDelete(null);
  }
};



const [editingUser, setEditingUser] = useState(null);

const handleEdit = (user) => {
  setEditingUser(user);
};





  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      
      <Table columns={columns} data={users} onEdit={handleEdit}
        onDelete={handleDelete} />

        {userToDelete && (
  <ConfirmDeleteModal
    itemName={userToDelete.name}
    onConfirm={confirmDelete}
     onCancel={() => setUserToDelete(null)}
  />
)}

       {editingUser && (
  <EditUserModal
    user={editingUser}
    onUpdate={handleUserUpdate}
    onClose={() => setEditingUser(null)}
  />
)} 
    </div>
  );
}
