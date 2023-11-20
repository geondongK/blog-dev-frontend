import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키 생성
export const setCookies = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

// 쿠키 가져오기
export const getCookies = (name) => {
  return cookies.get(name);
};

// 쿠키 삭제
export const removeCookies = (name, option) => {
  return cookies.remove(name, { ...option });
};
