// /components/Gallery.tsx

import Image from "next/image";

const images = [
  { src: "/art/art1.jpg", alt: "Artwork 1" },
  { src: "/art/art2.jpg", alt: "Artwork 2" },
  { src: "/art/art3.jpg", alt: "Artwork 3" },
];

const Gallery = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((img, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow hover:shadow-lg transition">
          <Image
            src={img.src}
            alt={img.alt}
            width={500}
            height={500}
            className="object-cover w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery; // ✅ must be default export
