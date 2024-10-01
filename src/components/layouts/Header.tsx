import { Link } from "@tanstack/react-router";
import { UserSquare, ChevronDown } from "lucide-react";
import { FC, ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {

  const {username} = JSON.parse(localStorage.getItem('userInfo') || 'false');

  return (
    <h1 className="text-center mt-10">
      <div className='flex mx-5 items-center justify-between relativ cursor-pointer'>
        <div className='text-sm bg-[#1a1a1a] rounded-xl p-3 flex items-center'>
          <UserSquare
            size={35}
            color="#747bff"
          />
          <p className="mx-2">{username || 'N/A'}</p>
          <ChevronDown
            size={25}
            color="#747bff"
          />
        </div>
        <h2 className='text-4xl bg-[#1a1a1a] p-3 rounded-xl absolute left-1/2 transform -translate-x-1/2'>
          {children}
        </h2>
        <div className='text-lg bg-[#1a1a1a] p-3 rounded-xl'>
          <Link className="p-2" to="/">Home</Link>
          <Link className="p-2" to="/about">About</Link>
          <Link className="p-2" to="/login">Login</Link>
          <Link className="p-2" to="/register">Register</Link>
        </div>
      </div>
    </h1>
  );
};

export default Header;