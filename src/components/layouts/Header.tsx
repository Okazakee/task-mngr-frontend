import { FC, ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <h1 className="text-center mt-10">
      {children}
    </h1>
  );
};

export default Header;