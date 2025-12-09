import { ReactNode } from 'react';

import clsx from 'clsx';

interface Props {
  children: ReactNode;
  className: string;
}
function ContentsBox({ className = '', children }: Props) {
  return (
    <div
      className={clsx('w-full rounded-2xl bg-white p-4 shadow-xl min-h-[890px]', className)} style={{ minHeight: 'calc(100vh - 53px)' }}>
      {children}
    </div>
  );
}

export default ContentsBox;
