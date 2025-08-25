import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-300 mb-1">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-500">Event Not Found</h2>
      <p className="text-gray-500 dark:text-gray-300">
        The event you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 hover:dark:text-gray-200 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
