export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">Page Not Found</p>
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-md hover:opacity-90 transition"
      >
        Go back to Dashboard
      </a>
    </div>
  );
}