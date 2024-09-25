import axios from 'axios';
import { apiUrl, token } from '../main';

export const useAuth = () => {

  const isLogged = async () => {

    const { data } = await axios.get(`${apiUrl}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const valid = data.message === 'Token is valid';

    return valid
  }

  const signIn = () => {
    // query receiving jwt token
    localStorage.setItem('authToken', 'true');
  };

  const signOut = () => {
    localStorage.removeItem('authToken');
  };

  return { signIn, signOut, isLogged };

};

export type AuthContext = ReturnType<typeof useAuth>;