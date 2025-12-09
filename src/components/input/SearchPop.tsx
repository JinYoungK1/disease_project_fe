import { ChangeEvent, KeyboardEvent, useState } from 'react';

interface Props {
  label?: string;
  placeholder?: string;
  value?: string; // 외부에서 value를 받을 수 있도록 수정
  onChange?(e: ChangeEvent<HTMLInputElement>): void; // 외부에서 onChange 이벤트 핸들러를 받을 수 있도록 수정
  onKeyDown?(e: KeyboardEvent<HTMLInputElement>): void; // 외부에서 onKeyDown 이벤트 핸들러를 받을 수 있도록 수정
  onSearchChange?(v: string): void;
}

function SearchBox({
  label,
  placeholder = '',
  value = '', // 기본값 설정
  onChange = () => {}, // 기본 동작 설정
  onKeyDown = () => {}, // 기본 동작 설정
  onSearchChange = () => null,
}: Props) {
  // 컴포넌트 내부에서 value 상태 관리 대신 외부 value prop을 사용
  // const [value, setValue] = useState('');  // 제거

  return (
    <div className="max-w-sm" style={{width: '320px'}}>
      <div className="relative rounded-lg border border-gray-200">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-3.5">
            <svg
              className="size-4 flex-shrink-0 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <input
            className="block w-full rounded-lg py-3 pe-4 ps-10 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            type="text"
            placeholder={placeholder ?? ''}
            value={value} // 외부에서 전달된 value 사용
            onChange={(e) => {
              if (onChange) {
                onChange(e); // 외부에서 전달된 onChange 이벤트 핸들러 호출
              }
              if (onSearchChange) {
                onSearchChange(e.target.value); // 기존 로직 유지
              }
            }}
            onKeyDown={onKeyDown} // 외부에서 전달된 onKeyDown 이벤트 핸들러 호출
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
