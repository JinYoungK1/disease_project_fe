import React from 'react';

import { Icon } from '@iconify/react';
import clsx from 'clsx';

interface Props {
  className?: string;
}
function SidebarControlButton({ className }: Props) {
  const showSidebar = () => {};
  return (
    <button
      className={clsx(
        'flex size-[32px] items-center justify-center rounded-lg border-transparent bg-white text-sm font-semibold text-white hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      onClick={() => showSidebar()}>
      <Icon
        width={32}
        icon="material-symbols-light:menu"
        className={'text-gray-600 hover:text-white'}
      />
    </button>
  );
}

export default SidebarControlButton;
