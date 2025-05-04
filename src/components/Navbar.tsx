import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Music App
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/songs" className="text-gray-700 hover:text-blue-600">
              Lagu
            </Link>
            <Link to="/playlists" className="text-gray-700 hover:text-blue-600">
              Playlist
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-600"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;