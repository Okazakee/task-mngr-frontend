import {Dispatch, FC, SetStateAction} from 'react';
import { statuses, taskStatuses } from '../../routes/index';
import Button, { ButtonType } from '../atoms/Button';
import { statusColors } from '../atoms/TaskStatusLabel';

interface EditTaskProps {
  editStatus: string;
  SetEditStatus: Dispatch<SetStateAction<statuses>>;
}

const EditTaskLabels: FC<EditTaskProps> = ({ editStatus, SetEditStatus }) => {
  return (
    <div className="flex justify-center">
      {taskStatuses.map((status) => (
        status !== statuses.Empty &&
          <Button
            type={ButtonType.Text}
            key={status}
            onClick={() => SetEditStatus(status)}
            className={`p-2 rounded-lg mx-2 ${editStatus === status ? statusColors[status] : ''}`}>
            {status === 'on-hold' ? 'on hold' : status}
          </Button>
        ))
      }
    </div>
  )
}

export default EditTaskLabels;