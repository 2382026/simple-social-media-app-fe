import axios from '../utils/AxiosInstance';
import { User } from '../types/User';

interface UpdateProfileData {
  username: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}

export const UserService = {
  getProfile: async () => {
    const response = await axios.get('/api/users/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData) => {
    const response = await axios.put('/api/users/profile', data);
    return response.data;
  }
};