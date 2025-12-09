import React, { useState } from 'react';

interface Props {
  label: string;
}
function ToggleInput({ label = '' }: Props) {
  const [toggleState, setToggleState] = useState(false);
  return (
    <div className="flex items-center">
      <input
        id="toggle-count-switch"
        name="toggle-count-switch"
        type="checkbox"
        className="relative h-7 w-[3.25rem] cursor-pointer appearance-none rounded-full border-2 border-transparent bg-gray-100 ring-1 ring-transparent ring-offset-white transition-colors duration-200 ease-in-out before:inline-block before:size-6 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow before:ring-0 before:transition before:duration-200 before:ease-in-out checked:bg-blue-600 checked:bg-none checked:before:translate-x-full checked:before:bg-blue-200 focus:border-blue-600 focus:outline-none focus:ring-blue-600"
      />
      <label htmlFor="toggle-count-switch" className="inline-block p-2">
        <span className="inline-block cursor-pointer text-sm text-gray-800">
          {label ?? ''}
        </span>
      </label>
    </div>
  );
}

export default ToggleInput;
