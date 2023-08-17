import React, { useState, useEffect } from "react";
import axios from "axios";

import Input from "../../components/Input/Input";
import Button1 from "../../components/Button/Button1";
import classes from "./SignUp.module.css";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import SignLayout from "../../components/Layout/SignLayout";

const validateName = (name) => {
  return /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]+$/.test(name);
};
const validatePhone = (phone) => {
  return /^[0-9]{11}$/.test(phone);
};
const validateBirth = (birth) => {
  return /^[0-9]{8}$/.test(birth);
};
const validateID = (id) => {
  return /^[a-z0-9_-]{5,20}$/.test(id);
};
const validatePW = (pw) => {
  return /^[a-zA-Z\d@!#$%^&*]{8,16}$/.test(pw);
};
const validateConfirmation = (pw1, pw2) => {
  return pw1 === pw2;
};

const SignUp = (props) => {
  const navigate = useNavigate();
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(validateName);
  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInput(validatePhone);
  const {
    value: birthValue,
    isValid: birthIsValid,
    hasError: birthInputHasError,
    valueChangeHandler: birthChangeHandler,
    inputBlurHandler: birthBlurHandler,
  } = useInput(validateBirth);
  const {
    value: idValue,
    isValid: idIsValid,
    hasError: idInputHasError,
    valueChangeHandler: idChangeHandler,
    inputBlurHandler: idBlurHandler,
  } = useInput(validateID);
  const {
    value: pwValue,
    isValid: pwIsValid,
    hasError: pwInputHasError,
    valueChangeHandler: pwChangeHandler,
    inputBlurHandler: pwBlurHandler,
  } = useInput(validatePW);
  const {
    isValid: confirmationIsValid,
    hasError: confirmationInputHasError,
    valueChangeHandler: confirmationChangeHandler,
    inputBlurHandler: confirmationBlurHandler,
  } = useInput((value) => validateConfirmation(value, pwValue));

  const [userType, setUserType] = useState("children");
  const [values, setValues] = useState({
    name: "",
    phone: "",
    birth: "",
    id: "",
    pw: "",
    type: undefined,
  });
  const [formIsValid, setFormIsValid] = useState(true);
  const [allowSendRequest, setAllowSendRequest] = useState(false);
  const [isError, setIsError] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      nameIsValid &&
      phoneIsValid &&
      birthIsValid &&
      idIsValid &&
      pwIsValid &&
      confirmationIsValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
    setValues((prevValues) => ({
      ...prevValues,
      name: nameValue,
      phone: phoneValue,
      birth: birthValue,
      id: idValue,
      pw: pwValue,
      type: userType,
    }));
    setAllowSendRequest(true);
  };

  /*
  useEffect(() => {
    if (allowSendRequest) {
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:8080/signup", values)
        // .post("https://hanamate.onrender.com/signup", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            navigate("/login");
          } else {
            setAllowSendRequest(false);
            setIsError(true);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setAllowSendRequest(false));
    }
  }, [allowSendRequest, navigate, values]);
  */

  const [childrenButtonClass, setChildrenButtonClass] = useState(
    classes["selected"]
  );
  const [parentsButtonClass, setParentsButtonClass] = useState("");

  const parentsHandler = () => {
    setUserType("parents");
    setChildrenButtonClass("");
    setParentsButtonClass(classes["selected"]);
  };

  const childrenHandler = () => {
    setUserType("children");
    setChildrenButtonClass(classes["selected"]);
    setParentsButtonClass("");
  };

  return (
    <SignLayout>
      <form className={classes.formContainer} onSubmit={submitHandler}>
        <h1>HANAMATE</h1>
        <div className={classes.typeSelector}>
          <button
            type="button"
            className={childrenButtonClass}
            onClick={childrenHandler}
          >
            아이
          </button>
          <button
            type="button"
            className={parentsButtonClass}
            onClick={parentsHandler}
          >
            부모
          </button>
        </div>
        <Input
          type="text"
          id="name"
          name="name"
          label="name"
          placeholder="이름 *"
          required={true}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          error={nameInputHasError}
          errorMessage="이름을 다시 입력해주세요."
        />
        <Input
          type="number"
          id="phone"
          name="phone"
          label="phone"
          placeholder="연락처 (- 없이 숫자만 입력) *"
          required={true}
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          error={phoneInputHasError}
          errorMessage="전화번호를 다시 입력해주세요."
        />
        <Input
          type="number"
          id="birth"
          name="birth"
          label="birth"
          placeholder="생년월일 (8자리) *"
          required={true}
          onChange={birthChangeHandler}
          onBlur={birthBlurHandler}
          error={birthInputHasError}
          errorMessage="생년월일을 다시 입력해주세요."
        />
        <Input
          type="text"
          id="ID"
          name="ID"
          label="ID"
          placeholder="아이디 *"
          required={true}
          onChange={idChangeHandler}
          onBlur={idBlurHandler}
          error={idInputHasError}
          errorMessage="아이디를 다시 입력해주세요."
        />
        <Input
          type="password"
          id="password"
          name="password"
          label="password"
          placeholder="비밀번호 *"
          required={true}
          onChange={pwChangeHandler}
          onBlur={pwBlurHandler}
          error={pwInputHasError}
          errorMessage="8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
        />
        <Input
          type="password"
          id="confirmation"
          name="confirmation"
          label="confirmation"
          placeholder="비밀번호 확인 *"
          required={true}
          onChange={confirmationChangeHandler}
          onBlur={confirmationBlurHandler}
          error={confirmationInputHasError}
          errorMessage="비밀번호가 일치하지 않습니다."
        />
        <input
          type="hidden"
          id="userType"
          name="userType"
          label="userType"
          value={userType}
        />
        {isError && (
          <p className={classes.errorMessage}>회원가입에 실패했습니다.</p>
        )}
        <Button1 disabled={!formIsValid}>회원가입</Button1>
      </form>
    </SignLayout>
  );
};

export default SignUp;
