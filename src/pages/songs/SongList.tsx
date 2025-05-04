import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "../../utils/AxiosInstance";
import { Song } from "../../types/Song";

export const moodOptions = [
  "Semua",
  "Senang",
  "Sedih",
  "Semangat",
  "Tenang",
  "Romantis",
  "Nostalgia"
];

const SongList = () => {
  const [selectedMood, setSelectedMood] = useState("Semua");
  const queryClient = useQueryClient();
  
  const { data: songs, isLoading } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: async () => {
      const response = await axios.get("/api/songs");
      return response.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  // Filter lagu berdasarkan mood
  const filteredSongs = songs?.filter(song => 
    selectedMood === "Semua" ? true : song.mood === selectedMood
  );

  // Hitung statistik mood
  const moodStats = songs?.reduce((acc, song) => {
    if (song.mood) {
      acc[song.mood] = (acc[song.mood] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Lagu</h1>
        <Link to="/songs/create" className="btn btn-primary">
          Tambah Lagu
        </Link>
      </div>

      {/* Statistik Mood */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Statistik Mood</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {moodOptions.slice(1).map((mood) => (
            <div
              key={mood}
              className={`p-4 rounded-lg ${
                selectedMood === mood ? 'bg-blue-100' : 'bg-gray-50'
              }`}
              onClick={() => setSelectedMood(mood)}
              role="button"
            >
              <div className="text-lg font-medium">{mood}</div>
              <div className="text-2xl font-bold">{moodStats?.[mood] || 0}</div>
              <div className="text-sm text-gray-500">lagu</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Mood */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter berdasarkan Mood
        </label>
        <select
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
          className="input w-full max-w-xs"
        >
          {moodOptions.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>
      </div>

      {/* Daftar Lagu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSongs?.map((song) => (
          <div key={song.id} className="card">
            <h3 className="text-xl font-semibold mb-2">{song.title}</h3>
            <p className="text-gray-600 mb-2">Artis: {song.artist}</p>
            <p className="text-gray-500 text-sm mb-2">Durasi: {song.duration}</p>
            {song.mood && (
              <p className="text-gray-500 text-sm mb-4">
                Mood: <span className="font-medium">{song.mood}</span>
              </p>
            )}
            <Link
              to={`/songs/${song.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              Lihat Detail →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;