import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";
import toast from "react-hot-toast";

interface CreateSongInput {
  title: string;
  artist: string;
  playlistId: string;
}

interface Playlist {
  id: string;
  name: string;
  mood: string;
}

const CreateSongForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateSongInput>();

  const { data: playlists } = useQuery<Playlist[]>({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await axios.get("/api/playlists");
      return response.data;
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateSongInput) => {
      const response = await axios.post("/api/songs", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Lagu berhasil ditambahkan");
      navigate("/songs");
    },
    onError: () => {
      toast.error("Gagal menambahkan lagu");
    }
  });

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Judul Lagu
        </label>
        <input
          type="text"
          {...register("title", { required: "Judul lagu wajib diisi" })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          placeholder="Masukkan judul lagu"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nama Artis
        </label>
        <input
          type="text"
          {...register("artist", { required: "Nama artis wajib diisi" })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          placeholder="Masukkan nama artis"
        />
        {errors.artist && (
          <p className="mt-1 text-sm text-red-600">{errors.artist.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Playlist
        </label>
        <select
          {...register("playlistId", { required: "Playlist wajib dipilih" })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Pilih Playlist</option>
          {playlists?.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name} - {playlist.mood}
            </option>
          ))}
        </select>
        {errors.playlistId && (
          <p className="mt-1 text-sm text-red-600">{errors.playlistId.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        {isPending ? "Menyimpan..." : "Simpan Lagu"}
      </button>
    </form>
  );
};

export default CreateSongForm;