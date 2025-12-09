import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useDropdownBox } from '~/hooks/useDropdownBox';


export interface DropdownData {
  key: number | string;
  value: number | string;
}

interface Props {
  className?: string;
  data?: DropdownData[];
  selected?: null | number | string;
  onChanged?(value: number | string): void;
  placeholder?: string;
  disabled?: boolean;
}

function DropdownSelectBox({
  className = '',
  selected = null,
  placeholder = '선택',
  data = [],
  onChanged = () => null,
  disabled = false,
}: Props) {
  const { _selected, _setSelected } = useDropdownBox({ selected, data });
  return (
    <Menu>
      <MenuButton
        disabled={disabled}
        type="button"
        className={clsx(
          'flex min-w-[140px] flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-2',
          className,
          disabled ? 'disabled:pointer-events-none disabled:opacity-50' : ''
        )}>
        <p className={'whitespace-nowrap text-md'}>
          {!_selected || _selected === '' ? placeholder : _selected}{' '}
        </p>
        <Icon
          icon={'material-symbols-light:keyboard-arrow-down-rounded'}
          color={'text-gray-800'}
          width={16}
          height={16}
        />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className={clsx(
          'z-50 mr-auto mt-2 flex min-w-[150px] max-w-[150px] flex-col rounded-lg border bg-white py-2 shadow-2xl'
        )}>
        {(data ?? []).map((item) => {
          return (
            <MenuItem key={item.key}>
              <button
                className={clsx(
                  'flex items-center justify-between bg-white p-2 text-md data-[focus]:bg-blue-100',
                  className
                )}
                onClick={() => {
                  onChanged(item.key);
                }}>
                {item.value ?? ''}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}

export default DropdownSelectBox;
