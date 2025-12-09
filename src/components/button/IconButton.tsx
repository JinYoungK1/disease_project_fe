import React, { ReactNode } from 'react';

import { Icon } from '@iconify/react';

interface Props {
  children: ReactNode;
  onClick?(): void;
}

// children 에는 icon을 같이 넣어주세요.
function IconButton({ children, onClick = () => null }: Props) {
  return (
    <button
      type="button"
      className="flex items-center justify-center p-2 text-sm font-semibold text-white bg-gray-500 border border-transparent rounded-lg hover:bg-gray-600 disabled:pointer-events-none disabled:opacity-50"
      onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
