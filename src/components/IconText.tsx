import React from 'react';

import { Icon } from '@iconify/react';

interface Props {
  icon: string;
  text: string;
}

function IconText({ icon, text }: Props) {
  return (
    <div className={'flex flex-row items-center text-sm'}>
      <Icon icon={icon} className={'mr-2 text-gray-800'} />
      <p className={'text-gray-800'}>{text}</p>
    </div>
  );
}

export default IconText;
