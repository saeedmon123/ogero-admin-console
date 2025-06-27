
export default function ConfirmDeleteModal({ itemName = "this item", onConfirm,onCancel  }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-sm w-full border dark:border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Confirm Deletion</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to delete <strong>{itemName}</strong>?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
