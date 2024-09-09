import { FC, ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <div className="absolute bottom-5 flex justify-center w-full">
      <p>
        {children}
      </p>
    </div>
  );
};

export default Footer;