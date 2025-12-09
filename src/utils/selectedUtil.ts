export type EmailKey = 'naver.com' | 'daum.net' | 'gmail.com' | 'custom';
export const EMAIL_INCLUDES = ['naver.com', 'daum.net', 'gmail.com'];

export type CitizenKey = 'citizen' | 'foreign';
export const CITIZEN_INCLUDES = ['citizen', 'foreign'];

export const EMAIL_ITEMS: {
  key: string;
  value: string;
}[] = [
  {
    key: 'naver.com',
    value: 'naver.com',
  },
  {
    key: 'daum.net',
    value: 'daum.net',
  },

  {
    key: 'gmail.com',
    value: 'gmail.com',
  },
  {
    key: 'custom',
    value: '선택',
  },
];
export const CITIZEN_ITEMS: {
  key: string;
  value: string;
}[] = [
  {
    key: '외국인',
    value: '외국인',
  },
  {
    key: '내국인',
    value: '내국인',
  },
];

export const PAY_GUBUN: {
  key: string;
  value: string;
}[] = [
  {
    key: '청구',
    value: '청구',
  },
  {
    key: '영수',
    value: '영수',
  },
  {
    key: '현금영수증',
    value: '현금영수증',
  },
  {
    key: '신용카드',
    value: '신용카드',
  },
  {
    key: '제로페이',
    value: '제로페이',
  },
  {
    key: '마이너스',
    value: '마이너스',
  },
  {
    key: '하자',
    value: '하자',
  },
  {
    key: '접대',
    value: '접대',
  },
];

export const PARCE_ITEMS: {
  key: string;
  value: string;
}[] = [
  {
    key: '착불',
    value: '착불',
  },
  {
    key: '선불',
    value: '선불',
  },
];

export const onSearchEmail = (key: string) => {
  const result = EMAIL_ITEMS.find((email) => email.key === key);

  if (!result) {
    return key;
  }

  return result?.value;
};

export const onSearchEmailDomain = (domain: any) => {
  const result = EMAIL_ITEMS.find((email) => email.value === domain);
  if (!result) {
    return 'custom';
  }

  return result.key;
};

export const GENDER_ITEMS = [
  {
    key: 'male',
    value: '남성',
  },
  {
    key: 'female',
    value: '여성',
  },
];

export const TIME_ITEMS = Array.from({ length: 24 }, (_, hour) =>
  Array.from({ length: 60 }, (_, minute) => {
    const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    return { key: time, value: time };
  })
).flat();
export const onSearchTime = (key: string) => {
  const result = TIME_ITEMS.find((time) => time.key === key);

  if (!result) {
    return key;
  }

  return result?.value;
};

export const ALL_CATEGORY = [{ key: 'all', value: '전체' }];
