import { useForm } from "react-hook-form";
import { Song } from "../../types/Song";
import { useMutation } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

type SongFormData = Omit<Song, "id" | "userId" | "createdAt" | "updatedAt">;

interface SongFormProps {
  initialData?: Song;
  isEditing?: boolean;
}

const SongForm = ({ initialData, isEditing }: SongFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SongFormData>({
    defaultValues: initialData
  });

  const handleSongSubmit = async (data: SongFormData) => {
    if (isEditing && initialData) {
      await axios.put(`/api/songs/${initialData.id}`, data);
    } else {
      await axios.post("/api/songs", data);
    }
    navigate("/songs");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleSongSubmit
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      {isPending && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <form
        className="space-y-6"
        onSubmit={handleSubmit((data) => mutate(data))}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.title && (
            <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Artist
          </label>
          <input
            type="text"
            {...register("artist", { required: "Artist is required" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.artist && (
            <p className="text-red-600 text-xs mt-1">{errors.artist.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
            type="text"
            {...register("duration", { required: "Duration is required" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="3:45"
          />
          {errors.duration && (
            <p className="text-red-600 text-xs mt-1">{errors.duration.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/songs")}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {isEditing ? "Update Song" : "Add Song"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SongForm;