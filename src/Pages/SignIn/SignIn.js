import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authActions } from "../../store/auth-slice";
import useInput from "../../hooks/use-input";
import SignLayout from "../../components/Layout/SignLayout";
import Button1 from "../../components/Button/Button1";
import Input from "../../components/Input/Input";
import classes from "./SignIn.module.css";
import RootLayout from "../../components/Layout/RootLayout";
import { fetchLogin } from "../../apis/requests";
import axios from "axios";
import { updateAuthorizationHeader } from "../../apis/api";

const validateID = (id) => {
  return /^[a-z0-9_-]{5,20}$/.test(id);
};
const validatePW = (pw) => {
  return /^[a-zA-Z\d@!#$%^&*]{8,16}$/.test(pw);
};

const SignIn = () => {
  const {
    value: idValue,
    isValid: idIsValid,
    valueChangeHandler: idChangeHandler,
  } = useInput(validateID);
  const {
    value: pwValue,
    isValid: pwIsValid,
    valueChangeHandler: pwChangeHandler,
  } = useInput(validatePW);
  const [values, setValues] = useState({ id: "", password: "" });
  const [formIsValid, setFormIsValid] = useState(false);
  const [allowSendRequest, setAllowSendRequest] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setFormIsValid(idIsValid && pwIsValid);
    if (!(idIsValid && pwIsValid)) {
      setIsError(true);
      return;
    }
    setValues((prevValues) => ({
      ...prevValues,
      id: idValue,
      password: pwValue,
    }));
    setAllowSendRequest(true);
  };

  async function login() {
    try {
      const response = await fetchLogin(values);
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      localStorage.setItem("AccessToken", response.headers["authorization"]);
      localStorage.setItem("RefreshToken", response.headers["x-refresh-token"]);
      updateAuthorizationHeader();
      dispatch(
        authActions.login({
          loginId: response.data.data.userId,
          name: response.data.data.userId,
          accessToken: response.headers["authorization"],
          refreshToken: response.headers["x-refresh-token"],
        })
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setAllowSendRequest(false);
    }
  }

  useEffect(() => {
    if (allowSendRequest) {
      login();
    }
  }, [allowSendRequest]);

  return (
    <RootLayout>
      <SignLayout>
        <form
          method="post"
          className={classes.formContainer}
          onSubmit={submitHandler}
        >
          <h1>HANAMATE</h1>
          <Input
            type="text"
            label="ID"
            name="ID"
            placeholder="아이디"
            onChange={idChangeHandler}
          />
          <Input
            type="password"
            label="PW"
            name="PW"
            placeholder="비밀번호"
            onChange={pwChangeHandler}
          />
          {isError && (
            <div className={classes["error-message__container"]}>
              <p className={classes["error-message"]}>
                아이디 또는 비밀번호를 다시 입력해주세요.
              </p>
            </div>
          )}
          <Button1 type="submit">로그인</Button1>
          <div className={classes.helperContainer}>
            {/* <Link to="/help/idInquiry">아이디 찾기</Link>
            <Link to="/help/pwInquiry">비밀번호 찾기</Link> */}
            <Link to="/join">회원가입</Link>
          </div>
        </form>
      </SignLayout>
    </RootLayout>
  );
};

export default SignIn;
