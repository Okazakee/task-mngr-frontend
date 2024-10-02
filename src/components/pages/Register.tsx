import { FC } from 'react';
import { useLogin } from '../../services/mutations';

const Register: FC = () => {

  const login = useLogin();
  return (
    <>
      <div className='flex justify-center'>
        <h1 className='m-10'>Register</h1>
      </div>
        <div className='justify-between mt-10 text-center'>
          <button className='mr-5 p-2 mt-10' onClick={() => login.mutate()}>register</button>
        </div>
    </>
  )
};

export default Register;