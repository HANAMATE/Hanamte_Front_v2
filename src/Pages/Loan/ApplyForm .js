import React, { useState, useEffect } from "react";
import axios from "axios";

import Input from "../../components/Input/Input";
import Button1 from "../../components/Button/Button1";
import Button3 from "../../components/Button/Button3";
import classes from "./ApplyForm.module.css";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";

import RootLayout from "../../components/Layout/RootLayout";
import Header from "../../components/Layout/Header";

const validateAmount = (amount) => {
  return /^[0-9]+$/.test(amount);
};

const validateLoanName = (loanName) => {
  return /^[a-zA-Z가-힣0-9\s]{1,10}$/.test(loanName);
};

const validateLoanMsg = (loanMsg) => {
  return /^[a-zA-Z가-힣0-9\s]{1,20}$/.test(loanMsg);
};
const ApplyForm = (props) => {
  const navigate = useNavigate();

  const {
    value: amountValue,
    isValid: amountIsValid,
    hasError: amountInputHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput(validateAmount);

  const {
    value: loanNameValue,
    isValid: loanNameIsValid,
    hasError: loanNameInputHasError,
    valueChangeHandler: loanNameChangeHandler,
    inputBlurHandler: loanNameBlurHandler,
  } = useInput(validateLoanName);

  const {
    value: loanMsgValue,
    isValid: loanMsgIsValid,
    hasError: loanMsgInputHasError,
    valueChangeHandler: loanMsgChangeHandler,
    inputBlurHandler: loanMsgBlurHandler,
  } = useInput(validateLoanMsg);

  const [userType, setUserType] = useState("children");
  const [values, setValues] = useState({
    name: "",
    phone: "",
    birth: "",
    id: "",
    pw: "",
    type: undefined,
  });

  const [isCalError, setIsCalError] = useState(false);
  const [isApyError, setIsApyError] = useState(false);

  const [loanInfo, setLoanInfo] = useState(null);
  const accessToken = localStorage.getItem("AccessToken");

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/loan/applyForm", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        if (res.data.state === 200) {
          console.log("Success on React Server - 대출 신청 페이지");
          setLoanInfo(res.data.data);
          console.log(res.data.data);
        } else {
          console.log("토큰 유효기간이 끝났을 겁니당~");
        }
      });
  }, []);

  const [selectedDuration, setSelectedDuration] = useState(3);

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
  };

  const [formIsValid, setFormIsValid] = useState(true);

  const [calculatedAmount, setCalculatedAmount] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const requestBody = {
      loanAmount: amountValue, // 입력한 금액을 정수로 변환하여 전달
      sequence: selectedDuration, // 선택된 상환 기간 전달
      interestRate: 1, // 고정 이자율 값
    };
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/loan/calculate", requestBody, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        // POST 요청 성공 시 처리할 내용
        // response.data에 계산 결과나 필요한 정보가 포함될 수 있음
        console.log("계산 버튼 성공");
        const {
          loanAmountList,
          repaymentList,
          total_interestRate,
          total_repaymentAmount,
        } = response.data.data;

        // 대출 한도 초과 여부 체크
        if (loanAmountList.length === 0) {
          setIsCalError(true);
          return;
        }

        setLoanAmountList(loanAmountList);
        setRepaymentList(repaymentList);
        setTotalInterestRate(total_interestRate);
        setTotalRepaymentAmount(total_repaymentAmount);
        setIsCalError(false);
      })
      .catch((error) => {
        // POST 요청 실패 시 처리할 내용
        setIsCalError(true); // 실패했음을 표시
        console.error("계산 요청 실패:", error);
      });
  };

  const handleApply = (e) => {
    e.preventDefault();

    // 대출 이름과 메시지가 빈 경우 신청 처리하지 않음
    if (!loanNameValue || !loanMsgValue) {
      setIsApyError(true); // 에러 메시지 표시
      return;
    } else {
      setIsApyError(false);
    }
    // 신청하기 버튼을 누를 때 처리하는 로직
    const requestBody = {
      loanName: loanNameValue, // 대출 이름 입력 값
      loanAmount: amountValue, // 금액 입력 값
      loanMessage: loanMsgValue, // 메시지 입력 값
      total_interestRate, // GET으로 가져온 값
      total_repaymentAmount, // GET으로 가져온 값
      sequence: selectedDuration, // 선택된 상환 기간
      balance: total_repaymentAmount,
    };

    axios
      .post(process.env.REACT_APP_SERVER_URL + "/loan/apply", requestBody, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        // POST 요청 성공 시 처리
        console.log("대출 신청 성공:", response.data);
        // 여기서 필요한 후속 처리를 수행할 수 있습니다.
        navigate("/loan"); // 이동할 경로를 지정하여 페이지 이동
      })
      .catch((error) => {
        // POST 요청 실패 시 처리
        console.error("대출 신청 실패:", error);
        // 에러 처리를 할 수 있습니다.
      });
  };

  const [loanAmountList, setLoanAmountList] = useState([]);
  const [repaymentList, setRepaymentList] = useState([]);
  const [total_interestRate, setTotalInterestRate] = useState(0);
  const [total_repaymentAmount, setTotalRepaymentAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  return (
    <RootLayout header={true}>
      <Header left="back" title="대출 신청" right="blank" />

      <form className={classes.formContainer}>
        {loanInfo && (
          <div className={classes.initForm}>
            <p className={classes.interestRate}>
              이자율: <span>{loanInfo.interestRate}%</span>
            </p>
            <p className={classes.interestRate}>
              상환방법: <span>{loanInfo.paymentMethod}</span>
            </p>
          </div>
        )}
        <div className={classes.durationButtons}>
          <p>상환 기간 : </p>
          <button
            className={selectedDuration === 3 ? classes.selected : ""}
            onClick={(e) => {
              e.preventDefault();
              handleDurationSelect(3);
            }}
          >
            3개월
          </button>
          <button
            className={selectedDuration === 6 ? classes.selected : ""}
            onClick={(e) => {
              e.preventDefault();
              handleDurationSelect(6);
            }}
          >
            6개월
          </button>
          <button
            className={selectedDuration === 12 ? classes.selected : ""}
            onClick={(e) => {
              e.preventDefault();
              handleDurationSelect(12);
            }}
          >
            12개월
          </button>
        </div>
        <Input
          type="number"
          id="amount"
          name="amount"
          label="amount"
          placeholder="금액"
          required={true}
          onChange={amountChangeHandler}
          onBlur={amountBlurHandler}
          error={amountInputHasError}
          errorMessage="금액을 다시 입력해주세요."
        />
        {isCalError && (
          <p className={classes.errorMessage}>
            용돈에 비해 너무 높은 금액은 입력하면 계산되지 않습니다.
          </p>
        )}
        <Button3 onClick={handleCalculate}>계산하기</Button3>
        {calculatedAmount !== null && (
          <p>계산된 대출 금액: {calculatedAmount} 원</p>
        )}
        {loanAmountList.length > 0 && (
          <div className={classes.calcContainer}>
            <h2>대출 정보</h2>
            <p>
              총 이자: <span>{total_interestRate}</span> 원
            </p>
            <p>
              총 상환 금액: <span>{total_repaymentAmount}</span> 원
            </p>
            <h3>매달 아래와 같이 금액이 용돈에서 나갑니다</h3>
            <ul>
              <li className={classes.listHeader}>
                <span>회차</span>
                <span>이자 (원)</span>
                <span>상환금 (원)</span>
              </li>
              {loanAmountList.map((loanAmount, index) => (
                <li key={index} className={classes.listItem}>
                  <span>{index + 1}</span>
                  <span>{loanAmount}</span>
                  <span>{repaymentList[index]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={classes.input2}>
          <p>대출 이름 *</p>
          <Input
            type="text"
            id="loanName"
            name="loanName"
            label="loanName"
            placeholder="대출 이름을 적어주세요(10자 이내)"
            required={true}
            onChange={loanNameChangeHandler}
            onBlur={loanNameBlurHandler}
            error={loanNameInputHasError}
            errorMessage="대출 이름을 다시 입력해주세요."
          />
          <p>하고 싶은 말 *</p>
          <Input
            type="text"
            id="loanMsg"
            name="loanMsg"
            label="loanMsg"
            placeholder="메시지를 적어주세요 (20자 이내)"
            required={true}
            onChange={loanMsgChangeHandler}
            onBlur={loanMsgBlurHandler}
            error={loanMsgInputHasError}
            errorMessage="메시지를 다시 입력해주세요."
          />
        </div>
        {isApyError && (
          <p className={classes.errorMessage}>
            대출 이름과 메시지를 모두 입력해주세요.
          </p>
        )}
        <Button1 onClick={handleApply}>신청하기</Button1>
      </form>
    </RootLayout>
  );
};

export default ApplyForm;
