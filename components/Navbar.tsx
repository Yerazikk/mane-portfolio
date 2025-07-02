import Image from "next/image";
export default function Navbar() {
  return (
    //<nav className="bg-white shadow py-6 flex flex-col items-center text-green-800">
      //<a href="/" className="text-3xl font-bold mb-2">Mane Art</a>
    <nav className="bg-white shadow py-10 flex flex-col items-center text-lime-900">
          <a href="/" className="mb-7">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image
                src="/logo.png"
                alt="Mane Art Logo"
                width={2000}
                height={1000}
                className="object-cover w-full h-full"
                priority
              />
        </div>
      </a>
      <div className="flex space-x-6 text-lg text-maneGreen">
        <a href="/gallery" className="hover:underline text-lime-900">gallery</a>
        <a href="/about" className="hover:underline text-lime-900">about</a>
         <a href="/shop" className="hover:underline text-lime-900">shop</a>
      </div>
    </nav>
  );
}
