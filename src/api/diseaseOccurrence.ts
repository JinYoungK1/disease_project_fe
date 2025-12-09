import { useQuery } from '@tanstack/react-query';

import { APIError, apiQuery } from './apiQuery';
import {
  DiseaseOccurrenceListResponse,
  DiseaseStatisticsByDiseaseResponse,
  DiseaseStatisticsByDayResponse,
  DiseaseStatisticsByMonthResponse,
  DiseaseStatisticsByYearResponse,
} from '~/@types/diseaseOccurrence';

// 전염병 발생 데이터 조회
interface DiseaseOccurrenceListParams {
  page?: number;
  limit?: number;
  lknts_nm?: string;
  farm_nm?: string;
  occrrnc_de?: string;
  lvstckspc_nm?: string;
}

export function useGetDiseaseOccurrenceList({
  page = 1,
  limit = 20,
  lknts_nm,
  farm_nm,
  occrrnc_de,
  lvstckspc_nm,
}: DiseaseOccurrenceListParams = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (lknts_nm) params.append('lknts_nm', lknts_nm);
  if (farm_nm) params.append('farm_nm', farm_nm);
  if (occrrnc_de) params.append('occrrnc_de', occrrnc_de);
  if (lvstckspc_nm) params.append('lvstckspc_nm', lvstckspc_nm);

  const result = useQuery<DiseaseOccurrenceListResponse, APIError>({
    queryKey: [`/dashboard/disease-occurrence?${params}`],
    queryFn: apiQuery,
    refetchOnMount: true,
  });

  return {
    ...result,
    data: result.data,
  };
}

// 전염병별 발생마리수 합계 통계
export function useGetDiseaseStatisticsByDisease() {
  const result = useQuery<DiseaseStatisticsByDiseaseResponse, APIError>({
    queryKey: ['/dashboard/disease-occurrence/statistics/by-disease'],
    queryFn: apiQuery,
    refetchOnMount: true,
  });

  return {
    ...result,
    data: result.data,
  };
}

// 년별 전염병별 발생마리수 합계 통계
interface DiseaseStatisticsByYearParams {
  year?: string;
  enabled?: boolean;
}

export function useGetDiseaseStatisticsByYear({ year, enabled = true }: DiseaseStatisticsByYearParams = {}) {
  const params = new URLSearchParams();
  if (year) params.append('year', year);

  const queryKey = year
    ? [`/dashboard/disease-occurrence/statistics/by-year?${params}`]
    : ['/dashboard/disease-occurrence/statistics/by-year'];

  const result = useQuery<DiseaseStatisticsByYearResponse, APIError>({
    queryKey,
    queryFn: apiQuery,
    refetchOnMount: true,
    enabled,
  });

  return {
    ...result,
    data: result.data,
  };
}

// 월별 전염병별 발생마리수 합계 통계
interface DiseaseStatisticsByMonthParams {
  year: string;
  month?: string;
  enabled?: boolean;
}

export function useGetDiseaseStatisticsByMonth({ year, month, enabled = true }: DiseaseStatisticsByMonthParams) {
  const params = new URLSearchParams({ year });
  if (month) params.append('month', month);

  const result = useQuery<DiseaseStatisticsByMonthResponse, APIError>({
    queryKey: [`/dashboard/disease-occurrence/statistics/by-month?${params}`],
    queryFn: apiQuery,
    refetchOnMount: true,
    enabled,
  });

  return {
    ...result,
    data: result.data,
  };
}

// 일별 전염병별 발생마리수 합계 통계
interface DiseaseStatisticsByDayParams {
  year?: string;
  month?: string;
  startDate?: string;
  endDate?: string;
  enabled?: boolean;
}

export function useGetDiseaseStatisticsByDay({
  year,
  month,
  startDate,
  endDate,
  enabled = true,
}: DiseaseStatisticsByDayParams = {}) {
  const params = new URLSearchParams();
  if (year) params.append('year', year);
  if (month) params.append('month', month);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  const result = useQuery<DiseaseStatisticsByDayResponse, APIError>({
    queryKey: [`/dashboard/disease-occurrence/statistics/by-day?${params}`],
    queryFn: apiQuery,
    refetchOnMount: true,
    enabled,
  });

  return {
    ...result,
    data: result.data,
  };
}

