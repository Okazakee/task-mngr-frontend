import { CircleX, Loader } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import EditTaskRow from "../molecules/EditTaskRow";
import TaskRow from "../molecules/TaskRow";
import { statuses, Task, TaskPage } from "../../pages/Dashboard";
import Button, { ButtonType } from "../atoms/Button";

interface TaskListProps {
  isLoading: boolean;
  error: Error | null;
  allTasks: Task[];
  editMode: {
    taskID: number,
    edit: boolean
  };
  editInputText: string;
  SetEditInputText: Dispatch<SetStateAction<string>>;
  editStatus: string;
  SetEditStatus: Dispatch<SetStateAction<statuses>>;
  saveEditedTask: (id: number, text: string, status: statuses) => void;
  HandleEditMode: (i: number) => void;
  handleRemoveTask: (taskID: number) => void;
  taskPages: TaskPage[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const TaskList: FC<TaskListProps> = ({
    isLoading,
    error,
    allTasks,
    editMode,
    editInputText,
    SetEditInputText,
    editStatus,
    SetEditStatus,
    saveEditedTask,
    handleRemoveTask,
    HandleEditMode,
    taskPages,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }) => {

    return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h2 className="text-2xl">Tasks list:</h2>
      <div className="mt-10 p-8 lg:pt-14 lg:px-14 lg:pb-8 bg-gray-600 w-fit rounded-xl">
        {isLoading ?
          <Loader
            size={60}
            color="#747bff"
            className="animate-spin-slow"
          />
        : error ?
        <div
          className="flex items-center p-4 rounded-lg bg-[#242424]">
            <CircleX
              size={30}
              className="text-red-600 mr-2"
            />
            <p>Error loading tasks...</p>
        </div> :
        allTasks.length > 0 ?
          allTasks.map((task: Task, i: number) =>
            <div className={`flex ${i === allTasks.length - 1 ? 'mb-0' : 'mb-5'}`} key={task.id}>
                {editMode.edit && editMode.taskID === i ?
                  <EditTaskRow
                    task={task}
                    editInputText={editInputText}
                    SetEditInputText={SetEditInputText}
                    editStatus={editStatus}
                    SetEditStatus={SetEditStatus}
                    saveEditedTask={saveEditedTask}
                  />
                :
                <TaskRow task={task} i={i} HandleEditMode={HandleEditMode} handleRemoveTask={handleRemoveTask} />
                }
            </div>
          )
        :
          <p>There are no tasks right now.</p>
        }
        {!error && taskPages && taskPages.length > 0 && hasNextPage &&
          <Button
            type={ButtonType.Text}
            onClick={() => fetchNextPage()}
            className="transition-all mt-8 rounded-xl p-2">{isFetchingNextPage ? 'Fetching tasks...' : 'Load more...'}
          </Button>
        }
      </div>
    </div>
  )
}

export default TaskList;