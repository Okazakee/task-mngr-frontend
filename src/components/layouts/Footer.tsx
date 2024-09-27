import { FC, ReactNode } from "react";
import { Link } from '@tanstack/react-router'

interface FooterProps {
  children: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {

  return (
    <div className="fixed bottom-0 flex justify-center w-full bg-[#1a1a1a] h-10 items-center">
      <p>
        {children}
      </p>
      <Link className="ml-5 p-2" to="/">Home</Link>
      <Link className="ml-5 p-2" to="/about">About</Link>
      <Link className="ml-5 p-2" to="/login">Login</Link>
      <Link className="ml-5 p-2" to="/register">Register</Link>
    </div>
  );
};

export default Footer;