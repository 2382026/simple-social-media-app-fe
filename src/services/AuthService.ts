import axios from '../utils/AxiosInstance';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const AuthService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await axios.post('/api/auth/register', data);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post('/api/auth/logout');
    return response.data;
  }
};