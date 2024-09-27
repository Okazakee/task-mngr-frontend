import axios from 'axios';
import { apiUrl } from '../main';

//TODO find a way to use mutations here without triggering hook call issue

export const useAuth = () => {

  const isLogged = async () => {
    try {

      return (await axios.get(`${apiUrl}/auth/verify`)).status && true;

    } catch (error) {
      console.log('asdasd')
      return false

    }
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