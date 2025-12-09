import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Icon } from '@iconify/react';
import clsx from 'clsx';

interface Props {
  link: string;
  icon: string;
  title: string;
  disabled: boolean;
}

function SideMenu({ title, icon, link, disabled = false }: Props) {
  const location = useLocation();

  if (disabled) {
    return (
      <li
        className={
          'flex items-center gap-x-3.5 whitespace-nowrap rounded-lg px-2.5 py-1 text-sm text-gray-300 hover:bg-gray-100'
        }
        onClick={() => alert('준비중입니다.')}>
        <Icon icon={icon} width={18} height={18} />
        <span className={''}>{title}</span>
      </li>
    );
  }

  return (
    <li>
      <Link
        className={clsx(
          'flex items-center gap-x-3.5 whitespace-nowrap rounded-lg px-2.5 py-1 text-sm text-gray-800 hover:bg-gray-100',
          {
            'bg-white': location.pathname !== link,
            'bg-gray-100': location.pathname === link,
          }
        )}
        to={link}>
        <Icon icon={icon} width={18} height={18} />
        {title}
      </Link>
    </li>
  );
}

export default SideMenu;
