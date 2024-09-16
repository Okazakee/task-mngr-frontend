import { FC, useState, useEffect } from "react";
import Button from '../components/common/Button'
import { ButtonType } from "../components/common/Button";
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTasks } from '../services/querys';
import { Loader, CircleX } from "lucide-react";
import { useCreateTask, useDeleteTask, useEditTask } from "../services/mutations";

interface TaskPage {
  tasks: Task[];
  totalTasks: number;
  hasNextPage: boolean;
}
export interface Task {
  id: number;
  text: string;
  status: 'done' | 'pending' | 'on-hold' | '';
}

const Home: FC = () => {

  const taskStatuses: Task['status'][] = ['done', 'pending', 'on-hold'];
  const placeholders: string[] = ['Take a shower...', 'Start a new minecraft server...', 'Touch grass...', 'Watch mating tutorials...', 'Uninstall Riot Launcher...', 'Refresh room opening the Windows (VMs)', 'Finally get to know this misterious Ligma...'];

  const [selectedState, SetSelectedState] = useState<Task['status']>('');
  const [inputText, SetInputText] = useState('');
  const [uxError, SetUxError] = useState(false);
  const [editMode, SetEditMode] = useState({ taskID: -1, edit: false });
  const [editInputText, SetEditInputText] = useState('');
  const [editStatus, SetEditStatus] = useState<Task['status']>('pending');
  const [placeholder, setPlaceholder] = useState<string>(placeholders[0]);

  // query data
  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length : undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  const createTask = useCreateTask();
  const editTask = useEditTask();
  const deleteTask = useDeleteTask();

  const taskPages = data?.pages as TaskPage[];
  const allTasks = taskPages?.length > 0 ? taskPages.flatMap(page => page.tasks) : [];

  const handleNewTask = () => {
    if (selectedState.length > 0 && inputText.length > 0) {
      createTask.mutate(
        { id: 0, text: inputText, status: selectedState },
        {
          onSuccess: () => {
            SetInputText('');
            SetSelectedState('');
            refetch();
          },
        }
      );
    } else {
      SetUxError(true);

      setTimeout(() => {
        SetUxError(false);
      }, 3000);
    }
  };

  const HandleEditMode = (taskID: number) => {
    SetEditMode({ taskID, edit: true });
    SetEditInputText(allTasks[taskID].text);
    SetEditStatus(allTasks[taskID].status);
  };

  const saveEditedTask = (taskID: number, taskText: string, taskStatus: string) => {

    // check diffs
    if (editInputText === taskText && editStatus === taskStatus) {
      SetEditMode({ taskID: -1, edit: false });
    } else {
      editTask.mutate(
        {id: taskID, text: editInputText, status: editStatus },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );

      SetEditMode({ taskID: -1, edit: false });
    }
  };

  const handleRemoveTask = (taskIndex: number) => {
    deleteTask.mutate(
      taskIndex, {
        onSuccess: () => {
          refetch();
        },
      }
  );
  };

  // useeffects
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
    <div className='text-center mt-10 mb-16'>
      <div className="flex items-center">
        <div className="flex-col w-full">
          <div className="flex justify-center">
            <input id="animated-input" className='transition-all rounded-l-xl bg-gray-600 w-[22rem] p-2' placeholder={placeholder} type='text' value={inputText} onChange={(e) => SetInputText(e.target.value)} />
            <Button type={ButtonType.Send} onClick={handleNewTask} uxError={uxError}>
            </Button>
          </div>
          <div className="flex justify-center mt-5">
            {taskStatuses.map((status) => (
              <button
              key={status}
              onClick={() => selectedState === status ? SetSelectedState('') : SetSelectedState(status)}
              className={`transition-all p-2 rounded-lg mx-2 ${selectedState === status && selectedState === 'done' ? 'bg-emerald-800' : selectedState === status && selectedState === 'pending' ? 'bg-orange-800' : selectedState === status && selectedState === 'on-hold' ? 'bg-red-800' : ''}`}>
                {status === 'on-hold' ? 'on hold' : status}
              </button>
            ))}
          </div>
          <p className={`text-red-600 transition-all ${!uxError ? '-mt-5 opacity-0 pointer-events-none' : 'mt-5 opacity-100'}`}>Be sure to insert task text and status!</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl">Tasks list:</h2>
        <div className="mt-10 p-8 lg:p-14 bg-gray-600 w-fit rounded-xl">
          {isLoading ? <Loader size={60} color="#747bff" className="animate-spin-slow" /> : error ? <div className="flex items-center p-4 rounded-lg bg-[#242424]"><CircleX size={30} className="text-red-600 mr-2" /><p>Error loading tasks...</p></div> :
          allTasks.length > 0 ?
              allTasks.map((task: Task, i: number) =>
                <div className={`flex ${i === allTasks.length - 1 ? 'mb-0' : 'mb-5'}`} key={task.id}>
                  {editMode.edit && editMode.taskID === i ?
                    <div className="flex items-center bg-[#1a1a1a] pl-2 rounded-xl w-full">
                      <input
                        className="rounded-xl p-2 bg-[#262626]"
                        value={editInputText}
                        onChange={(e) => SetEditInputText(e.target.value)}
                      />
                      <div className="flex justify-center">
                        {taskStatuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => SetEditStatus(status)}
                            className={`p-2 rounded-lg mx-2 ${editStatus === status && editStatus === 'done' && 'bg-emerald-800' || editStatus === status && editStatus === 'pending' && 'bg-orange-800' || editStatus === status && editStatus === 'on-hold' && 'bg-red-800'}`}>
                            {status === 'on-hold' ? 'on hold' : status}
                          </button>
                        ))}
                      </div>
                      <Button type={editInputText === task.text && editStatus === task.status ? ButtonType.Close : ButtonType.EditDone} uxError={false} onClick={() => saveEditedTask(task.id!, task.text, task.status)} />
                    </div>
                  :
                  <div className="bg-[#1a1a1a] flex rounded-xl w-full">
                    <div className="">
                      <p className='rounded-l-xl p-4 w-48 lg:w-64 text-left'>{task.text}</p>
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
                  }
                </div>
              )
          :
            <p>There are no tasks right now.</p>
          }
          {!error && taskPages && taskPages.length > 0 && hasNextPage && <button onClick={() => fetchNextPage()} className="transition-all mt-12 rounded-xl p-2">{isFetchingNextPage ? 'Fetching tasks...' : 'Load more...'}</button>}
        </div>
      </div>
    </div>
  );
}

export default Home;
