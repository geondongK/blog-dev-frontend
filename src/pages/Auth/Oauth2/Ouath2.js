import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { OAuth2 } from "../../../libs/service/authService";
import { setCookies } from "../../../utils/Cookies";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../redux/slices/userSlice";

function Oauth2() {
  const code = new URL(window.location.href).searchParams.get("code");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await OAuth2(code);

        const { user, token, expiresTime } = response.data;
        const now = new Date().getTime();

        // 현재 시간 + 만료시간
        const expires = new Date(now + expiresTime * 1000);
        dispatch(loginSuccess(user));
        // 쿠키 저장
        setCookies("token", token, {
          path: "/",
          expires: expires,
          httpOnly: process.env.REACT_APP_COOKIE_HTTPONLY,
          secure: process.env.REACT_APP_COOKIE_SECURE,
        });

        navigate("/");
      } catch (e) {
        // console.error(e);
      }
    })();
  }, []);

  return <div></div>;
}

export default Oauth2;
