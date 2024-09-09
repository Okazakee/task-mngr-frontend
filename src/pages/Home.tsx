import { FC, useEffect, useState } from "react";
import Button from '../components/common/Button'
import { ButtonType } from "../components/common/Button";

export interface Todo {
  text: string;
  state: 'done' | 'pending' | 'on-hold'
}

const taskStates: Todo['state'][] = ['done', 'pending', 'on-hold'];

const Home: FC = () => {
  const [todos, SetTodos] = useState<Todo[]>([]);
  const [selectedState, SetSelectedState] = useState('');
  const [inputText, SetInputText] = useState('');
  const [uxError, SetUxError] = useState(false);
  const [editMode, SetEditMode] = useState({ taskNum: -1, edit: false }); // Track which task is being edited
  const [editInputText, SetEditInputText] = useState('');
  const [editState, SetEditState] = useState<Todo['state']>('pending');

  const HandleNewTask = () => {
    if (selectedState.length > 0 && inputText.length > 0) {
      SetTodos([...todos, { text: inputText, state: selectedState as Todo['state'] }]);
      SetInputText('');
      SetSelectedState('');
    }
  };

  const HandleEditMode = (taskNum: number) => {
    SetEditMode({ taskNum, edit: true });
    SetEditInputText(todos[taskNum].text);
    SetEditState(todos[taskNum].state);
  };

  const SaveEditedTask = () => {
    const updatedTodos = [...todos];
    updatedTodos[editMode.taskNum] = { text: editInputText, state: editState }; // Update task text and state
    SetTodos(updatedTodos);
    SetEditMode({ taskNum: -1, edit: false }); // Exit edit mode
  };

  const HandleRemoveTask = (taskIndex: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(taskIndex, 1);
    SetTodos(updatedTodos);
  };

  useEffect(() => {
    if (selectedState.length === 0 || inputText.length === 0) {
      SetUxError(true);
    } else {
      SetUxError(false);
    }
  }, [selectedState, inputText]);

  return (
    <div className='text-center mt-10 '>
      <div className="flex justify-center items-center">
        <div className="flex-col mr-5">
          <div className="flex">
            <input className='rounded-l-xl bg-gray-600 p-2' type='text' value={inputText} onChange={(e) => SetInputText(e.target.value)} />
            <Button type={ButtonType.Send} onClick={HandleNewTask} uxError={uxError}>
            </Button>
          </div>
          <div className="flex justify-center mt-5">
            {taskStates.map((state) => (
              <button
                key={state}
                onClick={() => selectedState === state ? SetSelectedState('') : SetSelectedState(state)}
                className={`p-2 rounded-lg mx-2 ${selectedState === state && selectedState === 'done' ? 'bg-emerald-800' : selectedState === state && selectedState === 'pending' ? 'bg-orange-800' : selectedState === state && selectedState === 'on-hold' ? 'bg-red-800' : ''}`}>
                {state === 'on-hold' ? 'on hold' : state}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className=" text-2xl">Task list</h2>
        <div className="mt-10 p-20 bg-gray-600 w-fit rounded-xl max-w-5xl">
          {todos.length > 0 ?
            todos.map((todo, i) =>
              <div className="flex mb-5" key={todo.text}>
                {editMode.edit && editMode.taskNum === i ?
                  <div className="flex items-center bg-[#1a1a1a] pl-5 rounded-xl w-full">
                    <input
                      className="rounded-xl p-2 mr-5"
                      value={editInputText}
                      onChange={(e) => SetEditInputText(e.target.value)}
                    />
                    <div className="flex justify-center">
                      {taskStates.map((state) => (
                        <button
                          key={state}
                          onClick={() => SetEditState(state)}
                          className={`p-2 rounded-lg mx-2 ${editState === state && editState === 'done' && 'bg-emerald-800' || editState === state && editState === 'pending' && 'bg-orange-800' || editState === state && editState === 'on-hold' && 'bg-red-800'}`}>
                          {state === 'on-hold' ? 'on hold' : state}
                        </button>
                      ))}
                    </div>
                    <Button type={ButtonType.Send} uxError={false} onClick={SaveEditedTask} />
                  </div>
                :
                <>
                  <div className="flex items-center bg-[#1a1a1a] px-5 rounded-l-xl w-full">
                    <p className='rounded-l-xl p-2'>{todo.text}</p>
                  </div>
                  <div className={`px-5 w-40 flex items-center justify-center pointer-events-none ${todo.state === 'done' && 'bg-emerald-800' || todo.state === 'pending' && 'bg-orange-800' || todo.state === 'on-hold' && 'bg-red-800'}`}>{todo.state === 'on-hold' ? 'on hold' : todo.state}</div>
                  <Button type={ButtonType.Edit} uxError={false} onClick={() => HandleEditMode(i)} />
                  <Button type={ButtonType.Remove} uxError={false} onClick={() => HandleRemoveTask(i)} />
                </>
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
