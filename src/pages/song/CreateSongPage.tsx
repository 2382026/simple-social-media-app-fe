import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SongForm from "../../components/song/SongForm";
import { useAuth } from "../../utils/AuthProvider";

const CreateSongPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Song</h1>
      <SongForm />
    </div>
  );
};

export default CreateSongPage;