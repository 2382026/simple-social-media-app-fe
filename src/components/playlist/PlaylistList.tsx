import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";
import PlaylistCard from "./PlaylistCard";
import { Link } from "react-router-dom";

interface Playlist {
  id: string;
  name: string;
  mood: string;
  songs: any[];
}

const PlaylistList = () => {
  const { data: playlists, isLoading } = useQuery<Playlist[]>({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await axios.get("/api/playlists");
      return response.data;
    }
  });

  const moods = [
    "Slay",
    "Healing",
    "Hype",
    "Galau",
    "Main Character",
    "Throwback",
    "Chill",
    "Workout"
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!playlists || playlists.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Belum ada playlist yang dibuat</p>
        <Link
          to="/playlists/create"
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          Buat Playlist Pertama Anda
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {moods.map((mood) => {
        const playlistsByMood = playlists.filter((p) => p.mood === mood);
        
        if (!playlistsByMood.length) return null;

        return (
          <div key={mood}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Playlist {mood}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlistsByMood.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  name={playlist.name}
                  mood={playlist.mood}
                  songCount={playlist.songs.length}
                  onViewSongs={() => window.location.href = `/playlists/${playlist.id}`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistList;