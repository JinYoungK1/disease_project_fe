// 숫자만 허용ㄴ
export const filterToNumbers = (value: string) => {
  return value.replace(/[^0-9\-]/g, '');
};

export const filterToEngAndNumbers = (value: string) => {
  return value.replace(/[^a-zA-Z0-9@._-]/g, '');
};
