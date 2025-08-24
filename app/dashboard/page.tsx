import UploadArtworkForm from '../../components/UploadArtworkForm';

export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <UploadArtworkForm />
    </div>
  );
}
