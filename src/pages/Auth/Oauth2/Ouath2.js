import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { OAuth2 } from "../../../libs/service/authService";
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

        const { user } = response.data;

        dispatch(loginSuccess(user));

        navigate("/");
      } catch (e) {
        // console.error(e);
      }
    })();
  }, []);

  return <div></div>;
}

export default Oauth2;
