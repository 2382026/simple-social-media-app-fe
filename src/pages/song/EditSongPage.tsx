import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";
import SongForm from "../../components/song/SongForm";
import { Song } from "../../types/Song";

const EditSongPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: song, isLoading } = useQuery<Song>({
    queryKey: ["song", id],
    queryFn: async () => {
      const response = await axios.get(`/api/songs/${id}`);
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Song</h1>
      {song && <SongForm initialData={song} isEditing />}
    </div>
  );
};

export default EditSongPage;