import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          My Portfolio
        </Link>
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/admin"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
