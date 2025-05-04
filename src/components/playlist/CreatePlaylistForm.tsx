import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";
import toast from "react-hot-toast";

interface CreatePlaylistInput {
  name: string;
  mood: string;
}

const CreatePlaylistForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreatePlaylistInput>();

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

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreatePlaylistInput) => {
      const response = await axios.post("/api/playlists", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success("Playlist berhasil dibuat");
      navigate("/playlists");
    },
    onError: () => {
      toast.error("Gagal membuat playlist");
    }
  });

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nama Playlist
        </label>
        <input
          type="text"
          {...register("name", { required: "Nama playlist wajib diisi" })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          placeholder="Contoh: My Favorite Songs"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mood Playlist
        </label>
        <select
          {...register("mood", { required: "Mood playlist wajib dipilih" })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Pilih Mood</option>
          {moods.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>
        {errors.mood && (
          <p className="mt-1 text-sm text-red-600">{errors.mood.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        {isPending ? "Membuat Playlist..." : "Buat Playlist"}
      </button>
    </form>
  );
};

export default CreatePlaylistForm;