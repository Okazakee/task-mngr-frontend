import {Dispatch, FC, SetStateAction} from 'react';
import EditTaskLabels from './EditTaskLabels';
import Button, { ButtonType } from '../atoms/Button';
import { statuses, Task } from '../pages/Dashboard';

interface EditTaskProps {
  editInputText: string;
  SetEditInputText: Dispatch<SetStateAction<string>>;
  editStatus: string;
  SetEditStatus: Dispatch<SetStateAction<statuses>>;
  task: Task;
  saveEditedTask: (id: number, text: string, status: statuses) => void;
}

const EditTaskRow: FC<EditTaskProps> = ({ editInputText, SetEditInputText, editStatus, SetEditStatus, task, saveEditedTask }) => {
  return (
    <div className="flex items-center bg-[#1a1a1a] pl-2 rounded-xl">
      <div className="p-2">
        <input
          type="text"
          className="rounded-xl p-4 text-left bg-[#262626]"
          value={editInputText}
          onChange={(e) => SetEditInputText(e.target.value)}
        />
      </div>
      <EditTaskLabels editStatus={editStatus} SetEditStatus={SetEditStatus} />
      <Button type={editInputText === task.text && editStatus === task.status ? ButtonType.Close : ButtonType.EditDone} uxError={false} onClick={() => saveEditedTask(task.id!, task.text, task.status)} />
    </div>
  )
}

export default EditTaskRow;