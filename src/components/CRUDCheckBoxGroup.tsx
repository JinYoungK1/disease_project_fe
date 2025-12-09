import React from 'react';

import CheckBox from './input/CheckBox';

const ACCESS_LIST = ['C', 'R', 'U', 'D'];
function CRUDCheckBoxGroup() {
  return (
    <>
      {(ACCESS_LIST ?? []).map((checkbox) => {
        return (
          <td
            key={checkbox}
            className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
            <CheckBox checked={false} />
          </td>
        );
      })}
    </>
  );
}

export default CRUDCheckBoxGroup;
