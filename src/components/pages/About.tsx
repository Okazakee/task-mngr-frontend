import { FC } from 'react';

const About: FC = () => {
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
    </>
  )
};

export default About;