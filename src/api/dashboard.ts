import { useQuery } from '@tanstack/react-query';

import { APIError, apiQuery } from './apiQuery';

// 대시보드 매출액 보기 !!!!
// ======== [ 상세 정보 ] ========
interface DeliveryInfoData {
  totalCount: number;
  totalPages: number;
  totalSales?: number;
}

export interface DeliveryInfoResponse {
  result: boolean;
  message: string;
  data: DeliveryInfoData;
}

interface DeliveryInfoAllParams {
  page: number;
  size?: number;
  search?: string | null;
  deliveryStartDate?: string;
  deliveryEndDate?: string;
}

// 일 매출
export function useGetDeliverySalesAmountInfos({
  page = 1,
  size = 20,
  search,
}: DeliveryInfoAllParams) {
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'yyyy-MM-dd' 형식으로 변환

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    deliveryStartDate: today, // 기본값으로 오늘 날짜
    deliveryEndDate: today, // 기본값으로 오늘 날짜
  });

  if (search) params.append('search', search);

  const result = useQuery<DeliveryInfoResponse, APIError>({
    queryKey: [`/reference/daysales?${params}`],
    queryFn: apiQuery,
    refetchOnMount: true,
  });

  return {
    ...result,
    data: result.data,
  };
}

// 월 매출
export function useGetDeliveryMonthSalesAmountInfos({
  page = 1,
  size = 20,
  search,
}: DeliveryInfoAllParams) {
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'yyyy-MM-dd' 형식으로 변환

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    deliveryStartDate: today, // 기본값으로 오늘 날짜
    deliveryEndDate: today, // 기본값으로 오늘 날짜
  });

  if (search) params.append('search', search);

  const result = useQuery<DeliveryInfoResponse, APIError>({
    queryKey: [`/reference/monthsales?${params}`],
    queryFn: apiQuery,
    refetchOnMount: true,
  });

  return {
    ...result,
    data: result.data,
  };
}

// 연 매출
export function useGetDeliveryYearSalesAmountInfos({
  page = 1,
  size = 20,
  search,
}: DeliveryInfoAllParams) {
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'yyyy-MM-dd' 형식으로 변환

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    deliveryStartDate: today, // 기본값으로 오늘 날짜
    deliveryEndDate: today, // 기본값으로 오늘 날짜
  });

  if (search) params.append('search', search);

  const result = useQuery<DeliveryInfoResponse, APIError>({
    queryKey: [`/reference/yearsales?${params}`],
    queryFn: apiQuery,
    refetchOnMount: true,
  });

  return {
    ...result,
    data: result.data,
  };
}

//========================
// ======== [ 상세 정보 ] ========
interface OrderReceiptInfoData {
  totalCount: number;
  totalPages: number;
  totalSales?: number;
}

interface OrderReceiptInfoAllParams {
  page: number;
  size?: number;
  orderStartDate?: string | null;
  orderEndDate?: string | null;
  search?: string | null;
}
export interface OrderReceiptInfoResponse {
  result: boolean;
  message: string;
  data: OrderReceiptInfoData;
}

// 일 이익
export function useGetDayProfitInfos({
  page = 1,
  size = 20,
  search,
}: OrderReceiptInfoAllParams) {
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'yyyy-MM-dd' 형식으로 변환

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    orderStartDate: today, // 기본값으로 오늘 날짜
    orderEndDate: today, // 기본값으로 오늘 날짜
  });

  if (search) params.append('search', search);

  const result = useQuery<OrderReceiptInfoResponse, APIError>({
    queryKey: [`/reference/dayprofits?${params}`],
    queryFn: apiQuery,
    refetchOnMount: true,
  });

  return {
    ...result,
    data: result.data,
  };
}
