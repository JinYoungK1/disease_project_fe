import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: '대시보드' },
    // 여기에 추가 메뉴 항목을 넣을 수 있습니다
    // { path: '/page1', label: '페이지1' },
    // { path: '/page2', label: '페이지2' },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 flex min-w-full items-center bg-white py-1 mb-1 border-b border-gray-200 shadow-sm">
      <nav className="flex w-full items-center justify-between px-4" aria-label="Global">
        <div className="flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-row items-center justify-end gap-5 sm:mt-0 sm:justify-end sm:ps-5">
        </div>
      </nav>
    </header>
  );
}

export default Header;
