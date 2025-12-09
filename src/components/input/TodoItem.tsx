import React, { useState } from 'react';

import { Icon } from '@iconify/react';

// Define your interfaces
interface TodoItemType {
  id: number;
  text: string;
  checked: boolean;
}

interface ToDoItemProps {
  todoItem: TodoItemType;
  todoList: TodoItemType[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  showEditButton: boolean; // This can now be removed if no longer needed
}

// ToDoItem component definition
const ToDoItem: React.FC<ToDoItemProps> = ({
  todoItem,
  todoList,
  setTodoList,
  showEditButton,
}) => {
  const [editText, setEditText] = useState(todoItem.text); // State to manage the input value for this item

  // Function to handle checkbox change
  const onChangeCheckbox = () => {
    const nextTodoList = todoList.map((item) =>
      item.id === todoItem.id ? { ...item, checked: !item.checked } : item
    );

    setTodoList(nextTodoList);
  };

  // Function to handle delete
  const onDelete = () => {
    const nextTodoList = todoList.filter((item) => item.id !== todoItem.id);
    setTodoList(nextTodoList);
  };

  return (
    <div>
      <li
        className={`relative rounded-lg bg-yellow-100 p-4 shadow-lg ${
          todoItem.checked ? 'text-gray-400 line-through' : ''
        }`}>
        <input
          type="checkbox"
          className="mr-2 cursor-pointer"
          checked={todoItem.checked}
          onChange={onChangeCheckbox}
        />
        <span
          className={`ml-2 ${todoItem.checked ? 'text-gray-400 line-through' : ''}`}>
          {todoItem.text}
        </span>

        {/* Delete Button */}
        <button
          type="button"
          className="absolute bottom-2 right-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-100"
          onClick={onDelete}>
          <Icon icon="material-symbols:delete-rounded" width="20" />
        </button>
      </li>
    </div>
  );
};

export default ToDoItem;
