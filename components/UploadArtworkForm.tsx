'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function UploadArtworkForm() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert('Please select an image.');

    setUploading(true);

    // 1. Upload image to Cloudinary
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'Portfolio_Mane'); 
    formData.append('folder', 'Portfolio_Mane'); 

    const cloudName = 'dxjvwobh7'; 

    const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const cloudData = await cloudRes.json();

    if (!cloudData.secure_url) {
      alert('Cloudinary upload failed.');
      setUploading(false);
      return;
    }

    // 2. Upload metadata to Supabase
    const { error } = await supabase.from('artwork').insert([
      {
        title,
        description,
        date,
        tags: tags.split(',').map(tag => tag.trim()), // convert string to text[]
        url: cloudData.secure_url,
        isfavorite: false,
        medium: null,
      },
    ]);

    if (error) {
      alert('Failed to save metadata to Supabase');
      console.error(error);
    } else {
      alert('Artwork uploaded!');
      router.push('/gallery');
    }

    setUploading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl mb-4 font-bold">Upload Artwork</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] ?? null)} required />
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <button
          type="submit"
          className="bg-lime-900 text-white px-4 py-2 rounded hover:bg-lime-800 transition"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
