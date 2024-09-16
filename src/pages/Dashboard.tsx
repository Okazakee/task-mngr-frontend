import { FC, useState } from "react";
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTasks } from '../services/querys';
import { useCreateTask, useDeleteTask, useEditTask } from "../services/mutations";
import TaskList from "../components/organisms/TaskList";
import TaskFormSection from "../components/organisms/TaskFormSection";

export interface TaskPage {
  tasks: Task[];
  totalTasks: number;
  hasNextPage: boolean;
}

export enum statuses {
  Done = 'done',
  Pending = 'pending',
  OnHold = 'on-hold',
  Empty = ''
}

export interface Task {
  id: number;
  text: string;
  status: statuses;
}

export const taskStatuses = Object.values(statuses);

const Home: FC = () => {

  const [selectedStatus, SetSelectedStatus] = useState<Task['status']>(statuses.Empty);
  const [inputText, SetInputText] = useState('');
  const [uxError, SetUxError] = useState(false);
  const [editMode, SetEditMode] = useState({ taskID: -1, edit: false });
  const [editInputText, SetEditInputText] = useState('');
  const [editStatus, SetEditStatus] = useState<Task['status']>(statuses.Pending);

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

  //mutations
  const handleNewTask = () => {
    if (selectedStatus.length > 0 && inputText.length > 0) {
      createTask.mutate(
        { id: 0, text: inputText, status: selectedStatus },
        {
          onSuccess: () => {
            SetInputText('');
            SetSelectedStatus(statuses.Empty);
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

  return (
    <div className='text-center mt-10 mb-16'>
      <TaskFormSection
        inputText={inputText}
        SetInputText={SetInputText}
        handleNewTask={handleNewTask}
        uxError={uxError}
        selectedStatus={selectedStatus}
        SetSelectedStatus={SetSelectedStatus}
      />
      <TaskList
        taskPages={taskPages}
        isLoading={isLoading}
        error={error}
        allTasks={allTasks}
        editInputText={editInputText}
        editMode={editMode}
        editStatus={editStatus}
        SetEditInputText={SetEditInputText}
        saveEditedTask={saveEditedTask}
        SetEditStatus={SetEditStatus}
        handleRemoveTask={handleRemoveTask}
        HandleEditMode={HandleEditMode}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}

export default Home;