import React, { useState, useEffect } from "react";
import axios from "axios";

import Input from "../../components/Input/Input";
import Button1 from "../../components/Button/Button1";
import classes from "./ApplyForm.module.css"
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import SignLayout from "../../components/Layout/SignLayout";

import RootLayout from "../../components/Layout/RootLayout";
import Header from "../../components/Layout/Header";
import ParentEmptyApply from "../../components/Card/ParentEmptyApply";
import ParentExistApply from "../../components/Card/ParentExistApply";

import ChildEmptyApply from "../../components/Card/ChildEmptyApply";
import ChildExistApply from "../../components/Card/ChildExistApply";

import Section from "../../components/Card/Section";
import TransactionBox from "../../components/Card/TransactionBox";
import Transaction from "../../components/Card/Transaction";

import Button2 from "../../components/Button/Button2";
import ApproveBtn from "../../components/Button/ApproveBtn";

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

const ApplyForm = (props) => {
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

  const [loanInfo, setLoanInfo] = useState(null);
  const [dummy, setDummy] = useState([]);
  const accessToken =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MyIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTI4OTU2OTF9.sk9uF_fPgpuZBknDjPDberw56M9w-iCA2q5P-iX0IVY";
    // const { userType } = useSelector((state) => state.auth); // assuming userType is available in the state


//   const submitHandler = (event) => {
//     event.preventDefault();
//     if (
//       nameIsValid &&
//       phoneIsValid &&
//       birthIsValid &&
//       idIsValid &&
//       pwIsValid &&
//       confirmationIsValid
//     ) {
//       setFormIsValid(true);
//     } else {
//       setFormIsValid(false);
//     }
//     setValues((prevValues) => ({
//       ...prevValues,
//       name: nameValue,
//       phone: phoneValue,
//       birth: birthValue,
//       id: idValue,
//       pw: pwValue,
//       type: userType,
//     }));
//     setAllowSendRequest(true);
//   };

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

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/loan/applyForm", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        // axios.get("https://hanamate.onrender.com/").then((res) => {
        if (res.data.state === 200) {
          console.log("Success on React Server");
          setLoanInfo(res.data.data);
          console.log(res.data.data);
        } 

        else {
          console.log("토큰 유효기간이 끝났을 겁니당~");
        }
      })
    //   .catch((error) => {
    //     console.error("에러 발생:", error);
    //   });
  }, []);

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
    <RootLayout header={true}>
<Header left="back" title="대출 신청" right="blank" />
{loanInfo && (
        <div>
          <p>이자율: {loanInfo.interestRate}%</p>
          <p>상환 방법: {loanInfo.paymentMethod}</p>
          {/* 이외의 다른 정보도 필요하다면 여기에 추가 */}
        </div>
      )}
      {/* <form className={classes.formContainer} onSubmit={submitHandler}>
        
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
      </form> */}
    </RootLayout>
    
  );
};

export default ApplyForm;