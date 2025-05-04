// Request Types
export interface CreateSongRequest {
  title: string;
  artist: string;
  duration: string;
}

export interface UpdateSongRequest {
  title?: string;
  artist?: string;
  duration?: string;
}

// Response Types
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}