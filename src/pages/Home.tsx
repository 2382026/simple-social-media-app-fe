import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { Song } from "../types/Song";

const HomePage = () => {
  const { data: recentSongs, isLoading } = useQuery<Song[]>({
    queryKey: ["recent-songs"],
    queryFn: async () => {
      const response = await axios.get("/api/songs/recent");
      return response.data;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Music App
          </h1>
          <p className="text-xl mb-8">
            Discover and share your favorite songs
          </p>
          <Link
            to="/songs"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-200"
          >
            Browse Songs
          </Link>
        </div>
      </div>

      {/* Recent Songs Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recently Added Songs
        </h2>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSongs?.slice(0, 6).map((song) => (
              <div
                key={song.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {song.title}
                </h3>
                <p className="text-gray-600 mb-4">Artist: {song.artist}</p>
                <p className="text-gray-500 text-sm mb-4">
                  Duration: {song.duration}
                </p>
                <Link
                  to={`/songs/${song.id}`}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/songs"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            View All Songs →
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Create Playlists
              </h3>
              <p className="text-gray-600">
                Organize your favorite songs into custom playlists
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Share Music
              </h3>
              <p className="text-gray-600">
                Share your favorite songs with other users
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Discover Songs
              </h3>
              <p className="text-gray-600">
                Find new music from our growing collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;