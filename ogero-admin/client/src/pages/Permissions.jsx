import permissionsData  from "../data/permissions.json";
import Table from '../componenets/Table.jsx';
import PermissionModal from '../componenets/PermissionModal.jsx';
import { useState,useEffect } from "react";
import {toast } from "sonner";
import EditPermissionModal from '../componenets/EditPermissionModal.jsx';
import ConfirmDeleteModal from '../componenets/ConfirmDeleteModal.jsx';
import api from './../api/api.js';
import axios from "axios";

export default function Permissions() {
  const [permissions, setPermissions] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [permissionToDelete, setPermissionToDelete] = useState(null);

  const fetchPermissions = async () => {
    try {
      const { data } = await axios.get(api.permissions.list);
      setPermissions(data);
    } catch (err) {
      toast.error("Failed to load permissions.");
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

const addPermission = async (perm) => {
    try {
      await axios.post(api.permissions.create, perm);
      await fetchPermissions();
      toast.success("Permission added.");
    } catch {
      toast.error("Failed to add permission.");
    }
  };


   const handleEdit = (permission) => {
  setEditingPermission(permission);


   
  };


  

const handleDelete = (permission) => {
  setPermissionToDelete(permission);
};

const confirmDelete = async () => {
 try {
      await axios.delete(api.permissions.delete(permissionToDelete._id));
      await fetchPermissions();
      toast.success("Permission deleted.");
    } catch {
      toast.error("Failed to delete permission.");
    } finally {
      setPermissionToDelete(null);
    }
  
};


  const columns = [
    { id: "id", accessorKey: "_id", header: "ID" },
    { id: "name", accessorKey: "name", header: "Name" },
    { id: "key", accessorKey: "key", header: "Key" },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Permissions</h2>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-2 sm:px-4  py-2 rounded-md transition hover:bg-blue-700"
      >
        + Add Permission
      </button>
      </div>

  
     
      <Table columns={columns} data={permissions} onEdit={handleEdit}
        onDelete={handleDelete} />
      {showModal && (
        <PermissionModal
          onClose={() => setShowModal(false)}
          onAdd={addPermission}
          existingKeys={permissions.map((p) => p.key)}
        />
      )}

      
              {permissionToDelete && (
        <ConfirmDeleteModal
          itemName={permissionToDelete.name}
          onConfirm={confirmDelete}
           onCancel={() => setPermissionToDelete(null)}
        />
      )}

       {editingPermission && (
                <EditPermissionModal
                  permission={editingPermission}
                
                  onClose={() => {setEditingPermission(null);
                    fetchPermissions();}}
                />
              )} 
    </div>
  );
}
