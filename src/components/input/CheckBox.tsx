import React, { useEffect, useState } from 'react';

import _ from 'lodash';

interface Props {
  text?: string;
  checked?: boolean;
  onChange?(v: boolean): void;
}
function CheckBox({
  text = '',
  checked = false,
  onChange = () => null,
}: Props) {
  const [_checked, setChecked] = useState(false);
  const uniqueId = _.uniqueId('checkbox_');

  useEffect(() => {
    if (checked !== _checked) {
      setChecked(checked);
    }
  }, [checked]);

  return (
    <div className="flex">
      <input
        type="checkbox"
        className="mt-0.5 size-[16px] shrink-0 cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        id={uniqueId}
        checked={_checked}
        onChange={() => {
          setChecked(!_checked);
          if (onChange) {
            onChange(!checked);
          }
        }}
      />
      {text && (
        <label
          htmlFor={uniqueId}
          className="ms-3 cursor-pointer text-sm text-gray-500">
          {text}
        </label>
      )}
    </div>
  );
}

export default CheckBox;
