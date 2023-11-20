import axios from "axios";
import { persistor } from "../../redux/store/store";
import { getCookies, setCookies, removeCookies } from "../../utils/Cookies";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
  withCredentials: true,
});

const purge = async () => {
  await persistor.purge();
};

instance.interceptors.request.use(
  (request) => {
    const token = getCookies("token");

    request.headers["Authorization"] = `Bearer ${token}`;

    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    //console.log("response", response.data);

    return response;
  },
  async (error) => {
    const token = getCookies("token");

    const {
      config,
      response: { status },
    } = error;

    const originRequest = config;

    if (status === 401) {
      if (error.response.data.message === "Unauthorized") {
        // Refresh token API
        const response = await instance.post("/auth/reissue", {
          accessToken: token,
        });

        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;
          const expiresTime = response.data.accessTokenExpiresIn;

          const now = new Date().getTime();
          // 현재 시간 + 만료시간
          const expires = new Date(now + expiresTime * 1000);
          // 로컬 스토리지에 현재 이용자 저장.

          setCookies("token", newAccessToken, {
            path: "/",
            expires: expires,
            httpOnly: process.env.REACT_APP_COOKIE_HTTPONLY,
            secure: process.env.REACT_APP_COOKIE_SECURE,
          });

          originRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return instance(originRequest);
          // } else if (response.status === 404) {
          //   window.alert("1");
          // } else {
          //   window.alert("2");
          // }
        }
      }
    }

    window.alert("세션이 만료되었습니다. 계속하려면 다시 로그인 하세요");
    purge();
    removeCookies("token", {
      maxAge: 0,
      path: "/",
    });
    // navigate("/");
    return Promise.reject(error);
  }
);

export default instance;
