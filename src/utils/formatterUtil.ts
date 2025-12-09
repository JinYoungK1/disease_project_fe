export const businessplaceNoFormatter = (value: string) => {
  // 사업자등록번호 형식에 맞게 하이픈을 추가하는 로직
  if (!value) return value;

  //const trimmedValue = value.replace(/-/g, ''); // 기존에 입력된 하이픈 제거
  const trimmedValue = value.replace(/\D/g, '');
  let formattedValue = trimmedValue.slice(0, 3);

  if (trimmedValue.length > 3) {
    formattedValue += '-' + trimmedValue.slice(3, 5);
  }
  if (trimmedValue.length > 5) {
    formattedValue += '-' + trimmedValue.slice(5, 10);
  }
  return formattedValue;
};

// 법인번호
export const corporateNoFormatter = (value: string) => {
  // 법인번호 형식에 맞게 하이픈을 추가하는 로직 (6자리-7자리)
  if (!value) return value;

  const trimmedValue = value.replace(/\D/g, '');
  let formattedValue = trimmedValue.slice(0, 6);

  if (trimmedValue.length > 6) {
    formattedValue += '-' + trimmedValue.slice(6, 13);
  }
  return formattedValue;
};



export const phoneNumberFormatter = (phoneNumber: string) => {
  // if (phoneNumber.length > 12) {
  //   return phoneNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  // }

  // return phoneNumber.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3');

  if (typeof phoneNumber !== 'string') return '';

  phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

  if (phoneNumber.indexOf('82') === 0) {
    return phoneNumber.replace(/(^82)(2|\d{2})(\d+)?(\d{4})$/, '+$1-$2-$3-$4'); // +82
  } else if (phoneNumber.indexOf('1') == 0) {
    return phoneNumber.replace(/(^1\d{3})(\d{4})$/, '$1-$2'); // 1588, 1566, 1677, ...
  }

  return phoneNumber.replace(
    /(^02|^0504|^0505|^0\d{2})(\d+)?(\d{4})$/,
    '$1-$2-$3'
  ); // 02/0504/0505/010/011/031
};
export const juminNumberFormatter = (juminNumber: string) => {
  // 입력 값이 문자열이 아니면 빈 문자열 반환
  if (typeof juminNumber !== 'string') return '';

  // 숫자만 남기기
  juminNumber = juminNumber.replace(/[^0-9]/g, '');

  // 주민등록번호가 13자리가 아닌 경우 처리하지 않고 반환
  if (juminNumber.length !== 13) {
    return juminNumber; // 입력값 그대로 반환
  }

  // 올바른 주민등록번호 포맷으로 변환: 6자리-7자리
  return juminNumber.replace(/(\d{6})(\d{7})/, '$1-$2') || juminNumber.replace(/(\d{6})(\d{7})/, '$3-$4');
};



export const accountNickNameFormatter = (
  businessplace_nckname: string,
  bank_name: string,
  accountNum: string
) => {
  if (businessplace_nckname && bank_name && accountNum) {
    const _nickname =
      businessplace_nckname + '_' + bank_name + '_' + accountNum.slice(-3);

    return _nickname;
  }

  return '';
};

export const customerAccountNickNameFormatter = (
  bank_name: string,
  accountNum: string
) => {
  if (bank_name && accountNum) {
    const _nickname = bank_name + '_' + accountNum.slice(-4);

    return _nickname;
  }

  return '';
};

export const cardNickNameFormatter = (
  card_name: string,
  card_num: string,
  card_user: string
) => {
  if (card_name && card_user) {
    const _nickname = card_name + '_' + card_user + '_' + card_num.slice(-4);

    return _nickname;
  }

  return '';
};

// export const threeCommaFormatter = (value: string | null | undefined): string => {
//   if (!value) {
//     return ""; // null, undefined 또는 빈 문자열일 경우 빈 문자열 반환
//   }

//   return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };
export const threeCommaFormatter = (
  value: string | number | null | undefined
): string => {
  // 빈 값 또는 null/undefined면 빈 문자열 반환
  if (value === null || value === undefined || value === '') {
    return '';
  }

  // 숫자 문자열에 쉼표가 들어 있을 경우 제거 (ex: "1,000" → "1000")
  const numericValue = typeof value === 'string'
    ? Number(value.replace(/,/g, ''))
    : Number(value);

  // NaN 체크
  if (isNaN(numericValue)) {
    return ''; // 또는 '미등록'
  }

  // 숫자 → 천단위 쉼표 붙이기
  return numericValue.toLocaleString();
};


// 천 단위 구분 기호를 추가하는 함수
export const formatNumber = (value: string) => {
  const number = parseFloat(value.replace(/,/g, ''));
  return isNaN(number) ? '' : new Intl.NumberFormat().format(number);
};
export const parseFormattedValue = (value: string): number => {
  return parseFloat(value.replace(/,/g, '') || '0');
  // return parseFloat(value.replace(/,/g, '').trim()) || 0;
};

export const residentRegistrationNumberFormatter = (value: string) => {
  // 주민등록번호 형식에 맞게 하이픈을 추가하는 로직
  if (!value) return value;

  const trimmedValue = value.replace(/\D/g, '');
  let formattedValue = trimmedValue.slice(0, 6);

  if (trimmedValue.length > 6) {
    formattedValue += '-' + trimmedValue.slice(6, 13);
  }

  return formattedValue;
};
