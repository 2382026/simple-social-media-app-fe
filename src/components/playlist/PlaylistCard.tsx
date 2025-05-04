interface PlaylistCardProps {
  name: string;
  mood: string;
  songCount: number;
  onViewSongs: () => void;
}

const PlaylistCard = ({ name, mood, songCount, onViewSongs }: PlaylistCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
              {mood}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {songCount} lagu
          </span>
        </div>
        
        <button
          onClick={onViewSongs}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Lihat Lagu
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;