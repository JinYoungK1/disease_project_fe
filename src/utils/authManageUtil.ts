export const AUTH_FORM_MAP = {
  referenceInfo: {
    title: '기준정보',
    menus: [
      {
        key: 'businessInfo',
        title: '사업장 정보',
      },
      {
        key: 'customerInfo',
        title: '고객 정보',
      },
      {
        key: 'itemInfo',
        title: '품목 정보',
      },
      {
        key: 'recipeInfo',
        title: '레시피 정보',
      },
      {
        key: 'warehouseManage',
        title: '창고정보ㅈ',
      },
      {
        key: 'employeeInfo',
        title: '사원 정보',
      },
      {
        key: 'authorityManage',
        title: '권한 관리',
      },
      {
        key: 'calendar',
        title: '캘린더',
      },
      {
        key: 'comprehensiveSetting',
        title: '통합 설정',
      },
    ],
  },
  businessManage: {
    title: '영업관리',
    menus: [
      {
        key: 'orderManage',
        title: '주문 관리',
      },
      {
        key: 'receivingManage',
        title: '입고 관리',
      },
      {
        key: 'shipmentManage',
        title: '출하 관리',
      },
      {
        key: 'deliveryManage',
        title: '납품관리',
      },
    ],
  },
  productionManage: {
    title: '생산관리',
    menus: [
      {
        key: 'production',
        title: '생산(할복)',
      },
      {
        key: 'primaryPackaging',
        title: '1차 포장',
      },
      {
        key: 'secondaryPackaging',
        title: '2차 포장',
      },
      {
        key: 'stock',
        title: '재고',
      },
      {
        key: 'packagingFormat',
        title: '포장 형식',
      },
      {
        key: 'costManagement',
        title: '원가계산',
      },
    ],
  },
  qualityControl: {
    title: '품질관리',
    menus: [
      {
        key: 'problemHandling',
        title: '문제 처리',
      },
    ],
  },
  accountingManage: {
    title: '회계관리',
    menus: [
      {
        key: 'issuanceTaxInvoices',
        title: '세금계산서 발행',
      },
      {
        key: 'checkCashReceiptDetails',
        title: '현금영수증 내역 조회',
      },
      {
        key: 'inquiryBusinessCreditCardUsage',
        title: '법인카드 사용내역 조회',
      },
      {
        key: 'businessRegistrationStatusInquiry',
        title: '사업자등록 상태조회',
      },
      {
        key: 'issueElectronicTaxInvoiceModification',
        title: '전자세금계산서 수정발행',
      },
      {
        key: 'headOfClient',
        title: '거래처 장',
      },
    ],
  },
  constructionmanage: {
    title: '공사 관리',
    menus: [
      {
        key: 'constructionmanage',
        title: '현장별 노무비',
      },
      {
        key: 'fieldinformation',
        title: '현장 정보',
      }, 
    ],
  },
  employeeManage: {
    title: '사원관리',
    menus: [
      {
        key: 'salary',
        title: '급여',
      },
      {
        key: 'toDoList',
        title: '할일 목록',
      },
      {
        key: 'project',
        title: '프로젝트',
      },
      {
        key: 'payLog',
        title: '급여 기록',
      },
      {
        key: 'congratulationsCondolences',
        title: '경조사',
      },
    ],
  },
  monitoring: {
    title: '모니터링',
  },
};

export const menuKeyToFormKey = (key: string) => {
  // @ts-ignore
  return AUTH_FORM_MAP?.[key];
};
