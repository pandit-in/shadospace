import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="text-red-500 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  )
}
