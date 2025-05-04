export interface Playlist {
  id: string;
  name: string;
  description?: string;
  mood?: string;
  songs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PlaylistSong {
  id: string;
  playlistId: string;
  songId: string;
  createdAt: string;
}