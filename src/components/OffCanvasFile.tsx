import { useEffect, useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import clsx from 'clsx';

import { IconButton } from '~/components/button';

type ModeType = 'side' | 'fullscreen' | 'center';

const OFFCANVAS_MODES = [
  { key: 'side', icon: 'material-symbols-light:side-navigation' },
  {
    key: 'fullscreen',
    icon: 'material-symbols-light:fullscreen',
  },
  {
    key: 'center',
    icon: 'material-symbols-light:fit-screen',
  },
];

function OffCanvasFile() {
  const [mode, setMode] = useState<ModeType>('side');
  const [isLeftSide, setIsLeftSide] = useState(false); // 왼쪽/오른쪽 여부
  const [canvasWidth, setCanvasWidth] = useState(1450); // 기본 너비
  const isResizing = useRef(false); // 크기 조절 상태 추적
  const offCanvasState = { show: false, title: '', content: null };
  const closeOffCanvas = () => {};

  const animationFrame = useRef<number | null>(null); // requestAnimationFrame 저장

  const onMouseDown = () => {
    isResizing.current = true;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isResizing.current && animationFrame.current === null) {
      animationFrame.current = requestAnimationFrame(() => {
        const newWidth = window.innerWidth - e.clientX;
        setCanvasWidth(Math.max(300, newWidth)); // 최소 너비 300px
        animationFrame.current = null; // 애니메이션 프레임 리셋
      });
    }
  };

  const onMouseUp = () => {
    isResizing.current = false;
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current); // 애니메이션 프레임 취소
      animationFrame.current = null;
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const toggleSide = () => {
    setIsLeftSide((prev) => !prev); // 왼쪽 또는 오른쪽으로 토글
  };

  return (
    <div
    id="hs-overlay-right"
    className={clsx(
      'hs-overlay fixed z-30 h-full max-w-full bg-gray-100 shadow-lg transition-all duration-300',
      {
        'right-0 top-0': !isLeftSide && mode === 'side', // 오른쪽 배치
        'h-full w-full': mode === 'fullscreen', // 전체 화면
        'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform':
          mode === 'center', // 중앙 배치
        'translate-x-full': !offCanvasState?.show, // 숨김 상태
      }
    )}
    style={mode === 'fullscreen' ? {} : { width: canvasWidth }} // 전체화면이 아니면 너비 설정
    tabIndex={-1}>
  
      {/* 상단 섹션 */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex flex-row gap-x-4">
          {OFFCANVAS_MODES.map((_mode) => (
            <IconButton
              key={`offcanvas_mode_key_${_mode.key}`}
              onClick={() => {
                setMode(_mode.key as ModeType);
              }}>
              <Icon icon={_mode.icon} width={16} />
            </IconButton>
          ))}
        </div>

        <h3 className="font-bold text-gray-800">
          {offCanvasState?.title ?? ''}
        </h3>
        <button
          type="button"
          className="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
          onClick={closeOffCanvas}>
          <span className="sr-only">Close modal</span>
          <svg
            className="size-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>

      {/* 콘텐츠 섹션 overflow-auto*/}
      <div className="max-h-[850px] overflow-visible p-4">
        {offCanvasState?.content ?? ''}
      </div>

      {/* 크기 조절 핸들 (왼쪽 모서리) */}
      {mode === 'side' && (
        <div
          className="absolute left-0 top-0 h-full w-2 cursor-ew-resize"
          onMouseDown={onMouseDown}
        />
      )}
    </div>
  );
}

export default OffCanvasFile;
