import { FC, useEffect, useState } from "react";
import Button from '../components/common/Button'
import { ButtonType } from "../components/common/Button";
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../services/querys';
import { Loader } from "lucide-react";
import { useCreateTask, useDeleteTask, useEditTask } from "../services/mutations";

export interface Task {
  id?: number
  text: string;
  status: 'done' | 'pending' | 'on-hold' | ''
}

const taskStates: Task['status'][] = ['done', 'pending', 'on-hold'];

const Home: FC = () => {

  // query data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: 5 * 60 * 1000
  });

  const createTask = useCreateTask();
  const editTask = useEditTask();
  const deleteTask = useDeleteTask();

  const [tasks, SetTasks] = useState<Task[]>([]);
  const [selectedState, SetSelectedState] = useState<Task['status']>('');
  const [inputText, SetInputText] = useState('');
  const [uxError, SetUxError] = useState(false);
  const [editMode, SetEditMode] = useState({ taskID: -1, edit: false });
  const [editInputText, SetEditInputText] = useState('');
  const [editStatus, SetEditStatus] = useState<Task['status']>('pending');

  useEffect(() => {
    if (data) {
      SetTasks(data);
    }
  }, [data]);

  const HandleNewTask = () => {
    if (selectedState.length > 0 && inputText.length > 0) {
      createTask.mutate({ text: inputText, status: selectedState }, {
        onSuccess: () => {
          refetch();
        }
      });
      SetInputText('');
      SetSelectedState('');
    }
  };

  const HandleEditMode = (taskID: number) => {
    SetEditMode({ taskID, edit: true });
    SetEditInputText(tasks[taskID].text);
    SetEditStatus(tasks[taskID].status);
  };

  const SaveEditedTask = (taskID: number) => {
    editTask.mutate({id: taskID, text: editInputText, status: editStatus }, {
      onSuccess: () => {
        refetch();
      }
    });
    SetEditMode({ taskID: -1, edit: false });
  };

  const HandleRemoveTask = (taskIndex: number) => {
    deleteTask.mutate(taskIndex, {
      onSuccess: () => {
        refetch();
      }
    });
  };

  useEffect(() => {
    if (selectedState.length === 0 || inputText.length === 0) {
      SetUxError(true);
    } else {
      SetUxError(false);
    }
  }, [selectedState, inputText]);

  return (
    <div className='text-center mt-20 '>
      <div className="flex justify-center items-center">
        <div className="flex-col mr-5">
          <div className="flex">
            <input className='rounded-l-xl bg-gray-600 p-2' placeholder="Take a shower..." type='text' value={inputText} onChange={(e) => SetInputText(e.target.value)} />
            <Button type={ButtonType.Send} onClick={HandleNewTask} uxError={uxError}>
            </Button>
          </div>
          <p>errore</p>
          <div className="flex justify-center mt-5">
            {taskStates.map((status) => (
              <button
                key={status}
                onClick={() => selectedState === status ? SetSelectedState('') : SetSelectedState(status)}
                className={`transition-all p-2 rounded-lg mx-2 ${selectedState === status && selectedState === 'done' ? 'bg-emerald-800' : selectedState === status && selectedState === 'pending' ? 'bg-orange-800' : selectedState === status && selectedState === 'on-hold' ? 'bg-red-800' : ''}`}>
                {status === 'on-hold' ? 'on hold' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className=" text-2xl">Tasks list</h2>
        <div className="mt-10 p-20 bg-gray-600 w-fit rounded-xl">
          {isLoading ? <Loader size={80} color="#242424" className="animate-spin-slow" /> : error ? <p>Error loading tasks...</p> :
          tasks.length > 0 ?
            tasks.map((task, i) =>
              <div className={`flex mb-5 ${i === tasks.length -1 && 'mb-0'}`} key={task.text}>
                {editMode.edit && editMode.taskID === i ?
                  <div className="flex items-center bg-[#1a1a1a] pl-2 rounded-xl w-full">
                    <input
                      className="rounded-xl p-2 bg-[#262626]"
                      value={editInputText}
                      onChange={(e) => SetEditInputText(e.target.value)}
                    />
                    <div className="flex justify-center">
                      {taskStates.map((status) => (
                        <button
                          key={status}
                          onClick={() => SetEditStatus(status)}
                          className={`p-2 rounded-lg mx-2 ${editStatus === status && editStatus === 'done' && 'bg-emerald-800' || editStatus === status && editStatus === 'pending' && 'bg-orange-800' || editStatus === status && editStatus === 'on-hold' && 'bg-red-800'}`}>
                          {status === 'on-hold' ? 'on hold' : status}
                        </button>
                      ))}
                    </div>
                    <Button type={ButtonType.EditDone} uxError={false} onClick={() => SaveEditedTask(task.id!)} />
                  </div>
                :
                <div className="bg-[#1a1a1a] flex rounded-xl w-full">
                  <div className="">
                    <p className='rounded-l-xl p-4 w-64 text-left'>{task.text}</p>
                  </div>
                  <div className="flex ml-auto">
                    <div className={`m-2 p-2 rounded-lg flex items-center justify-center pointer-events-none min-w-24 ${task.status === 'done' && 'bg-emerald-800' || task.status === 'pending' && 'bg-orange-800' || task.status === 'on-hold' && 'bg-red-800'}`}>
                      {task.status === 'on-hold' ? 'on hold' : task.status}
                    </div>
                    <Button type={ButtonType.Edit} uxError={false} onClick={() => HandleEditMode(i)} />
                    <Button type={ButtonType.Remove} uxError={false} onClick={() => HandleRemoveTask(task.id!)} />
                  </div>
                </div>
                }
              </div>
            )
          :
            <p>There are no tasks right now.</p>}
        </div>
      </div>
    </div>
  );
}

export default Home;
