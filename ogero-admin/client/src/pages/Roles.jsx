import initialRoles from "../data/roles.json";

import Table from '../componenets/Table.jsx';
import { useState,useEffect } from "react";
import {toast } from "sonner";
import RoleModal from '../componenets/RoleModal.jsx';
import EditRoleModal from '../componenets/EditRoleModal.jsx';
import ConfirmDeleteModal from '../componenets/ConfirmDeleteModal.jsx';
import api from './../api/api.js';
import axios from "axios";

const columns = [
  { id: "id", accessorKey: "_id", header: "ID" },
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
    const [showModal, setShowModal] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [roles, setRoles] = useState([]);
    
    const fetchRoles = async () => {
    try {
      const { data } = await axios.get(api.roles.list);
      setRoles(data);
    } catch (err) {
      toast.error("Failed to fetch roles.");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

    const handleAddRole = async (role) => {
    try {
      await axios.post(api.roles.create, role);
      await fetchRoles();
      toast.success("Role created.");
    } catch {
      toast.error("Failed to create role.");
    }
  };



const handleDelete = (role) => {
  setRoleToDelete(role);
};

const confirmDelete = async() => {
 try {
      await axios.delete(api.roles.delete(roleToDelete._id));
      await fetchRoles();
      toast.success("Role deleted.");
    } catch {
      toast.error("Failed to delete role.");
    } finally {
      setRoleToDelete(null);
    }
  };


  
 const handleEdit = (role) => {
  setEditingRole(role);

   
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
          
           onClose={() => {
            setEditingRole(null);
            fetchRoles(); 
          }}
          />
        )} 
    </div>
  );
}