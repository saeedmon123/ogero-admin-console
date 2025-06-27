import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";

export default function Table({ columns, data, onEdit, onDelete }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

    const showActions = !!(onEdit || onDelete);

const extendedColumns = showActions
  ? [
      ...columns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(row.original)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(row.original)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ),
      },
    ]
  : columns;


  const table = useReactTable({
    data,
   columns: extendedColumns,

    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  return (
    <div className="space-y-4">
      {/*  Search input */}
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 border bg-gray-200 border-gray-300 dark:border-gray-600 rounded-md shadow-sm w-full md:w-1/3 dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-700 dark:placeholder-gray-500"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      {/*  Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm border-b dark:border-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-3 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc"
                      ? " ↑"
                      : header.column.getIsSorted() === "desc"
                      ? " ↓"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition dark:border-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 align-middle text-sm text-gray-700 dark:text-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="space-x-2">
          {[
            { label: "<<", action: () => table.setPageIndex(0), disabled: !table.getCanPreviousPage() },
            { label: "<", action: () => table.previousPage(), disabled: !table.getCanPreviousPage() },
            { label: ">", action: () => table.nextPage(), disabled: !table.getCanNextPage() },
            { label: ">>", action: () => table.setPageIndex(table.getPageCount() - 1), disabled: !table.getCanNextPage() },
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.action}
              disabled={btn.disabled}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
            >
              {btn.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
}
