import { useNavigate } from "react-router-dom";
import { Song } from "../../types/Song";
import { useMutation } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";

interface SongDetailProps {
  song: Song;
  onDelete?: () => void;
}

const SongDetail = ({ song, onDelete }: SongDetailProps) => {
  const navigate = useNavigate();

  const { mutate: deleteSong, isPending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/songs/${song.id}`);
      onDelete?.();
      navigate("/songs");
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {isPending && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-4">{song.title}</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-gray-600 font-medium">Artist:</label>
          <p className="text-gray-800">{song.artist}</p>
        </div>
        
        <div>
          <label className="text-gray-600 font-medium">Duration:</label>
          <p className="text-gray-800">{song.duration}</p>
        </div>
        
        <div>
          <label className="text-gray-600 font-medium">Added on:</label>
          <p className="text-gray-800">
            {new Date(song.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => navigate(`/songs/edit/${song.id}`)}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this song?")) {
              deleteSong();
            }
          }}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SongDetail;