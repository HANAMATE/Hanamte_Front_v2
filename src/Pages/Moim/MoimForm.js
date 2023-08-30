import { Fragment, useState, useEffect } from "react";
import RootLayout from "../../components/Layout/RootLayout";
import classes from "../Moim/MoimForm.module.css";
import Header from "../../components/Layout/Header";
import useInput from "../../hooks/use-input";
import Input from "../../components/Input/Input";
import classes2 from "../Loan/ApplyForm.module.css";
import Button1 from "../../components/Button/Button1";
import { createMoimWalletRequest, putMoimRequest } from "../../apis/requests";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation 추가
import { useSelector } from "react-redux";

const MoimForm = (props) => {
  const validateMoimName = (parameter) => {
    return /^[a-zA-Z가-힣0-9]{1,10}$/.test(parameter);
  };
  const validateMoimTarget = (parameter) => {
    return /^[0-9]{0,10}$/.test(parameter);
  };
  const location = useLocation();
  const { moim } = location.state;

  //모임 통장 이름
  const {
    value: moimNameValue,
    isValid: moimNameeIsValid,
    hasError: moimNameInputHasError,
    valueChangeHandler: moimNameChangeHandler,
    inputBlurHandler: moimNameBlurHandler,
  } = useInput(validateMoimName, moim !== null ? moim.walletName : "");

  //모임 통장 목표 금액
  const {
    value: moimTargetValue,
    isValid: moimTargetIsValid,
    hasError: moimTargetHasError,
    valueChangeHandler: moimTargetChangeHandler,
    inputBlurHandler: moimTargetBlurHandler,
  } = useInput(
    validateMoimTarget,
    moim !== null ? moim.targetAmount.toString() : ""
  );

  const navigate = useNavigate();

  const updateMoimWalletClick = async () => {
    const requestBody = {
      moimWalletId: moim.walletId,
      walletName: moimNameValue,
      targetAmount: moimTargetValue,
    };
    console.log(moim.walletId);
    console.log(moimNameValue);
    console.log(moimTargetValue);
    try {
      const response = await putMoimRequest(requestBody);
      console.log("수정 성공! : ", response);
      navigate("/moim");
    } catch (error) {
      console.error("모임통장 수정 실패! : ", error);
      console.error("모임통장 수정에 실패했습니다!");
    }
  };

  const createMoimWallet = async () => {
    const requestBody = {
      walletName: moimNameValue,
      targetAmount: moimTargetValue,
    };
    console.log(moimNameValue);
    console.log(moimTargetValue);
    try {
      const response = await createMoimWalletRequest(requestBody);
      console.log("개설 성공! : ", response);
      navigate("/moim");
    } catch (error) {
      console.error("모임통장 개설 실패! : ", error);
      console.error("모임통장 개설에 실패했습니다!");
    }
  };

  return (
    <RootLayout header={true}>
      <Header left="back" title={"모임통장 만들기"} right="blank" />
      <div className={classes.container}>
        <div className={classes.homeCard}>
          <div
            style={{
              width: "100%",
              height: "100%",
              paddingTop: "40px",
              textAlign: "center",
              color: "black",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            <br></br>
            <div className={classes2.input2}>
              <p>모임통장 이름</p>
              <Input
                type="text"
                placeholder="모임통장 이름을 적어주세요(10자 이내)"
                required={true}
                value={moim !== null ? moimNameValue : ""} // 3항 연산자 사용
                onChange={moimNameChangeHandler}
                onBlur={moimNameBlurHandler}
                error={moimNameInputHasError}
                errorMessage="모임통장 이름을 다시 입력해주세요."
              />
              <p>목표 금액</p>
              <Input
                type="text"
                placeholder="목표 금액을 적어주세요(10자 이내)"
                required={true}
                value={moim !== null ? moimTargetValue : ""} // 3항 연산자 사용
                onChange={moimTargetChangeHandler}
                onBlur={moimTargetBlurHandler}
                error={moimTargetHasError}
                errorMessage="목표 금액을 다시 입력해주세요.(숫자만 입력)"
              />
            </div>
            {moim !== null ? (
              <Button1 onClick={() => updateMoimWalletClick()}>
                수정하기
              </Button1>
            ) : (
              <Button1 onClick={() => createMoimWallet()}>개설하기</Button1>
            )}{" "}
          </div>
        </div>
        <div className={classes.inputContainer}></div>
      </div>
    </RootLayout>
  );
};
export default MoimForm;
