import { FC, ReactNode } from "react";
import { useSpawnTasks } from "../../services/mutations";
import { Link } from '@tanstack/react-router'

interface FooterProps {
  children: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {

  const spawnTasks = useSpawnTasks();

  return (
    <div className="fixed bottom-0 flex justify-center w-full bg-[#1a1a1a] h-10 items-center">
      <p>
        {children}
      </p>
      <button className="ml-5 p-2" onClick={() => spawnTasks.mutate()}>Spawn tasks</button>
      <Link className="ml-5 p-2" to="/">Home</Link>
      <Link className="ml-5 p-2" to="/about">About</Link>
    </div>
  );
};

export default Footer;