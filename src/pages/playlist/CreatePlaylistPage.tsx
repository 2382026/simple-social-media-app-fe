import CreatePlaylistForm from "../../components/playlist/CreatePlaylistForm";

const CreatePlaylistPage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Buat Playlist Baru
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <CreatePlaylistForm />
      </div>
    </div>
  );
};

export default CreatePlaylistPage;