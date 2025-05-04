import { Link } from "react-router-dom";
import { Song } from "../../types/Song";

interface SongCardProps {
  song: Song;
}

const SongCard = ({ song }: SongCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {song.title}
        </h3>
        <p className="text-gray-600 mb-4">Artist: {song.artist}</p>
        <p className="text-gray-500 text-sm mb-4">Duration: {song.duration}</p>
        
        <div className="flex justify-between items-center">
          <Link
            to={`/songs/${song.id}`}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            View Details
          </Link>
          <span className="text-gray-400 text-sm">
            Added {new Date(song.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongCard;