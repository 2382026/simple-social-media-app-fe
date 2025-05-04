import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "../../utils/AxiosInstance";
import { Playlist } from "../../types/Playlist";
import { moodOptions } from "../songs/SongList";

const PlaylistList = () => {
  const { data: playlists, isLoading } = useQuery<Playlist[]>({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await axios.get("/api/playlists");
      return response.data;
    }
  });

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
        <h1 className="text-2xl font-bold">Playlist Saya</h1>
        <Link to="/playlists/create" className="btn btn-primary">
          Buat Playlist
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists?.map((playlist) => (
          <div key={playlist.id} className="card">
            <h3 className="text-xl font-semibold mb-2">{playlist.name}</h3>
            {playlist.description && (
              <p className="text-gray-600 mb-2">{playlist.description}</p>
            )}
            {playlist.mood && (
              <p className="text-gray-500 text-sm mb-2">
                Mood: <span className="font-medium">{playlist.mood}</span>
              </p>
            )}
            <p className="text-gray-500 text-sm mb-4">
              {playlist.songs.length} lagu
            </p>
            <Link
              to={`/playlists/${playlist.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              Lihat Playlist →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistList;