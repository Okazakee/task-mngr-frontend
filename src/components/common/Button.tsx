import { FC } from "react";
import { Plus, CircleSlash2, Edit, Trash2 } from "lucide-react"; // Import additional icons as needed

export enum ButtonType {
  Send = 'send',
  Remove = 'remove',
  Edit = 'edit'
}

interface ButtonProps {
  type: ButtonType;
  uxError: boolean;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ type, onClick, uxError }) => {

    switch (type) {
      case ButtonType.Remove:
        return <button onClick={() => onClick()} className="transition-all rounded-r-xl text-xl font-bold flex items-center p-4"><Trash2 color="#747bff" className="" /></button>;
      case ButtonType.Edit:
        return <button onClick={() => onClick()} className="transition-all text-xl font-bold flex items-center p-4"><Edit color="#747bff" className="" /></button>;
      case ButtonType.Send:
      default:
        return <button disabled={uxError} onClick={() => onClick()} className="transition-all rounded-r-xl text-xl font-bold flex items-center p-4 disabled:pointer-events-none disabled:border-transparent">
          {uxError ? <CircleSlash2 color="red" className="" /> : <Plus color="#747bff" className="" />}
         </button>;
    }

};

export default Button;