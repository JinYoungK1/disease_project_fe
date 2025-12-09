import { useState } from 'react';

interface Props {
  label?: string;
  placeholder?: string;
  onSearchChange?(v: string): void;
  value?: string;
}
function SearchBox({
  label,
  placeholder = '',
  onSearchChange = () => null,
}: Props) {
  const [value, setValue] = useState('');

  return (
    <div className="w-full max-w-sm">
      <div className="relative rounded-lg border border-gray-200"
      >
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
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
            className="block w-full rounded-lg py-3 pe-4 ps-10 text-[16px] focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            type="text"
            placeholder={placeholder ?? ''}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (onSearchChange) {
                onSearchChange(e.target.value);
              }
            }}
            // data-hs-combo-box-input=""
          />
        </div>

        {/*<div*/}
        {/*  className="absolute z-50 w-full rounded-lg border border-gray-200 bg-white"*/}
        {/*  style={{ display: 'none' }}*/}
        {/*  data-hs-combo-box-output="">*/}
        {/*  <div*/}
        {/*    className="max-h-72 overflow-hidden overflow-y-auto rounded-b-lg [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar]:w-2"*/}
        {/*    data-hs-combo-box-output-items-wrapper=""></div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default SearchBox;
