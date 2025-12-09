export type MENU_LINK_KEY =
  | 'referenceInfo'


export const SUB_MENU_MAP = {};
export const MENU_CATEGORY_ICON_MAP = {
  referenceInfo: 'dashboard-outline',
};

export const menuKeyToIcon = (key: string) => {
  // @ts-ignore
  return MENU_CATEGORY_ICON_MAP?.[key];
};

export const mainMenuArr = [
  {
    key: 'referenceInfo',
    menu_id: 'M001',
    menu_name: '기준정보',
    rowCount: 9,
  },
];

const subMenuArr = [
  {
    key: 'authorityManage',
    upper_menu_id: 'M001',
    menu_id: 'S001',
    menu_name: '권한설정',
  },
];

export const menuFrame = () => {
  const mainMenuData = mainMenuArr.map((main) => {
    return {
      menu_id: main.menu_id,
      menu_name: main.menu_name,
      view: 't',
      rowCount: main.rowCount,
      key: main.key,
    };
  });

  const subMenuData = subMenuArr.map((sub) => {
    return {
      upper_menu_id: sub.upper_menu_id,
      upper_menu_name:
        mainMenuArr.find((main) => sub.upper_menu_id === main.menu_id)
          ?.menu_name || '',
      menu_id: sub.menu_id,
      menu_name: sub.menu_name,
      create: 't',
      read: 't',
      update: 't',
      delete: 't',
      rowCount:
        mainMenuArr.find((main) => sub.upper_menu_id === main.menu_id)
          ?.rowCount || 0,
      key: sub.key,
    };
  });

  return {
    all_grant: 't',
    group_name: '',
    main_menu: {
      data: mainMenuData,
    },
    sub_menu: {
      data: subMenuData,
    },
  };
};
