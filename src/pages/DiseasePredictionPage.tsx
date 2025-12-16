import React, { useState } from 'react';
import { ContentsWrap, Wrap } from '~/components/common';
import { useGetDiseasePredictionList } from '~/api/diseasePrediction';

// 날짜 포맷 함수 (YYYYMMDD -> YYYY/MM/DD)
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '-';
  const str = String(dateString);
  if (str.length === 8) {
    return `${str.substring(0, 4)}/${str.substring(4, 6)}/${str.substring(6, 8)}`;
  }
  return dateString;
};

// 전염병명 포맷 함수 (마지막 "형" 제거)
const formatDiseaseName = (diseaseName: string | null | undefined): string => {
  if (!diseaseName) return '미분류';
  if (diseaseName.endsWith('형')) {
    return diseaseName.slice(0, -1);
  }
  return diseaseName;
};

// 위험도 한글 변환
const formatRiskLevel = (riskLevel: string | null | undefined): string => {
  if (!riskLevel) return '-';
  const riskMap: { [key: string]: string } = {
    high: '높음',
    medium: '보통',
    low: '낮음',
  };
  return riskMap[riskLevel.toLowerCase()] || riskLevel;
};

// 위험도 색상
const getRiskLevelColor = (riskLevel: string | null | undefined): string => {
  if (!riskLevel) return 'text-gray-500';
  const colorMap: { [key: string]: string } = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50',
  };
  return colorMap[riskLevel.toLowerCase()] || 'text-gray-500';
};

// 예측 근거 포맷 함수 (과거 ~ 발생까지만 표시)
const formatPredictionBasis = (basis: string | object | null | undefined): string => {
  if (!basis) return '-';
  
  let text = '';
  if (typeof basis === 'string') {
    text = basis;
  } else {
    text = JSON.stringify(basis);
  }
  
  // "과거"부터 "발생"까지의 부분 추출
  const match = text.match(/과거.*?발생/);
  if (match) {
    return match[0] + '...';
  }
  
  // 매칭되지 않으면 원본 반환
  return text;
};

interface Props {
  type?: 'create' | 'edit';
  id?: number;
  projecttodo_code?: string;
}

const DiseasePredictionPage = ({ id, projecttodo_code, type = 'create' }: Props) => {
  // 필터 상태
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(20);
  const [lknts_nm, setLknts_nm] = useState<string>('');
  const [upcoming, setUpcoming] = useState<boolean>(false);

  // API 호출
  const { data: predictionData, isLoading } = useGetDiseasePredictionList({
    page,
    limit,
    lknts_nm: lknts_nm || undefined,
    upcoming,
  });

  const predictions = predictionData?.data?.list || [];
  const pagination = predictionData?.data?.pagination;

  // 필터 초기화
  const handleResetFilters = () => {
    setPage(1);
    setLknts_nm('');
    setUpcoming(false);
  };

  // 페이지 변경
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Wrap className="main_wrap" title={'질병 예측'}>
      <ContentsWrap>
        <div className="relative h-full w-full p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">질병 예측</h2>
          </div>

          {/* 필터 섹션 */}
          <div className="mb-6 pb-4 border-b border-gray-200 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-wrap items-end gap-4">
              {/* 전염병명 필터 */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">질병명</label>
                <input
                  type="text"
                  value={lknts_nm}
                  onChange={(e) => {
                    setLknts_nm(e.target.value);
                    setPage(1);
                  }}
                  placeholder="질병명 검색"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 오늘 이후만 조회 */}
              <div className="flex items-end">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={upcoming}
                    onChange={(e) => {
                      setUpcoming(e.target.checked);
                      setPage(1);
                    }}
                    className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">오늘 이후 예측만</span>
                </label>
              </div>

              {/* 필터 초기화 버튼 */}
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                필터 초기화
              </button>
            </div>
          </div>

          {/* 데이터 표시 영역 */}
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-gray-500">데이터를 불러오는 중...</div>
            </div>
          ) : predictions.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-gray-500">예측 데이터가 없습니다.</div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* 통계 정보 */}
              <div className="mb-4 text-sm text-gray-600">
                총 {pagination?.total || 0}건 (페이지 {pagination?.page || 1} / {pagination?.totalPages || 1})
              </div>

              {/* 테이블 */}
              <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '400px' }}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        예측일
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        질병명
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        위험도
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        신뢰도
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        예측 근거
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {predictions.map((prediction: any) => (
                      <tr key={prediction.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(prediction.prediction_date)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatDiseaseName(prediction.lknts_nm)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(
                              prediction.risk_level
                            )}`}
                          >
                            {formatRiskLevel(prediction.risk_level)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {prediction.confidence_score !== null && prediction.confidence_score !== undefined
                            ? `${Number(prediction.confidence_score).toFixed(1)}%`
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {formatPredictionBasis(prediction.prediction_basis)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 페이지네이션 */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    이전
                  </button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      // 현재 페이지 주변 5페이지만 표시
                      return p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 2;
                    })
                    .map((p, index, array) => {
                      // 생략 표시
                      if (index > 0 && p - array[index - 1] > 1) {
                        return (
                          <React.Fragment key={`ellipsis-${p}`}>
                            <span className="px-2 text-gray-500">...</span>
                            <button
                              onClick={() => handlePageChange(p)}
                              className={`px-3 py-2 text-sm font-medium rounded-md ${
                                p === page
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {p}
                            </button>
                          </React.Fragment>
                        );
                      }
                      return (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            p === page
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pagination.totalPages}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      page === pagination.totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    다음
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </ContentsWrap>
    </Wrap>
  );
};

export default DiseasePredictionPage;

