import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';

interface Props {
  title: string;
  link?: string;
  children?: ReactNode;
}

function SideMenuHeader({ title, link, children }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className={clsx('flex  flex-row items-unset justify-start gap-x-2 px-5', {
        'cursor-pointer': link,
      })}
      onClick={() => {
        if (link) navigate(link);
      }}>
      <p className="flex-none text-2xl font-bold" aria-label="Brand">
        {title}
      </p>
      {children}
    </div>
  );
}

export default SideMenuHeader;
