import { FC } from 'react';
import { useLogin } from '../../services/mutations';

const Login: FC = () => {

  const login = useLogin();
  return (
    <>
      <div className='flex justify-center'>
        <h1 className='m-10'>Login</h1>
      </div>
        <div className='justify-between mt-10 text-center'>
          <button className='mr-5 p-2 mt-10' onClick={() => login.mutate()}>login</button>
        </div>
    </>
  )
};

export default Login;