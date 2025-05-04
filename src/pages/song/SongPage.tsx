import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";
import SongList from "../../components/song/SongList";
import { Link } from "react-router-dom";
import { Song } from "../../types/Song";

const SongPage = () => {
  const { data: songs, isLoading } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: async () => {
      const response = await axios.get("/api/songs");
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Songs</h1>
        <Link
          to="/songs/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add New Song
        </Link>
      </div>
      {songs && <SongList songs={songs} />}
    </div>
  );
};

export default SongPage;