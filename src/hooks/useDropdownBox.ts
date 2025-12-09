import { useEffect, useState } from 'react';

import { DropdownData } from '~/components/DropdownSelectBox';

interface Props {
  selected: null | number | string;
  data: DropdownData[];
}

export function useDropdownBox({ selected, data }: Props) {
  const [_selected, _setSelected] = useState<string | number>('');

  useEffect(() => {
    if (selected !== _selected) {
      const keySearch: DropdownData | undefined = (data ?? []).find(
        (item) => item.key === selected
      );
      if (!!keySearch) {
        _setSelected(keySearch.value);
      }
    }
  }, [selected, data]);

  return {
    _selected,
    _setSelected,
  };
}
