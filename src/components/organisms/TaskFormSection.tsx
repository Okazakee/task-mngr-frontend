import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import TaskInputForm from "../molecules/TaskInputForm";
import TaskStatusLabel, { StatusLabelMode } from "../atoms/TaskStatusLabel";
import ErrorMessage from "../atoms/ErrorMessage";
import { statuses, taskStatuses } from "../pages/Dashboard";

interface TaskFormProps {
  inputText: string;
  SetInputText: (newInput: string) => void;
  handleNewTask: () => void;
  uxError: boolean;
  selectedStatus: statuses
  SetSelectedStatus: Dispatch<SetStateAction<statuses>>;
}

const TaskFormSection: FC<TaskFormProps> = ({ inputText, SetInputText, handleNewTask, uxError, selectedStatus, SetSelectedStatus }) => {

  const placeholders: string[] = ['Take a shower...', 'Start a new minecraft server...', 'Touch grass...', 'Watch mating tutorials...', 'Uninstall Riot Launcher...', 'Refresh room opening the Windows (VMs)', 'Finally get to know this misterious Ligma...'];

  const [placeholder, setPlaceholder] = useState<string>(placeholders[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholder((prev) => {
        let newPlaceholder;
        const availablePlaceholders = placeholders.filter(p => p !== prev);

        if (availablePlaceholders.length === 0) {
          // Edge case: no other placeholders available
          return prev;
        }

        const randIndex = Math.floor(Math.random() * availablePlaceholders.length);
        newPlaceholder = availablePlaceholders[randIndex];
        return newPlaceholder;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center">
      <div className="flex-col w-full">
        <TaskInputForm placeholder={placeholder} inputText={inputText} SetInputText={SetInputText} handleNewTask={handleNewTask} uxError={uxError} />
        <div className="flex justify-center mt-5">
          {taskStatuses.map((status) => (
            status !== statuses.Empty &&
            <TaskStatusLabel key={status} type={StatusLabelMode.Normal} selectedStatus={selectedStatus} status={status} SetSelectedStatus={SetSelectedStatus} />
          ))}
        </div>
        <ErrorMessage uxError={uxError}>Be sure to insert task text and status!</ErrorMessage>
      </div>
    </div>
  )
}

export default TaskFormSection;