import { Song } from "../../types/Song";
import SongCard from "./SongCard";

interface SongListProps {
  songs: Song[];
}

const SongList = ({ songs }: SongListProps) => {
  if (songs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No songs found. Add your first song!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
};

export default SongList;