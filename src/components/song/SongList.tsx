import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";
import SongCard from "./SongCard";
import toast from "react-hot-toast";

interface Song {
  id: string;
  title: string;
  artist: string;
  mood: string;
}

const SongList = () => {
  const { data: songs, isLoading } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: async () => {
      const response = await axios.get("/api/songs");
      return response.data;
    }
  });

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/songs/${id}`);
      toast.success("Lagu berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus lagu");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs?.map((song) => (
        <SongCard
          key={song.id}
          id={song.id}
          title={song.title}
          artist={song.artist}
          mood={song.mood}
          onDelete={handleDelete}
          onEdit={(id) => window.location.href = `/songs/edit/${id}`}
        />
      ))}
      {songs?.length === 0 && (
        <p className="text-gray-500 text-center col-span-full">
          Belum ada lagu yang ditambahkan
        </p>
      )}
    </div>
  );
};

export default SongList;