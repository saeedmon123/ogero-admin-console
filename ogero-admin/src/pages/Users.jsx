import users from "../data/users.json";

import Table from './../componenets/Table.jsx';
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
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <Table columns={columns} data={users} />
    </div>
  );
}
