import instance from "./instance";
import { useEffect } from "react";
import { persistor } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";

const logout = async () => {
  await instance
    .post("/auth/logout")
    .then(() => {})
    .catch(() => {});
};

const purge = async () => {
  await persistor.purge();
};

// 헤더 인증 방식.
// instance.interceptors.request.use(
//   (request) => {
//      console.log("requestreact", request);
//     const token = getCookies("token");

//     request.headers["Authorization"] = `Bearer ${token}`;

//     return request;
//   },
//   (error) => {
//      console.log(error);
//     return Promise.reject(error);
//   }
// );

export default function AuthContext() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error;

        const originRequest = config;

        if (status === 401) {
          if (error.response.data.message === "Unauthorized") {
            // Refresh token API
            const response = await instance.post("/auth/reissue");

            if (response.status === 200) {
              const newAccessToken = response.data.accessToken;

              originRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;

              return instance(originRequest);
            }
          }
        }
        window.alert("세션이 만료되었습니다. 계속하려면 다시 로그인 하세요");
        navigate("/");
        purge();
        logout();

        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(interceptor);
    };
  }, []);
  return <></>;
}
