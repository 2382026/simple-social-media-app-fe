import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/AxiosInstance";
import { User } from "../../types/User";

const ProfilePage = () => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await axios.get("/api/users/profile");
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profil Saya</h1>
        
        {user && (
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 font-medium">Username:</label>
              <p className="text-gray-800 text-lg">{user.username}</p>
            </div>
            
            <div>
              <label className="text-gray-600 font-medium">Email:</label>
              <p className="text-gray-800 text-lg">{user.email}</p>
            </div>
            
            <div>
              <label className="text-gray-600 font-medium">Bergabung sejak:</label>
              <p className="text-gray-800">
                {new Date(user.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;