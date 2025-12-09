import React from 'react';

import classNames from 'classnames';

type Props = {
  type?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  label?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  readOnly?: boolean;
};

const UnderlineInput: React.FC<Props> = ({
  type = 'text',
  value,
  placeholder = '',
  name = '',
  className = '',
  label,
  onChange = () => null,
  onFocus = () => null,
  readOnly = false,
}) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center space-x-3">
        {label && (
          <label
            htmlFor={name}
            className="text-md w-[180px] font-medium text-gray-900">
            {label}
          </label>
        )}
        <div className="relative flex-1">
          <input
            type={type}
            name={name}
            className={classNames(
              'peer mt-2 block w-full rounded-md border py-3 pe-0 ps-8 text-sm placeholder-neutral-500 hover:bg-blue-200 focus:border-x-transparent focus:border-b-blue-500 focus:border-b-neutral-600 focus:border-t-transparent focus:ring-0 focus:ring-neutral-600', // added 'rounded' class
              {
                'pointer-events-none cursor-not-allowed bg-gray-100': readOnly,
                'bg-white': !readOnly,
              }
            )}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              if (!readOnly && onChange) {
                onChange(e.target.value);
              }
            }}
            onFocus={onFocus}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
};

export default UnderlineInput;
