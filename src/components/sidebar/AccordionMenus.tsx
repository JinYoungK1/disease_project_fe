import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import clsx from 'clsx';

import { MENU_LINK_KEY } from '~/utils/menuUtil';

type SubMenuDataType = any;

interface Props {
  icon?: null | string;
  accordion?: boolean;
  accordionTitle?: string;
  linkKey: MENU_LINK_KEY;
  data: SubMenuDataType[] | null;
  useModal?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

function AccordionMenus({
  icon = null,
  accordion = false,
  accordionTitle = '',
  linkKey,
  data,
  useModal = false,
  isOpen = false,
  onToggle,
}: Props) {
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);
  const location = useLocation();
  const showModal = () => {};
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();
    const currentSubMenuKey = data?.find((subMenu) =>
      currentPath.endsWith(`/${subMenu.key.toLowerCase()}`)
    )?.key;
    setSelectedSubMenu(currentSubMenuKey || null);
  }, [location, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        onToggle?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleSubMenuClick = (subMenuKey: string) => {
    setSelectedSubMenu(subMenuKey);
    if (useModal) {
      showModal();
    }
  };

  return (
    <ul className="flex items-center space-x-4">
      {accordion && (
        <li className="hs-accordion relative">
          <button
            type="button"
            className="hs-accordion-toggle flex items-center justify-center text-[17px] font-bold text-gray-800 hover:bg-gray-100"
            style={{ width: '119px', height: '48px' }}
            onClick={onToggle}>
            {accordionTitle}
          </button>

          {isOpen && (
            <div ref={menuRef} className="absolute left-0 top-full z-10 w-[220px] bg-white text-[16px] shadow-lg" style={{zIndex: '100'}}>
              <ul className="border-l border-gray-200">
                {(data ?? []).map((subMenu) => {
                  if (subMenu.read !== 't') {
                    return null;
                  }

                  const url = `${linkKey.toLowerCase()}/${subMenu.key.toLowerCase()}`;
                  return (
                    <li key={subMenu.key}>
                      <Link
                        className={clsx(
                          'justify-left flex items-center gap-x-3.5 px-2.5 py-2 text-gray-800 hover:bg-gray-200',
                          {
                            'bg-blue-100': selectedSubMenu === subMenu.key,
                          }
                        )}
                        to={`/${url}`}
                        onClick={() => handleSubMenuClick(subMenu.key)}>
                        {subMenu.menu_name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </li>
      )}
    </ul>
  );
}

export default AccordionMenus;
