import { FC } from "react";
import Input from "../atoms/Input";
import Button, { ButtonType } from "../atoms/Button";

interface TaskInputFormProps {
  placeholder: string;
  inputText: string;
  SetInputText: (newInputText: string) => void;
  handleNewTask: () => void;
  uxError: boolean;
}

const TaskInputForm: FC<TaskInputFormProps> = ({ placeholder, inputText, SetInputText, handleNewTask, uxError }) => {
  return (
    <div className="flex justify-center">
      <Input placeholder={placeholder} inputText={inputText} SetInputText={SetInputText} />
      <Button type={ButtonType.Send} onClick={handleNewTask} uxError={uxError} />
    </div>
  )
}

export default TaskInputForm;