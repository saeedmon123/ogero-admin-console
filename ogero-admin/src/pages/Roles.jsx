import roles from "../data/roles.json";

import Table from './../componenets/Table.jsx';
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
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Roles</h2>
      <Table columns={columns} data={roles} />
    </div>
  );
}
