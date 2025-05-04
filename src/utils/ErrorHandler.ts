import { AxiosError } from 'axios';

interface ApiErrorResponse {
  message: string;
  statusCode?: number;
}

export const handleApiError = (error: AxiosError<ApiErrorResponse>) => {
  if (error.response) {
    // Error dari server
    return error.response.data.message || 'Terjadi kesalahan pada server';
  } else if (error.request) {
    // Error tidak ada response
    return 'Tidak dapat terhubung ke server';
  } else {
    // Error lainnya
    return 'Terjadi kesalahan';
  }
};