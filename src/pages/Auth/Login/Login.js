import "../auth.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { useFormik } from 'formik';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { setCookies } from "../../../utils/Cookies";
import { loginSuccess } from "../../../redux/slices/userSlice";
import { ReactComponent as KaKaoIcon } from "../../../assets/images/kakaoLogin.svg";
import { loginApi } from "../../../libs/service/authService";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [handleLogin, setHandleLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  // const code = new URL(window.location.href).searchParams.get("code");

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("이메일을 입력해 주세요.")
      .email("이메일 형식이 올바르지 않습니다."),
    password: yup.string().required("비밀번호를 입력해 주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values) => {
    await loginApi(values)
      .then((response) => {
        const { user, token, expiresTime } = response.data.data;
        const now = new Date().getTime();

        // 현재 시간 + 만료시간
        const expires = new Date(now + expiresTime * 1000);
        // 로컬 스토리지에 현재 이용자 저장.
        dispatch(loginSuccess(user));

        // 쿠키 저장
        setCookies("token", token, {
          path: "/",
          expires: expires,
          httpOnly: process.env.REACT_APP_COOKIE_HTTPONLY,
          secure: process.env.REACT_APP_COOKIE_SECURE,
        });
        navigate("/");
      })
      .catch((error) => {
        setHandleLogin(true);
        setLoginMessage(error.response.data.message);
      });
  };

  const kakaoLogin = () => {
    const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT;

    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  const handleLoginError = () => {
    return <span className="errors-message">{loginMessage}</span>;
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="auth-title">
          <span>로그인</span>
        </div>
        <button
          onClick={() => {
            kakaoLogin();
          }}
          type="button"
          className="socialAuth-kakao"
        >
          <KaKaoIcon width="30px" height="30px" />
          <span>카카오 로그인</span>
        </button>
        <hr />
        {/* <div className="login-form"> */}
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-input">
            <p>이메일</p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일"
              {...register("email")}
              onClick={() => {
                setHandleLogin(false);
              }}
            />
            {errors.email && (
              <span className="errors-message">{errors.email.message}</span>
            )}
          </div>
          <div className="auth-input">
            <p>비밀번호</p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호"
              {...register("password", { required: true })}
              onClick={() => {
                setHandleLogin(false);
              }}
            />
            {!errors.password ? null : (
              <span className="errors-message">{errors.password.message}</span>
            )}
          </div>
          {!handleLogin ? null : handleLoginError()}
          <button type="submit">로그인</button>
        </form>
        {/* </div> */}
        <div className="link">
          <Link to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
