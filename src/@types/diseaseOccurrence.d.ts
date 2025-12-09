export interface LivestockDiseaseOccurrence {
  id: number;
  ictsd_occrrnc_no: string;
  lknts_nm: string | null;
  farm_nm: string | null;
  farm_locplc_legaldong_code: string | null;
  farm_locplc: string | null;
  occrrnc_de: string | null;
  lvstckspc_code: string | null;
  lvstckspc_nm: string | null;
  occrrnc_lvstckcnt: number | null;
  dgnss_engn_code: string | null;
  dgnss_engn_nm: string | null;
  cessation_de: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DiseaseOccurrenceListResponse {
  result: boolean;
  message: string;
  data: {
    list: LivestockDiseaseOccurrence[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface DiseaseStatisticsByDisease {
  diseaseName: string;
  occurrenceCount: number;
  totalLivestockCount: number;
  firstOccurrenceDate: string;
  lastOccurrenceDate: string;
}

export interface DiseaseStatisticsByDiseaseResponse {
  result: boolean;
  message: string;
  data: DiseaseStatisticsByDisease[];
}

export interface DiseaseStatisticsByYear {
  year: string;
  diseaseName: string;
  occurrenceCount: number;
  totalLivestockCount: number;
}

export interface DiseaseStatisticsByYearResponse {
  result: boolean;
  message: string;
  data: DiseaseStatisticsByYear[];
}

export interface DiseaseStatisticsByMonth {
  year: string;
  month: string;
  diseaseName: string;
  occurrenceCount: number;
  totalLivestockCount: number;
}

export interface DiseaseStatisticsByMonthResponse {
  result: boolean;
  message: string;
  data: DiseaseStatisticsByMonth[];
}

export interface DiseaseStatisticsByDay {
  occurrenceDate: string;
  diseaseName: string;
  occurrenceCount: number;
  totalLivestockCount: number;
}

export interface DiseaseStatisticsByDayResponse {
  result: boolean;
  message: string;
  data: DiseaseStatisticsByDay[];
}

