import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import clsx from 'clsx';

import AccordionMenus from '~/components/sidebar/AccordionMenus';
import SideMenuHeader from '~/components/sidebar/SideMenuHeader';
import { MENU_LINK_KEY } from '~/utils/menuUtil';

import logoImage from '../../images/logo-chw.png';
import bundlzLogo from '../../images/bundlzlogo.png';
import { SoftButton } from '../button';

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenuKey, setOpenMenuKey] = useState<MENU_LINK_KEY | null>(null);
  const user: any = null;
  const menus: any = null;

  const handleMenuOpen = (menuKey: MENU_LINK_KEY) => {
    setOpenMenuKey(openMenuKey === menuKey ? null : menuKey);
  };

  return (
    <div
      className={clsx(
        'flex flex-row', // 위치 설정
        'flex items-center gap-2', // 정렬
      )}>
      <div className="flex h-[40px] w-[260px] flex-row items-center pl-5">

        <img
            src={bundlzLogo}
            alt="Bundlez 로고"
            className="h-full object-contain"
          />
      </div>

      <nav
        className={clsx(
          'hs-accordion-group flex flex-row justify-start', // 가로 정렬 및 오른쪽 정렬
          'h-[40px] w-[1300px]', // 크기 설정
          'px-0.5' // 내부 여백 설정
        )}
        style={{ marginLeft: 'auto' }} // 왼쪽 여백을 자동으로 채워서 오른쪽 정렬
      >
        {pathname !== '/amt/amtinfo' && (
          <>
            <SoftButton
              text={'관리자용 시세조회'}
              styles={'bg-blue-100 text-blue-800 hover:bg-blue-200 mr-2'}
              onClick={() => {
                navigate('/amt/amtadmininfo');
              }}
            >
            </SoftButton>
            <SoftButton
              text={'관리자용 시세설정 페이지'}
              styles={'bg-blue-100 text-blue-800 hover:bg-blue-200 mr-2'}
              onClick={() => {
                navigate('/amt/amtsetinfo');
              }}
            >
            </SoftButton>
            <SoftButton
              text={'서브마켓 시세조회'}
              styles={'bg-blue-100 text-blue-800 hover:bg-blue-200'}
              onClick={() => {
                navigate('/amt/amtsubmkinfo');
              }}
            >
            </SoftButton>
          </>
        )}

        {/* {(menus?.data?.main_menu?.data ?? []).map((menu) => {
          if (menu.view !== 't') {
            return null;
          }

          const subMenu = menus?.data.sub_menu?.data.filter(
            (sub) => sub.upper_menu_id === menu.menu_id
          );

          return (
            <AccordionMenus
              key={menu.key}
              accordion
              accordionTitle={menu.menu_name}
              linkKey={menu.key as MENU_LINK_KEY}
              data={subMenu ?? null}
              isOpen={openMenuKey === menu.key}
              onToggle={() => handleMenuOpen(menu.key as MENU_LINK_KEY)}
            />
          );
        })} */}
      </nav>
    </div>
  );
}

export default Sidebar;
