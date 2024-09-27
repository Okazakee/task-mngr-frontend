import { FC } from 'react';
import { useLogin } from '../../services/mutations';
import { useAuth } from '../../services/authService';

const About: FC = () => {

  const {username, email} = JSON.parse(localStorage.getItem('userInfo') || 'false');

  const {signOut} = useAuth();
  const login = useLogin();
  return (
    <>
      <div className='flex justify-center'>
        <h1 className='m-10'>About</h1>
      </div>
      <div className='flex justify-center'>
        <div className='bg-gray-600 rounded-xl p-5 flex justify-center text-xl'>
          This is a fullstack project for my portfolio, feel free to check it out on my website!
        </div>
      </div>
      <div className='flex justify-center mt-10'>
          <h2 className='text-2xl text-center'>User info:</h2>
      </div>
        <div className='justify-between mt-10 text-center'>
          <p>username: {username}</p>
          <p>email: {email}</p>
          <button className='mr-5 p-2 mt-10' onClick={() => login.mutate()}>register</button>
          <button className='mr-5 p-2 mt-10' onClick={() => login.mutate()}>login</button>
          <button className='mr-5 p-2' onClick={() => signOut()}>sign out</button>
        </div>
    </>
  )
};

export default About;