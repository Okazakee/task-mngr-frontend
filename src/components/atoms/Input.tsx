import { FC } from "react";

interface InputProps {
  placeholder: string;
  inputText: string;
  SetInputText: (newInputText: string) => void;
}

const Input: FC<InputProps> = ({ placeholder, inputText, SetInputText }) => {
  return (
    <input id="animated-input" className='transition-all rounded-l-xl bg-gray-600 w-[22rem] p-2' placeholder={placeholder} type='text' value={inputText} onChange={(e) => SetInputText(e.target.value)} />
  )
}

export default Input;