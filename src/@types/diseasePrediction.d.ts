export interface LivestockDiseasePrediction {
  id: number;
  lknts_nm: string | null;
  prediction_date: string; // YYYYMMDD 형식
  region: string | null;
  risk_level: string | null; // 위험도 (예: 'high', 'medium', 'low')
  confidence_score: number | null; // 신뢰도 (0-1 또는 0-100)
  prediction_basis: any; // JSON 객체 (문자열로 저장되어 있음)
  createdAt: string;
  updatedAt: string;
}

export interface DiseasePredictionListResponse {
  result: boolean;
  message: string;
  data: {
    list: LivestockDiseasePrediction[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface DiseasePredictionByDiseaseResponse {
  result: boolean;
  message: string;
  data: {
    diseaseName: string;
    predictions: LivestockDiseasePrediction[];
    totalCount: number;
  };
}

export interface DiseasePredictionByDateResponse {
  result: boolean;
  message: string;
  data: {
    date: string;
    predictions: LivestockDiseasePrediction[];
    totalCount: number;
  };
}

