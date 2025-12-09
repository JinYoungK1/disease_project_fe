import { useEffect, useRef, useState } from 'react';
import {
  DateRangePicker,
  createStaticRanges, // defaultStaticRanges,
} from 'react-date-range';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { endOfMonth, format, startOfMonth, subDays, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';

type Props = {
  placeholder?: string;
  onRangeChange?(v: any | null): void;
  dateFormat?: string;
  className?: string;
  defaultValue?: { startDate: string | null; endDate: string | null };
};

const _defaultStaticRanges = [
  {
    label: '오늘',
    range: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
  },
  {
    label: '최근 일주일',
    range: () => ({
      startDate: subDays(new Date(), 6),
      endDate: new Date(),
    }),
  },
  {
    label: '최근 한달',
    range: () => ({
      startDate: subMonths(new Date(), 1),
      endDate: new Date(),
    }),
  },
  {
    label: '최근 2개월',
    range: () => ({
      startDate: subMonths(new Date(), 2),
      endDate: new Date(),
    }),
  },
  {
    label: '최근 3개월',
    range: () => ({
      startDate: subMonths(new Date(), 3),
      endDate: new Date(),
    }),
  },
  {
    label: '이번달',
    range: () => ({
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
    }),
  },
];

const INIT_STATE = {
  startDate: null,
  endDate: null,
  key: 'selection',
};

function DateRanges({ placeholder = '', onRangeChange = () => null, dateFormat = 'yyyy-MM-dd', defaultValue }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
  // 초기값 설정
  const getInitialState = () => {
    if (defaultValue?.startDate && defaultValue?.endDate) {
      try {
        const startDateStr = String(defaultValue.startDate);
        const endDateStr = String(defaultValue.endDate);
        
        // YYYYMMDD 형식인지 확인 (8자리)
        if (startDateStr.length >= 8 && endDateStr.length >= 8) {
          const start = new Date(
            parseInt(startDateStr.substring(0, 4)),
            parseInt(startDateStr.substring(4, 6)) - 1,
            parseInt(startDateStr.substring(6, 8))
          );
          const end = new Date(
            parseInt(endDateStr.substring(0, 4)),
            parseInt(endDateStr.substring(4, 6)) - 1,
            parseInt(endDateStr.substring(6, 8))
          );
          
          // 유효한 날짜인지 확인
          if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
            return [{
              startDate: start,
              endDate: end,
              key: 'selection',
            }];
          }
        }
      } catch (e) {
        console.error('DateRanges 초기값 설정 오류:', e);
        return [INIT_STATE];
      }
    }
    return [INIT_STATE];
  };
  
  const [state, setState] = useState<any>(getInitialState());
  const wrapperRef = useRef(null);
  const [lastSelectedDate, setLastSelectedDate] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // defaultValue가 변경되면 state 업데이트 (초기화 시에만)
  useEffect(() => {
    if (!isInitialized && defaultValue?.startDate && defaultValue?.endDate) {
      try {
        const startDateStr = String(defaultValue.startDate);
        const endDateStr = String(defaultValue.endDate);
        
        // YYYYMMDD 형식인지 확인 (8자리)
        if (startDateStr.length >= 8 && endDateStr.length >= 8) {
          const start = new Date(
            parseInt(startDateStr.substring(0, 4)),
            parseInt(startDateStr.substring(4, 6)) - 1,
            parseInt(startDateStr.substring(6, 8))
          );
          const end = new Date(
            parseInt(endDateStr.substring(0, 4)),
            parseInt(endDateStr.substring(4, 6)) - 1,
            parseInt(endDateStr.substring(6, 8))
          );
          
          // 유효한 날짜인지 확인
          if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
            setState([{
              startDate: start,
              endDate: end,
              key: 'selection',
            }]);
            setIsInitialized(true);
          }
        }
      } catch (e) {
        console.error('DateRanges defaultValue 업데이트 오류:', e);
        // 에러 발생 시 초기 상태 유지
      }
    }
  }, [defaultValue?.startDate, defaultValue?.endDate, isInitialized]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !(wrapperRef.current as any).contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const onClearDate = () => {
    setState([INIT_STATE]);

    if (onRangeChange) {
      onRangeChange({
        startDate: null,
        endDate: null,
      });
    }
  };

  const handleSelect = (ranges: any) => {
    const { selection } = ranges;
    setState([selection]);
    setIsInitialized(true); // 사용자가 선택했으므로 초기화 완료

    if (selection.startDate && selection.endDate) {
      const currentDate = format(new Date(selection.startDate), dateFormat);
      
      // 같은 날짜를 두 번 클릭한 경우
      if (lastSelectedDate === currentDate) {
        setIsOpen(false);
        setLastSelectedDate(null);
      } else {
        setLastSelectedDate(currentDate);
      }

      const formattedStartDate = format(new Date(selection.startDate), dateFormat);
      const formattedEndDate = format(new Date(selection.endDate), dateFormat);

      if (onRangeChange) {
        onRangeChange({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      }
    }
  };

  const renderStaticRangeLabel = (label?: string) => {
    // 여기서 정적 범위 라벨을 커스터마이즈할 수 있습니다.
    // 예를 들어, 라벨 앞에 "범위: "를 추가합니다.
    return `${label ?? '-'}`;
  };

  // 기존 정적 범위에 커스터마이즈된 라벨을 적용
  const customStaticRanges = createStaticRanges(
    _defaultStaticRanges.map((range) => {
      return {
        ...range,
        label: renderStaticRangeLabel(range.label),
      };
    })
  );

  const formatDate = (date: any) => {
    if (!date) {
      return null;
    }
    return format(new Date(date), dateFormat);
  };

  const _endDate =
    state[0]?.endDate === null
      ? formatDate(state[0].startDate)
      : formatDate(state[0].endDate) ?? null;

  const startDate = state[0].startDate ? formatDate(state[0].startDate) : null;

  return (
    <div
      ref={wrapperRef}
      className="relative left-0 top-0 flex w-[200px] cursor-pointer items-center justify-start rounded-lg border border-gray-200 text-sm hover:bg-blue-100">
      <div
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          // e.stopPropagation();
          setIsOpen(!isOpen);
        }}>
        {!isOpen && _endDate === null && startDate === null ? (
          <p className="whitespace-nowrap text-sm text-gray-800">
            {placeholder}
          </p>
        ) : (
          <div className="whitespace-nowrap text-sm text-gray-800">
            {startDate ?? ''} - {_endDate ?? ''}
          </div>
        )}
      </div>
      <button
        type="button"
        className="absolute right-1 top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center rounded-full border"
        onClick={onClearDate}>
        <Icon
          icon="material-symbols-light:close-small"
          width="16"
          height="16"
        />
      </button>
      {isOpen && (
        <DateRangePicker
          className={clsx('absolute left-0 top-[50px] z-50')}
          onChange={handleSelect}
          locale={ko}
          showDateDisplay={false}
          moveRangeOnFirstSelection={false}
          retainEndDateOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
          calendarFocus="forwards"
          dateDisplayFormat="yyyy-MM-dd"
          staticRanges={customStaticRanges}
          inputRanges={[]}
        />
      )}
    </div>
  );
}

export default DateRanges;
