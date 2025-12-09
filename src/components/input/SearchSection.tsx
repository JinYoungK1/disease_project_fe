import React from 'react';

import { Icon } from '@iconify/react';
import clsx from 'clsx';

interface Props {
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?(v: string): void;
}

function SearchSection({
  disabled = true,
  className = '',
  value = '',
  onChange = () => null,
}: Props) {
  return (
    <div
      className={clsx(
        'flex w-full justify-end gap-x-2 rounded-lg p-2',
        className
      )}>
      <div
        className={'relative right-0 top-0 flex h-[40px] w-full max-w-[480px]'}>
        <input
          className={
            'w-full max-w-[480px] rounded-lg border border-gray-200 px-2'
          }
          value={value}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          disabled={disabled}
        />
        <button
          className={
            'absolute right-[2px] top-1/2 flex h-[38px] w-[38px] -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-white'
          }
          disabled>
          <Icon
            icon="material-symbols-light:search"
            color={'#e5e7eb'}
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}

export default SearchSection;
