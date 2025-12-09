import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function LoginRequiredRoute({ children }: Props) {
  return <>{children}</>;
}
