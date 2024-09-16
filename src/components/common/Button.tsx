import { FC } from "react";
import { Plus, CircleSlash2, Edit, Trash2, Check, X } from "lucide-react"; // Import additional icons as needed

export enum ButtonType {
  Send = 'send',
  Remove = 'remove',
  Edit = 'edit',
  EditDone = 'editDone',
  Close = 'close'
}

interface ButtonProps {
  type: ButtonType;
  uxError: boolean;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ type, onClick, uxError }) => {

    switch (type) {
      case ButtonType.Remove:
        return <button onClick={() => onClick()} className="transition-all rounded-br-lg lg:rounded-r-xl text-xl font-bold flex items-center p-4"><Trash2 size={20} color="#747bff" className="" /></button>;
      case ButtonType.Edit:
        return <button onClick={() => onClick()} className="rounded-tr-lg lg:rounded-none transition-all text-xl font-bold flex items-center p-4"><Edit size={20} color="#747bff" className="" /></button>;
      case ButtonType.Send:
      default:
        return <button disabled={uxError} onClick={() => onClick()} className="transition-all rounded-r-xl text-xl font-bold flex items-center p-4 disabled:pointer-events-none disabled:border-transparent">
          <CircleSlash2 className={`text-red-600 ${!uxError ? 'opacity-0' : 'opacity-100'}`} />
          <Plus color="#747bff" className={`absolute ${uxError ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
         </button>;
      case ButtonType.EditDone:
        return <button onClick={() => onClick()} className="transition-all lg:rounded-r-xl text-xl font-bold flex items-center p-4"><Check size={20} color="#747bff" className="" /></button>;
      case ButtonType.Close:
        return <button onClick={() => onClick()} className="transition-all lg:rounded-r-xl text-xl font-bold flex items-center p-4"><X size={20} color="#747bff" className="" /></button>;
    }

};

export default Button;