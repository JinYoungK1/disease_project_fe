import { useQuery } from '@tanstack/react-query';

import { APIError, apiQuery } from './apiQuery';
import {
  DiseasePredictionListResponse,
  DiseasePredictionByDiseaseResponse,
  DiseasePredictionByDateResponse,
} from '~/@types/diseasePrediction';

// 예측 데이터 조회
interface DiseasePredictionListParams {
  page?: number;
  limit?: number;
  lknts_nm?: string;
  prediction_date?: string;
  startDate?: string;
  endDate?: string;
  upcoming?: boolean;
  region?: string;
  risk_level?: string;
  min_confidence?: number;
  enabled?: boolean;
}

export function useGetDiseasePredictionList({
  page = 1,
  limit = 20,
  lknts_nm,
  prediction_date,
  startDate,
  endDate,
  upcoming,
  region,
  risk_level,
  min_confidence,
  enabled = true,
}: DiseasePredictionListParams = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (lknts_nm) params.append('lknts_nm', lknts_nm);
  if (prediction_date) params.append('prediction_date', prediction_date);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  if (upcoming) params.append('upcoming', 'true');
  if (region) params.append('region', region);
  if (risk_level) params.append('risk_level', risk_level);
  if (min_confidence !== undefined) params.append('min_confidence', min_confidence.toString());

  const result = useQuery<DiseasePredictionListResponse, APIError>({
    queryKey: [`/dashboard/disease-occurrence/predict?${params}`],
    queryFn: apiQuery,
    refetchOnMount: true,
    enabled,
  });

  return {
    ...result,
    data: result.data,
  };
}

// 전염병별 예측 목록 조회
interface DiseasePredictionByDiseaseParams {
  lknts_nm: string;
  enabled?: boolean;
}

export function useGetDiseasePredictionByDisease({
  lknts_nm,
  enabled = true,
}: DiseasePredictionByDiseaseParams) {
  const params = new URLSearchParams({ lknts_nm });

  const result = useQuery<DiseasePredictionByDiseaseResponse, APIError>({
    queryKey: [`/dashboard/disease-occurrence/predict/by-disease?${params}`],
    queryFn: apiQuery,
    refetchOnMount: true,
    enabled: enabled && !!lknts_nm,
  });

  return {
    ...result,
    data: result.data,
  };
}

// 날짜별 예측 목록 조회
interface DiseasePredictionByDateParams {
  date: string; // YYYYMMDD 형식
  enabled?: boolean;
}

export function useGetDiseasePredictionByDate({ date, enabled = true }: DiseasePredictionByDateParams) {
  const params = new URLSearchParams({ date });

  const result = useQuery<DiseasePredictionByDateResponse, APIError>({
    queryKey: [`/dashboard/disease-occurrence/predict/by-date?${params}`],
    queryFn: apiQuery,
    refetchOnMount: true,
    enabled: enabled && !!date,
  });

  return {
    ...result,
    data: result.data,
  };
}

