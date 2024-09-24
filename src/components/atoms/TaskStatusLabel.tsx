import { FC, Dispatch, SetStateAction } from "react";
import { statuses } from "../../routes/index";

export enum StatusLabelMode {
  Normal = 'normal',
  Editing = 'editing'
}

interface TaskStatusPropsNormal {
  type: StatusLabelMode.Normal;
  selectedStatus: string;
  status: statuses;
  SetSelectedStatus: Dispatch<SetStateAction<statuses>>;
  SetEditStatus?: never; // Not used in Normal mode
}

interface TaskStatusPropsEditing {
  type: StatusLabelMode.Editing;
  selectedStatus: string;
  status: statuses;
  SetSelectedStatus?: never; // Not used in Editing mode
  SetEditStatus: Dispatch<SetStateAction<statuses>>;
}

type TaskStatusProps = TaskStatusPropsNormal | TaskStatusPropsEditing;

export const statusColors: Record<statuses, string> = {
  done: 'bg-emerald-800',
  pending: 'bg-orange-800',
  'on-hold': 'bg-red-800',
  "": ""
};

const TaskStatusLabel: FC<TaskStatusProps> = ({ type, selectedStatus, status, SetSelectedStatus, SetEditStatus }) => {
  const isSelected = selectedStatus === status;
  const buttonClass = `transition-all p-2 rounded-lg mx-2 ${isSelected ? statusColors[status] : ''}`;

  switch(type) {
    case StatusLabelMode.Normal:
      return (
        <button
          onClick={() => SetSelectedStatus(isSelected ? statuses.Empty : status)}
          className={buttonClass}
        >
          {status === 'on-hold' ? 'on hold' : status}
        </button>
      )
    case StatusLabelMode.Editing:
      return (
        <button
          onClick={() => SetEditStatus(isSelected ? statuses.Empty : status)}
          className={buttonClass}
        >
          {status === 'on-hold' ? 'on hold' : status}
        </button>
      )
  }
}

export default TaskStatusLabel;
