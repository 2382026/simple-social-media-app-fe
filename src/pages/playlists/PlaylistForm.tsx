import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";
import { Song } from "../../types/Song";
import { moodOptions } from "../songs/SongList";

const PlaylistForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mood: "",
    songs: [] as string[]
  });

  const { data: songs } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: async () => {
      const response = await axios.get("/api/songs");
      return response.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await axios.post("/api/playlists", data);
      return response.data;
    },
    onSuccess: () => {
      navigate("/playlists");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Buat Playlist Baru</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Nama Playlist</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="label">Deskripsi</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input w-full h-24"
            />
          </div>
          <div>
            <label className="label">Mood</label>
            <select
              value={formData.mood}
              onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
              className="input w-full"
            >
              <option value="">Pilih Mood</option>
              {moodOptions.slice(1).map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Pilih Lagu</label>
            <div className="space-y-2">
              {songs?.map((song) => (
                <label key={song.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.songs.includes(song.id)}
                    onChange={(e) => {
                      const newSongs = e.target.checked
                        ? [...formData.songs, song.id]
                        : formData.songs.filter(id => id !== song.id);
                      setFormData({ ...formData, songs: newSongs });
                    }}
                    className="checkbox"
                  />
                  <span>{song.title} - {song.artist}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="btn btn-primary">
              Buat Playlist
            </button>
            <button
              type="button"
              onClick={() => navigate("/playlists")}
              className="btn btn-secondary"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaylistForm;