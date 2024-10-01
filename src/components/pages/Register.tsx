import { FC } from 'react';
import { useLogin } from '../../services/mutations';
import { useAuth } from '../../services/authService';

const Register: FC = () => {

  const {signOut} = useAuth();
  const login = useLogin();
  return (
    <>
      <div className='flex justify-center'>
        <h1 className='m-10'>Register</h1>
      </div>
        <div className='justify-between mt-10 text-center'>
          <button className='mr-5 p-2 mt-10' onClick={() => login.mutate()}>register</button>
          <button className='mr-5 p-2' onClick={() => signOut()}>sign out</button>
        </div>
    </>
  )
};

export default Register;