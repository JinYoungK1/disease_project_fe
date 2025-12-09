import React from 'react';
import { Helmet } from 'react-helmet-async';

import clsx from 'clsx';

import { getPageTitle } from '~/config/environment';

interface Props {
  className: string;
  title?: string;
  children: React.ReactNode;
}

export default function Wrap({ className, title = '', children }: Props) {
  return (
    <>
      <Helmet>
        <title>{getPageTitle(title ?? '')}</title>
      </Helmet>
      <div id="wrap" className={clsx(className)}>
        {children}
      </div>
    </>
  );
}
