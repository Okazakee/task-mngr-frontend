import axios from 'axios';
import Cookies from 'js-cookie';
import { apiUrl } from './envExports';

//TODO find a way to use mutations here without triggering hook call issue

export const useAuth = () => {

  const isLogged = async () => {
    // Check 'localAuth' cookie
    const localLogged = Cookies.get('localAuth') === 'true';

    // if cookie does not exist or is expired
    if (!localLogged) {

      try {
        const response = await axios.get(`${apiUrl}/auth/verify`);
        const logged = response.status === 200; // Check for a successful response

        return logged;
      } catch (error) {
        console.error('Error verifying authentication:', error);
        return false; // Return false if the request fails
      }
    } else {
        return localLogged
    }
  };

  const signIn = () => {
    // query receiving jwt token
    localStorage.setItem('authToken', 'true');
  };

  const signOut = async () => {

    await axios.get(`${apiUrl}/auth/logout`);

    // remove cookie and user info
    Cookies.remove('localAuth');
    localStorage.removeItem('userInfo');
  };

  return { signIn, signOut, isLogged };

};

export type AuthContext = ReturnType<typeof useAuth>;