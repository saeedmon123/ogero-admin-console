import permissionsData  from "../data/permissions.json";
import Table from './../componenets/Table.jsx';
import PermissionModal from './../componenets/PermissionModal.jsx';
import { useState } from "react";
import {toast } from "sonner";
import EditPermissionModal from './../componenets/EditPermissionModal.jsx';
import ConfirmDeleteModal from './../componenets/ConfirmDeleteModal.jsx';
export default function Permissions() {
  const [permissions, setPermissions] = useState(() => {
    const stored = localStorage.getItem("permissions");
    return stored ? JSON.parse(stored) : permissionsData;
  });
  const [showModal, setShowModal] = useState(false);

  const addPermission = (perm) => {
    const newList = [
      ...permissions,
      { ...perm, id: permissions.length + 1 },
    ];
    setPermissions(newList);
    localStorage.setItem("permissions", JSON.stringify(newList));
  };
const [editingpPermission, setEditingPermission] = useState(null);

   const handleEdit = (permission) => {
  setEditingPermission(permission);


   
  };


    const [permissionToDelete, setPermissionToDelete] = useState(null);

const handleDelete = (permission) => {
  setPermissionToDelete(permission);
};

const confirmDelete = () => {
  toast.success("permission deleted");
  setPermissionToDelete(null);
  
};


  const columns = [
    { id: "id", accessorKey: "id", header: "ID" },
    { id: "name", accessorKey: "name", header: "Name" },
    { id: "key", accessorKey: "key", header: "Key" },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Permissions</h2>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md transition hover:bg-blue-700"
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

       {editingpPermission && (
                <EditPermissionModal
                  permission={editingpPermission}
                
                  onClose={() => setEditingPermission(null)}
                />
              )} 
    </div>
  );
}
