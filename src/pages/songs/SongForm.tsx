import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { songService } from "../../services/SongService";

const moodOptions = [
  "Senang",
  "Sedih",
  "Semangat",
  "Tenang",
  "Romantis",
  "Nostalgia"
];

const SongForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    duration: "",
    mood: ""
  });

  const { data: song } = useQuery({
    queryKey: ["song", id],
    queryFn: () => songService.getSongById(id as string),
    enabled: isEditing
  });

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title,
        artist: song.artist,
        duration: song.duration,
        mood: song.mood || ""
      });
    }
  }, [song]);

  const mutation = useMutation({
    mutationFn: (data: typeof formData) => {
      if (isEditing) {
        return songService.updateSong(id as string, data);
      }
      return songService.createSong(data);
    },
    onSuccess: (data) => {
      // Invalidate dan refetch
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      
      // Redirect ke detail lagu yang baru dibuat
      if (!isEditing) {
        navigate(`/songs/${data.id}`);
      } else {
        navigate(`/songs/${id}`);
      }
    },
    onError: (error) => {
      alert("Terjadi kesalahan: " + (error as Error).message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing ? "Edit Lagu" : "Tambah Lagu"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Judul Lagu</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="label">Artis</label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="label">Durasi</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="input w-full"
              required
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
              {moodOptions.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                isEditing ? "Simpan Perubahan" : "Tambah Lagu"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/songs")}
              className="btn btn-secondary"
              disabled={mutation.isPending}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SongForm;