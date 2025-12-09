import { useLocation } from 'react-router-dom';

import clsx from 'clsx';

import AccordionMenus from '~/components/sidebar/AccordionMenus';
import SideMenuHeader from '~/components/sidebar/SideMenuHeader';
import { MENU_LINK_KEY } from '~/utils/menuUtil';

import SidebarControlButton from '../button/SidebarControlButton';

export function Sidebar() {
  let { pathname } = useLocation();
  // const { sidebarState, closeSidebar } = useSidebarContext();
  const user: any = null;
  const menus: any = null;

  // const ref = useClickAway(() => {
  //   if (sidebarState === true) {
  //     closeSidebar();
  //   }
  // });
  // useEffect(() => {
  //   if (pathname) {
  //     closeSidebar();
  //   }
  // }, [pathname]);
  return (
    <div
      //@ts-ignore
      // ref={ref}
      className={clsx(
        'h-full min-w-[220px] flex-row-reverse border-e border-gray-200 bg-white pb-10 pt-7'
        // sidebarState ? 'translate-x-0' : '-translate-x-full'
      )}
      // className={clsx(
      //   'hs-overlay fixed bottom-0 start-0 top-0 z-[60] w-64 transform overflow-y-auto border-e border-gray-200 bg-white pb-10 pt-7 transition-all duration-300',
      //   sidebarState ? 'translate-x-0' : '-translate-x-full'
      // )}
      id="docs-sidebar">
      <SideMenuHeader title={'타이틀'}>
        <SidebarControlButton className={'absolute right-3'} />
      </SideMenuHeader>

      <nav className="hs-accordion-group flex max-h-[1100px] w-full flex-col flex-nowrap p-6">
        {(menus?.data?.main_menu?.data ?? []).map((menu: any) => {
          //const icon = menuKeyToIcon(menu.key ?? '');

          if (menu.view !== 't') {
            return null;
          }

          return (
            <AccordionMenus
              key={menu.key}
              accordion
              accordionTitle={menu.menu_name}
              linkKey={menu.key as MENU_LINK_KEY}
              data={menus?.data?.sub_menu?.data ?? null}
            />
          );
        })}
      </nav>
    </div>
  );
}
