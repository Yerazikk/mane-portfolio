import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative bg-white shadow py-10 text-lime-900">
      {/* Login button*/}
      <div className="absolute top-4 right-6">
        <Link
          href="/login"
          className="text-sm text-lime-900 border border-lime-900 px-4 py-2 rounded hover:bg-lime-100 transition"
        >
          Login
        </Link>
      </div>

      {/* Logo center-aligned */}
      <div className="flex flex-col items-center">
        <Link href="/" className="mb-7">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <Image
              src="/logo.png"
              alt="Mane Art Logo"
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </Link>

        {/* Navbar links */}
        <div className="flex space-x-6 text-lg">
          <Link href="/gallery" className="hover:underline">
            gallery
          </Link>
          <Link href="/about" className="hover:underline">
            about
          </Link>
          <Link href="/shop" className="hover:underline">
            shop
          </Link>
        </div>
      </div>
    </nav>
  );
}
