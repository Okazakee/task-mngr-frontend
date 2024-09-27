import { FC } from 'react';
import { login } from '../../services/mutations';

const About: FC = () => {

  const asd = login();
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
          <h2 className='text-2xl text-center'>Tech stack:</h2>
      </div>
        <div className='flex justify-between mt-10 w-[10%]'>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" />
        </div>
        <button onClick={() => asd.mutate()}>login</button>
    </>
  )
};

export default About;