export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  mood?: string; // menambahkan mood sebagai opsional
  createdAt: string;
  updatedAt: string;
}
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}