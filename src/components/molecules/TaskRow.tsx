import {FC} from 'react';
import Button, { ButtonType } from '../atoms/Button';
import { Task } from '../pages/Dashboard';

interface TaskRowProps {
  task: Task;
  i: number;
  HandleEditMode: (i: number) => void;
  handleRemoveTask: (taskID: number) => void;
}

const TaskRow: FC<TaskRowProps> = ({ task, i, HandleEditMode, handleRemoveTask }) => {
  return (
    <div className="bg-[#1a1a1a] flex rounded-xl w-full">
      <div className="p-2">
        <p className='rounded-l-xl p-4 w-48 lg:w-72 text-left'>{task.text}</p>
      </div>
      <div className="flex ml-auto items-center">
        <div className={`m-2 p-2 rounded-lg flex items-center justify-center pointer-events-none max-h-10 min-w-20 lg:min-w-24 ${task.status === 'done' && 'bg-emerald-800' || task.status === 'pending' && 'bg-orange-800' || task.status === 'on-hold' && 'bg-red-800'}`}>
          {task.status === 'on-hold' ? 'on hold' : task.status}
        </div>
      </div>
      <div className="lg:flex">
        <Button type={ButtonType.Edit} uxError={false} onClick={() => HandleEditMode(i)} />
        <Button type={ButtonType.Remove} uxError={false} onClick={() => handleRemoveTask(task.id)} />
      </div>
    </div>
  )
}

export default TaskRow;