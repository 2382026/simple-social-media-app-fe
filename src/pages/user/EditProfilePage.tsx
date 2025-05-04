import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";

type EditProfileInput = {
  username: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
};

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EditProfileInput>();

  const { isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      try {
        const response = await axios.get<User>("/api/users/profile");
        setValue("username", response.data.username);
        setValue("email", response.data.email);
        return response.data;
      } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
    }
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (data: EditProfileInput) => {
      try {
        await axios.put("/api/users/profile", data);
        navigate("/profile");
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profil</h1>

        <form 
          className="space-y-6" 
          onSubmit={handleSubmit((data) => updateProfile(data))}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("username", { required: "Username wajib diisi" })}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("email", { 
                required: "Email wajib diisi",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Format email tidak valid"
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          // ... existing code ...

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="btn btn-secondary"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary disabled:opacity-50"
            >
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;