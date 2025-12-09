import React, { useRef, useState } from 'react';

// TodoItemType 정의
interface TodoItemType {
  id: number;
  text: string;
  checked: boolean;
}

// InputBox의 props 타입 정의
interface InputBoxProps {
  todoList: TodoItemType[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
}

// InputBox 컴포넌트 정의
const InputBox: React.FC<InputBoxProps> = ({ todoList, setTodoList }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // input 값 가져오기
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClickAddButton = () => {
    // todoItemList에 값 추가
    const nextTodoList = todoList.concat({
      id: todoList.length,
      text,
      checked: false,
    });
    setTodoList(nextTodoList);

    // input 값 초기화 및 포커싱
    setText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="todoapp__inputbox w-full">
      {/* 아이템 내용 입력 input */}
      <input
        type="text"
        name="todoItem"
        value={text}
        ref={inputRef}
        placeholder="할 일을 입력해주세요"
        className="todoapp__inputbox-inp w-[300px] rounded-lg border border-gray-200 p-2 text-sm autofill:pb-2 autofill:pt-2 focus:border-blue-500 focus:pb-2 focus:pt-2 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-2"
        onChange={onChangeInput}
      />
      {/* 입력 후 아이템 추가 버튼 */}
      <button
        type="button"
        className="todoapp__inputbox-add-btn mb-4 ml-4 mt-4 rounded-lg bg-pink-200 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-200"
        onClick={onClickAddButton}>
        추가
      </button>
    </div>
  );
};

export default InputBox;
