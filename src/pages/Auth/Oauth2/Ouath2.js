import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from "../../../libs/service/api/axios";
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
        const response = await axios.get(`/oauth/kakao/callback?code=${code}`);

        const { user, token } = response.data;
        dispatch(loginSuccess(user));
        // 쿠키 저장
        setCookies("token", token, {
          path: "/",
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
