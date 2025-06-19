import users from "../data/users.json";
import { toast } from "sonner";
import Table from './../componenets/Table.jsx';
import EditUserModal from './../componenets/EditUserModal.jsx';
import { useState } from "react";
import ConfirmDeleteModal from './../componenets/ConfirmDeleteModal.jsx';
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
  const [userToDelete, setUserToDelete] = useState(null);

const handleDelete = (user) => {
  setUserToDelete(user);
};

const confirmDelete = () => {
  toast.success("User deleted");
  setUserToDelete(null);
  
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
  
    onClose={() => setEditingUser(null)}
  />
)} 
    </div>
  );
}
