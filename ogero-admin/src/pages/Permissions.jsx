import permissions from "../data/permissions.json";
import Table from './../componenets/Table.jsx';
const columns = [
  { id: "id", accessorKey: "id", header: "ID" },
  { id: "name", accessorKey: "name", header: "Name" },
  { id: "key", accessorKey: "key", header: "Key" },
];

export default function Permissions() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Permissions</h2>
      <Table columns={columns} data={permissions} />
    </div>
  );
}
