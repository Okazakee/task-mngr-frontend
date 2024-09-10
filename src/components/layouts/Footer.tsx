import { FC, ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <div className="fixed bottom-0 flex justify-center w-full bg-[#242424] h-12 items-center">
      <p>
        {children}
      </p>
    </div>
  );
};

export default Footer;