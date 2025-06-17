import hierarchy from "../data/hierarchy.json";

import Table from './../componenets/Table.jsx';
const columns = [
  { id: "id", accessorKey: "id", header: "ID" },
  { id: "position", accessorKey: "position", header: "Position" },
  { id: "name", accessorKey: "name", header: "Name" },
  {
    id: "reports_to",
    accessorKey: "reports_to",
    header: "Reports To",
    cell: ({ getValue }) => (getValue() === null ? "—" : `#${getValue()}`),
  },
];

export default function Hierarchy() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Hierarchy</h2>
      <Table columns={columns} data={hierarchy} />
    </div>
  );
}
