import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/AxiosInstance";
import { Song } from "../../types/Song";

const SongDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: song, isLoading } = useQuery<Song>({
    queryKey: ["song", id],
    queryFn: async () => {
      const response = await axios.get(`/api/songs/${id}`);
      return response.data;
    }
  });

  const handleDelete = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus lagu ini?")) {
      try {
        await axios.delete(`/api/songs/${id}`);
        navigate("/songs");
      } catch (error) {
        console.error("Failed to delete song:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{song?.title}</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Artis:</span> {song?.artist}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Durasi:</span> {song?.duration}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Mood:</span>{" "}
            {song?.mood || "Belum ditentukan"}
          </p>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => navigate(`/songs/${id}/edit`)}
              className="btn btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn bg-red-500 text-white hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;