import axios, { AxiosError } from 'axios';

const apiUrl = process.env.VITE_API_URL;

export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return false; // No token means the user is not authenticated
  }

  try {

    verifyJWT(token)

  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Token verification failed', axiosError.response?.data || axiosError.message);
    return false; // If token verification fails, return false
  }
};

const verifyJWT = async (token: string) => {
  return await axios.get(`${apiUrl}/auth/verify`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}