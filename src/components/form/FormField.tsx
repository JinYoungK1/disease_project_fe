import React, { ReactNode } from 'react';

import clsx from 'clsx';

interface Props {
  label?: string;
  className?: string;
  error?: null | string;
  relativeMode?: boolean;
  children: ReactNode;
}

export default function FormField({
  relativeMode = false,
  className = '',
  label = '',
  error = null,
  children,
}: Props) {
  return (
    <div
      className={clsx(
        {
          relative: relativeMode,
        },
        className
      )}>
      {children}

      <label
        className="pointer-events-none absolute start-0 top-0 h-full origin-[0_0] truncate border border-transparent p-4 text-md transition duration-100 ease-in-out peer-focus:-translate-y-1.5 peer-focus:translate-x-0.5 peer-focus:scale-90 peer-focus:text-gray-500 peer-disabled:pointer-events-none peer-disabled:opacity-50 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-gray-500"
        htmlFor="hs-hero-signup-form-floating-input-id">
        {label}
      </label>
      {error && (
        <p
          className={
            'absolute left-0  mt-3 text-sm text-red-500'
          }>
          {error}
        </p>
      )}
    </div>
  );
}
