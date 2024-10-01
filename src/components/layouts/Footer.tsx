import { FC, ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {

  return (
    <div className="fixed bottom-0 flex justify-center w-full bg-[#1a1a1a] h-10 items-center">
      <p>
        {children}
      </p>
    </div>
  );
};

export default Footer;