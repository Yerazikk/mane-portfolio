'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

type Artwork = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[] | null;
  url: string;
};

export default function GalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      const { data, error } = await supabase.from('artwork').select('*').order('date', { ascending: false });

      if (error) {
        setError('Failed to load gallery.');
        console.error(error);
      } else {
        setArtworks(data as Artwork[]);
      }

      setLoading(false);
    };

    fetchArtworks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading gallery...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (artworks.length === 0) return <p className="text-center mt-10">No artwork uploaded yet.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artworks.map((art) => (
          <div key={art.id} className="border rounded shadow-sm p-4 bg-white">
            <div className="w-full aspect-square relative mb-4">
              <Image
                src={art.url}
                alt={art.title}
                fill
                className="object-cover rounded"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h2 className="text-lg font-semibold">{art.title}</h2>
            {art.description && <p className="text-sm text-gray-600">{art.description}</p>}
            {art.date && <p className="text-xs text-gray-500 mt-1">{new Date(art.date).toLocaleDateString()}</p>}
            {Array.isArray(art.tags) && art.tags.length > 0 && (
              <div className="flex flex-wrap mt-2 gap-1">
                {art.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
