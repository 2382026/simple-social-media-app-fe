import axios from '../utils/AxiosInstance';
import { AxiosError } from 'axios';
import { Song } from '../types/Song';
import { CreateSongRequest, UpdateSongRequest, ApiResponse } from '../types/api.types';
import { handleApiError } from '../utils/ErrorHandler';

interface ApiErrorResponse {
  message: string;
  statusCode: number;
}

export const songService = {
  // Create
  createSong: async (data: CreateSongRequest): Promise<Song> => {
    try {
      const response = await axios.post<ApiResponse<Song>>('/api/songs', data);
      return response.data.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw new Error(handleApiError(err));
      }
      throw new Error('Terjadi kesalahan yang tidak diketahui');
    }
  },

  // Read
  getAllSongs: async (): Promise<Song[]> => {
    try {
      const response = await axios.get<ApiResponse<Song[]>>('/api/songs');
      return response.data.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw new Error(handleApiError(err));
      }
      throw new Error('Terjadi kesalahan yang tidak diketahui');
    }
  },

  getSongById: async (id: string): Promise<Song> => {
    try {
      const response = await axios.get<ApiResponse<Song>>(`/api/songs/${id}`);
      return response.data.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw new Error(handleApiError(err));
      }
      throw new Error('Terjadi kesalahan yang tidak diketahui');
    }
  },

  // Update
  updateSong: async (id: string, data: UpdateSongRequest): Promise<Song> => {
    try {
      const response = await axios.put<ApiResponse<Song>>(`/api/songs/${id}`, data);
      return response.data.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw new Error(handleApiError(err));
      }
      throw new Error('Terjadi kesalahan yang tidak diketahui');
    }
  },

  // Delete
  deleteSong: async (id: string): Promise<void> => {
    try {
      await axios.delete(`/api/songs/${id}`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw new Error(handleApiError(err));
      }
      throw new Error('Terjadi kesalahan yang tidak diketahui');
    }
  }
};