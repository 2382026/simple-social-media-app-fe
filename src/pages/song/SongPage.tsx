import { Link } from "react-router-dom";
import SongList from "../../components/song/SongList";

const SongPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Daftar Lagu
        </h1>
        <Link
          to="/songs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Tambah Lagu
        </Link>
      </div>

      <SongList />
    </div>
  );
};

export default SongPage;