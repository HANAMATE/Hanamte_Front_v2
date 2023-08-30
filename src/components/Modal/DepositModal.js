import React from "react";
import Modal from "./Modal";
import styled from "styled-components";
import classes2 from "../../Pages/Loan/ApplyForm.module.css";
import Button from "../Button/Button1";
import useInput from "../../hooks/use-input";
import Input from "../Input/Input";
import { useSelector } from "react-redux";
import { transferRequest } from "../../apis/requests";
import { useNavigate } from "react-router-dom";

const validateAmountValue = (parameter) => {
  return /^[0-9]{0,10}$/.test(parameter);
};
const validateMessageValue = (parameter) => {
  return /^[a-zA-Z가-힣0-9]{0,10}$/.test(parameter);
};
function DepositModal({ onClose, moimWalletId, setIsNew }) {
  const { myWalletId } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //입금할 금액
  const {
    value: amountValue,
    isValid: amountValueIsValid,
    hasError: amountValueInputHasError,
    valueChangeHandler: amountValueChangeHandler,
    inputBlurHandler: amountValueHandler,
  } = useInput(validateAmountValue);

  //입금할떄 쓸 메시지
  const {
    value: messageValue,
    isValid: messageValueIsValid,
    hasError: messageValueInputHasError,
    valueChangeHandler: messageValueChangeHandler,
    inputBlurHandler: messageValueHandler,
  } = useInput(validateMessageValue);

  //입금 클릭시 이벤트
  const doDepositToMoimWalletHandler = async () => {
    console.log("입금시도!" + amountValue);
    console.log("입금시도! 내지갑 번호 " + myWalletId);
    console.log("moimwallet id = " + moimWalletId);
    console.log(messageValue);

    const requestBody = {
      sendWalletId: myWalletId.length === 0 ? null : myWalletId,
      receiveWalletId: moimWalletId.length === 0 ? null : moimWalletId,
      amount: amountValue.length === 0 ? null : amountValue,
      message: messageValue.length === 0 ? null : messageValue,
    };
    try {
      const response = await transferRequest(requestBody);
      if (response.data.state === 200) {
        console.log("모임통장으로 입금 성공 : ", response);
        alert("입금에 성공했습니다!");
        setIsNew((prev) => !prev);
        onClose();
        // navigate("/community", { state: { moimWalletId } });
      } else {
        const errorMessages = response.data.error
          .map((error) => error.message)
          .join("\n");
        if (errorMessages.length !== 0)
          alert("모임통장 입금 실패\n사유 : " + errorMessages);
        else alert("모임통장 입금 실패\n사유 : " + response.data.message);
        console.error("모임통장으로 입금 실패! : ", response.data);
      }
    } catch (error) {
      alert("모임통장 입금 실패\n사유 c: " + error);
      console.log(error);
      console.error("모임통장으로 입금 실패! (c) : ", error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={classes2.input2}>
        <p>모임통장에 입급할 금액</p>
        <Input
          type="text"
          placeholder="모임통장에 입금할 금액을 입력해주세요"
          required={true}
          onChange={amountValueChangeHandler}
          onBlur={amountValueHandler}
          error={amountValueInputHasError}
          errorMessage="입금할 금액을 다시 입력해주세요.(숫자만)"
        />
      </div>
      <div className={classes2.input2}>
        <p>거래내역에 남길 메시지</p>
        <Input
          type="text"
          placeholder="메시지를 입력하지 않으면 입금자의 이름이 입력됩니다."
          required={true}
          onChange={messageValueChangeHandler}
          onBlur={messageValueHandler}
          error={messageValueInputHasError}
          errorMessage="입금할 금액을 다시 입력해주세요.(숫자만)"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={doDepositToMoimWalletHandler}>입금</Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}

export default DepositModal;
