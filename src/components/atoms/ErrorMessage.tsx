import { FC, ReactNode } from "react";

interface ErrorMsgProps {
  uxError: boolean;
  children: ReactNode
}

const ErrorMessage: FC<ErrorMsgProps> = ({ uxError, children }) => {
  return (
    <p className={`text-red-600 transition-all ${!uxError ? '-mt-5 opacity-0 pointer-events-none' : 'mt-5 opacity-100'}`}>{children}</p>
  )
}

export default ErrorMessage;