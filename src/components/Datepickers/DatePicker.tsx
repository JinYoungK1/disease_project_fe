import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-date-range';

import clsx from 'clsx';
import { addMonths, format } from 'date-fns';
import { ko } from 'date-fns/locale';

type Props = {
  placeholder?: string;
  label?: string;
  defaultValue?: Date | null;
  value?: Date | null;
  onDateChange?(date: Date): void;
  style?: React.CSSProperties;
  disabled?: boolean; // 추가된 부분
  onClick?: () => void;
  onChange?: (date: Date | null) => void;
  selected?: Date | null;
};

function DatePicker({
  placeholder = '',
  onDateChange = () => null,
  defaultValue = null,
  value = null,
  style = {},// 추가된 부분
  disabled = false, // 추가된 부분
  onClick,
  onChange,
  selected
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null); // Ref 추가

  const handleDateSelect = (date: Date) => {
    // setSelectedDate(date);
    // if (!!date && !!onDateChange) {
    //   // onDateChange(format(date, 'yyyy-MM-dd'));
    //   onDateChange(date);
    // }
    // setIsOpen(false);
    if (disabled) return; // 비활성화 상태에서는 아무 작업도 수행하지 않음
    setSelectedDate(date);
    if (!!date && !!onDateChange) {
      onDateChange(date);
    }
    setIsOpen(false);
  };

  // 월 버튼 추가
  const jumpToFutureDate = (months: number) => {
    // if (disabled) return;
    // const newDate = selectedDate
    //   ? addMonths(selectedDate, months)
    //   : addMonths(new Date(), months);

    // setSelectedDate(newDate);
    // if (onDateChange) {
    //   onDateChange(newDate);
    // }
    // setIsOpen(false);
    if (disabled) return;
    const today = new Date(); // 오늘 날짜
    const newDate = addMonths(today, months); // 오늘로부터 몇 개월 뒤
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
    setIsOpen(false);
  };

  // 당일 버튼 추가
  const jumpToToday = () => {
    if (disabled) return;
    const today = new Date();
    setSelectedDate(today);
    if (onDateChange) {
      onDateChange(today);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedDate(value || defaultValue);
  }, [value, defaultValue]);

  // 외부 클릭 감지
  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const calendarPositionStyle = () => {
    // pickerRef.current가 null인지 확인
    if (pickerRef.current) {
      const rect = pickerRef.current.getBoundingClientRect();
      const isBelow = rect.bottom + 300 > window.innerHeight;
      return {
        left: isBelow ? 'auto' : '-255px', // -160px
        top: isBelow ? 'auto' : '30px',  // 화면 아래로 넘어갈 경우 위치를 조정
        bottom: isBelow ? '10px' : 'auto', // 화면 아래로 내려가는 경우 bottom 값 설정
        zIndex: 9999, // 다른 요소 위에 위치하도록 설정
      };
    }
    // pickerRef.current가 null인 경우 기본 스타일을 반환
    return {
      top: '30px', 
      zIndex: 9999, 
    };
  };

  return (
    <div
      ref={pickerRef} // Ref 할당
      onClick={onClick} // onClick 추가
      className="text-lg relative left-0 top-0 flex w-full cursor-pointer items-center justify-start rounded-lg hover:bg-blue-100">
      <div
        className="w-full  text-[15px]"
        onClick={(e) => {
          if (disabled) return; // 비활성화 상태에서는 열리지 않음
          e.preventDefault();
          setIsOpen(!isOpen);
        }}>
        {!isOpen && selectedDate === null ? (
          <p className="text-md min-h-[18px] text-[15px] w-full whitespace-nowrap text-gray-600">
            {placeholder}
          </p>
        ) : (
          <p className="text-lg whitespace-nowrap text-gray-600">
            {selectedDate ? '' : placeholder}
            {selectedDate ? format(selectedDate, 'yyyy/MM/dd') : ''}
          </p>
        )}
      </div>
      {isOpen && !disabled && (
        <div className="absolute left-0 top-[30px] z-50 flex bg-white shadow-md"
        style={calendarPositionStyle()}  // 동적 스타일 적용
        >
        {/* 왼쪽 버튼 컨테이너 */}
        <div className="flex flex-col justify-start gap-2 p-2 border-r bg-gray-100">
          <button
            className="px-2 py-1 bg-blue-200 hover:bg-blue-300 text-sm rounded text-blue-800"
            onClick={jumpToToday}>
            오늘
          </button>
          <button
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded"
            onClick={() => jumpToFutureDate(3)}>
            3개월 뒤
          </button>
          <button
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded"
            onClick={() => jumpToFutureDate(6)}>
            6개월 뒤
          </button>
          
        </div>
        {/* 오른쪽 캘린더 */}
        <Calendar
          className={clsx('')}
          date={selectedDate || new Date()}
          onChange={handleDateSelect}
          locale={ko}
        />
      </div>
    )}
  </div>
  );
}

export default DatePicker;
