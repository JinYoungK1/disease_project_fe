import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ContentsWrap, Wrap } from '~/components/common';
import { DateRanges } from '~/components/Datepickers';
import {
  useGetDiseaseStatisticsByDisease,
  useGetDiseaseStatisticsByYear,
  useGetDiseaseStatisticsByMonth,
  useGetDiseaseStatisticsByDay,
} from '~/api/diseaseOccurrence';
import { DiseaseStatisticsByDisease } from '~/@types/diseaseOccurrence';

interface Props {
  type?: 'create' | 'edit';
  id?: number;
  projecttodo_code?: string;
}

const DashboardPage = ({ id, projecttodo_code, type = 'create' }: Props) => {
  // 현재 날짜 정보
  const today = new Date();
  const currentYear = today.getFullYear().toString();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentDay = String(today.getDate()).padStart(2, '0');
  const firstDayOfMonth = `${currentYear}${currentMonth}01`;
  const todayString = `${currentYear}${currentMonth}${currentDay}`;

  const [filterType, setFilterType] = useState<'all' | 'year' | 'month' | 'day'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // 전체 통계
  const { data: allStatisticsData, isLoading: isLoadingAll } = useGetDiseaseStatisticsByDisease();
  
  // 년별 통계 (년별 필터일 때만 호출)
  const { data: yearStatisticsData, isLoading: isLoadingYear } = useGetDiseaseStatisticsByYear({
    year: filterType === 'year' ? selectedYear : undefined,
    enabled: filterType === 'year',
  });
  
  // 월별 통계 (월별 필터일 때만 호출)
  const { data: monthStatisticsData, isLoading: isLoadingMonth } = useGetDiseaseStatisticsByMonth({
    year: filterType === 'month' ? selectedYear : '',
    month: filterType === 'month' && selectedMonth ? selectedMonth : undefined,
    enabled: filterType === 'month' && !!selectedYear,
  });
  
  // 일별 통계 (일별 필터일 때만 호출)
  const { data: dayStatisticsData, isLoading: isLoadingDay } = useGetDiseaseStatisticsByDay({
    year: filterType === 'day' && !startDate ? selectedYear : undefined,
    month: filterType === 'day' && !startDate ? selectedMonth : undefined,
    startDate: filterType === 'day' && startDate ? startDate : undefined,
    endDate: filterType === 'day' && endDate ? endDate : undefined,
    enabled: filterType === 'day' && (!!startDate || !!selectedYear),
  });

  // 현재 필터에 맞는 데이터 선택
  let statisticsData: any = null;
  let isLoading = false;

  switch (filterType) {
    case 'year':
      statisticsData = yearStatisticsData;
      isLoading = isLoadingYear;
      break;
    case 'month':
      statisticsData = monthStatisticsData;
      isLoading = isLoadingMonth;
      break;
    case 'day':
      statisticsData = dayStatisticsData;
      isLoading = isLoadingDay;
      break;
    default:
      statisticsData = allStatisticsData;
      isLoading = isLoadingAll;
  }

  // 차트 데이터 준비 - 년/월/일별 데이터는 다른 구조이므로 통합 처리
  let chartData: any[] = [];
  if (statisticsData?.data) {
    if (filterType === 'year' || filterType === 'month' || filterType === 'day') {
      // 년/월/일별 데이터는 그대로 사용 (이미 전염병별로 그룹화됨)
      chartData = statisticsData.data;
    } else {
      // 전체 데이터
      chartData = statisticsData.data;
    }
  }
  
  // 전염병별로 그룹화 (년/월/일별 데이터는 이미 그룹화되어 있지만, 같은 전염병이 여러 개일 수 있음)
  const groupedData = chartData.reduce((acc: any, item: any) => {
    const diseaseName = item.diseaseName || '미분류';
    if (!acc[diseaseName]) {
      acc[diseaseName] = {
        diseaseName,
        occurrenceCount: 0,
        totalLivestockCount: 0,
        firstOccurrenceDate: item.firstOccurrenceDate || item.occurrenceDate || null,
        lastOccurrenceDate: item.lastOccurrenceDate || item.occurrenceDate || null,
      };
    }
    acc[diseaseName].occurrenceCount += item.occurrenceCount || 0;
    acc[diseaseName].totalLivestockCount += item.totalLivestockCount || 0;
    if (item.firstOccurrenceDate && (!acc[diseaseName].firstOccurrenceDate || item.firstOccurrenceDate < acc[diseaseName].firstOccurrenceDate)) {
      acc[diseaseName].firstOccurrenceDate = item.firstOccurrenceDate;
    }
    if (item.lastOccurrenceDate && (!acc[diseaseName].lastOccurrenceDate || item.lastOccurrenceDate > acc[diseaseName].lastOccurrenceDate)) {
      acc[diseaseName].lastOccurrenceDate = item.lastOccurrenceDate;
    }
    if (item.occurrenceDate) {
      if (!acc[diseaseName].firstOccurrenceDate || item.occurrenceDate < acc[diseaseName].firstOccurrenceDate) {
        acc[diseaseName].firstOccurrenceDate = item.occurrenceDate;
      }
      if (!acc[diseaseName].lastOccurrenceDate || item.occurrenceDate > acc[diseaseName].lastOccurrenceDate) {
        acc[diseaseName].lastOccurrenceDate = item.occurrenceDate;
      }
    }
    return acc;
  }, {});

  const finalChartData = Object.values(groupedData).sort((a: any, b: any) => 
    (b.totalLivestockCount || 0) - (a.totalLivestockCount || 0)
  ) as DiseaseStatisticsByDisease[];
  
  const chartSeries = finalChartData.map((item) => item.totalLivestockCount || 0);

  // 년도 목록 생성 (2000년부터 현재까지)
  const maxYear = new Date().getFullYear();
  const years = Array.from({ length: maxYear - 1999 }, (_, i) => (2000 + i).toString()).reverse();
  
  // 월 목록 생성
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  // 필터 타입 변경 시 초기화 및 기본값 설정
  useEffect(() => {
    if (filterType === 'all') {
      setSelectedYear('');
      setSelectedMonth('');
      setStartDate('');
      setEndDate('');
    } else if (filterType === 'year') {
      // 년별: 기본값으로 올해 선택
      setSelectedYear(currentYear);
      setSelectedMonth('');
      setStartDate('');
      setEndDate('');
    } else if (filterType === 'month') {
      // 월별: 기본값으로 올해와 이번 달 선택
      setSelectedYear(currentYear);
      setSelectedMonth(currentMonth);
      setStartDate('');
      setEndDate('');
    } else if (filterType === 'day') {
      // 일별: 기본값으로 이번 달 첫날부터 오늘까지
      setSelectedYear('');
      setSelectedMonth('');
      setStartDate(firstDayOfMonth);
      setEndDate(todayString);
    }
  }, [filterType, currentYear, currentMonth, firstDayOfMonth, todayString]);
  
  const chartOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toLocaleString();
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: finalChartData.map((item) => item.diseaseName || '미분류'),
      labels: {
        rotate: -45,
        rotateAlways: true,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: '발생 마리수',
      },
      labels: {
        formatter: function (val: number) {
          return val.toLocaleString();
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return value.toLocaleString() + '마리';
        },
      },
    },
    colors: ['#008FFB'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['#00E396'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: '100%',
          },
          xaxis: {
            labels: {
              rotate: -45,
            },
          },
        },
      },
    ],
  };

  return (
    <Wrap className="main_wrap" title={'대시보드'}>
      <ContentsWrap>
        <div className="relative h-full w-full p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">전염병 발생 통계</h2>
            
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-gray-500">데이터를 불러오는 중...</div>
            </div>
          ) : finalChartData.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-gray-500">데이터가 없습니다.</div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* 필터 섹션 */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">조회 기간</label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as 'all' | 'year' | 'month' | 'day')}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">전체</option>
                      <option value="year">년별</option>
                      <option value="month">월별</option>
                      <option value="day">일별</option>
                    </select>
                  </div>

                  {filterType === 'year' && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">년도 선택</label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">전체</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}년
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {filterType === 'month' && (
                    <>
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">년도 선택</label>
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">년도 선택</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}년
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedYear && (
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">월 선택</label>
                          <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">전체</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}월
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </>
                  )}

                  {filterType === 'day' && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">날짜 범위 선택</label>
                      <DateRanges
                        placeholder="날짜 범위를 선택하세요"
                        dateFormat="yyyyMMdd"
                        defaultValue={
                          startDate && endDate
                            ? { startDate, endDate }
                            : undefined
                        }
                        onRangeChange={(range: { startDate: string | null; endDate: string | null }) => {
                          if (range.startDate && range.endDate) {
                            setStartDate(range.startDate);
                            setEndDate(range.endDate);
                            // 날짜 범위 선택 시 년도/월 선택은 무시
                            setSelectedYear('');
                            setSelectedMonth('');
                          } else {
                            setStartDate('');
                            setEndDate('');
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              {chartSeries.length > 0 && chartSeries.some((val) => val > 0) ? (
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* 그래프 영역 */}
                  <div className="flex-1 flex justify-center items-center" style={{ minHeight: '500px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                    <div style={{ width: '100%', maxWidth: '100%' }}>
                      <Chart
                        options={chartOptions}
                        series={[
                          {
                            name: '발생 마리수',
                            data: chartSeries,
                          },
                        ]}
                        type="bar"
                        height={500}
                        width="100%"
                      />
                    </div>
                  </div>
                  
                  {/* 통계 테이블 영역 */}
                  <div className="flex-1 lg:max-w-md">
                    <h3 className="text-lg font-semibold mb-4">상세 통계</h3>
                    <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '500px' }}>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            {(filterType === 'year' || filterType === 'month') && (
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {filterType === 'year' ? '년도' : '월'}
                              </th>
                            )}
                            {filterType === 'day' && (
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                발생일
                              </th>
                            )}
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              전염병명
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              건수
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              마리수
                            </th>
                            {filterType === 'all' && (
                              <>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  최초일
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  최근일
                                </th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {chartData.map((item: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50">
                              {(filterType === 'year' || filterType === 'month') && (
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                  {filterType === 'year' 
                                    ? `${item.year}년`
                                    : `${item.year}년 ${item.month}월`}
                                </td>
                              )} 
                              {filterType === 'day' && (
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                  {item.occurrenceDate || '-'}
                                </td>
                              )}
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.diseaseName || '미분류'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {item.occurrenceCount?.toLocaleString() || 0}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {item.totalLivestockCount?.toLocaleString() || 0}
                              </td>
                              {filterType === 'all' && (
                                <>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {item.firstOccurrenceDate || '-'}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {item.lastOccurrenceDate || '-'}
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-gray-500">차트 데이터가 없습니다.</div>
                </div>
              )}
            </div>
          )}
      </div>
      </ContentsWrap>
    </Wrap>
  );
};

export default DashboardPage;
