import React from 'react';

interface TodoItemType {
  id: number;
  text: string;
  checked: boolean;
}

interface TodoItemListProps {
  title: string;
  todoList: TodoItemType[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  checkedList: boolean;
  renderItem: (item: TodoItemType) => JSX.Element;
  id?: number;
}

const TodoItemList: React.FC<TodoItemListProps> = ({
  title,
  todoList,
  setTodoList,
  checkedList,
  renderItem,
  id,
}) => {
  const filteredList = todoList.filter((item) => item.checked === checkedList);

  return (
    <div className="todo-item-list w-full">
      <h3 className="text-lg font-bold">{title}</h3>
      <ul className="mb-4">{filteredList.map((item) => renderItem(item))}</ul>
    </div>
  );
};

export default TodoItemList;
