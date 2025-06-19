import initialRoles from "../data/roles.json";

import Table from './../componenets/Table.jsx';
import { useState } from "react";
import {toast } from "sonner";
import RoleModal from './../componenets/RoleModal.jsx';
import EditRoleModal from './../componenets/EditRoleModal.jsx';
import ConfirmDeleteModal from './../componenets/ConfirmDeleteModal.jsx';


const columns = [
  { id: "id", accessorKey: "id", header: "ID" },
  { id: "name", accessorKey: "name", header: "Name" },
  {
    id: "permissions",
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ getValue }) => {
      const perms = getValue();
      return (
        <div className="flex flex-wrap gap-1">
          {perms.map((perm, i) => (
            <span
              key={i}
              className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs"
            >
              {perm}
            </span>
          ))}
        </div>
      );
    },
  },
];



export default function Roles() {
    const [roleToDelete, setRoleToDelete] = useState(null);

const handleDelete = (role) => {
  setRoleToDelete(role);
};

const confirmDelete = () => {
  toast.success("role deleted");
  setRoleToDelete(null);
  
};


  const [editingRole, setEditingRole] = useState(null);
 const handleEdit = (role) => {
  setEditingRole(role);

   
  };

 
  const [roles, setRoles] = useState(initialRoles);
  const [showModal, setShowModal] = useState(false);

  const handleAddRole = (role) => {
    setRoles((prev) => [...prev, role]);
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Roles</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
        >
          + Create Role
        </button>
      </div>

    {showModal && (
  <RoleModal
    onAdd={handleAddRole}
    onClose={() => setShowModal(false)}
    
  />
)}
       {roleToDelete && (
  <ConfirmDeleteModal
    itemName={roleToDelete.name}
    onConfirm={confirmDelete}
     onCancel={() => setRoleToDelete(null)}
  />
)}

      <Table columns={columns} data={roles} onEdit={handleEdit}
        onDelete={handleDelete}/>

        {editingRole && (
          <EditRoleModal
            role={editingRole}
          
            onClose={() => setEditingRole(null)}
          />
        )} 
    </div>
  );
}