import React from 'react';

interface Props {
  id: string;
  checked?: boolean;
  onChange?(v: boolean): void;
}
function UniqueKeyCheckBox({
  id = '',
  checked = false,
  onChange = () => null,
}: Props) {
  return (
    <div className="flex">
      <input
        type="checkbox"
        className="mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        id={id}
        checked={checked}
        onChange={() => {
          if (onChange) {
            onChange(!checked);
          }
        }}
      />
    </div>
  );
}

export default UniqueKeyCheckBox;
