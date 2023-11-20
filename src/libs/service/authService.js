import customAxios from "../api/axios";

/* 로그인 */
export const loginApi = (values) => {
  return customAxios.post("/auth/login", values);
};

/* 회원가입 */
export const registerApi = (values) => {
  return customAxios.post("/auth/signup", values);
};

/* 카카오 로그인 */
export const OAuth2 = (code) => {
  return customAxios.get(`/oauth/kakao/callback?code=${code}`);
};
