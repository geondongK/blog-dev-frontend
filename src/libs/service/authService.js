import customAxios from "../api/axios";

/* 로그인 */
export const loginApi = (values) => {
  return customAxios.post("/auth/login", values);
};

/* 로그아웃 */
export const logoutApi = () => {
  return customAxios.post("auth/logout");
};

/* 회원가입 */
export const registerApi = (values) => {
  return customAxios.post("/auth/signup", values);
};

/* 카카오 로그인 */
export const OAuth2 = (code) => {
  return customAxios.get(`/oauth/kakao/callback?code=${code}`);
};
