import React from "react";
import Modal from "./Modal";
import styled from "styled-components";
import classes2 from "../../Pages/Loan/ApplyForm.module.css";
import Button from "../Button/Button1";
import useInput from "../../hooks/use-input";
import Input from "../Input/Input";
import { transferRequest } from "../../apis/requests";
import { useNavigate } from "react-router-dom";

const validateAmountValue = (parameter) => {
  return /^[0-9]{0,10}$/.test(parameter);
};
const validateMessageValue = (parameter) => {
  return /^[a-zA-Z가-힣0-9]{0,9}$/.test(parameter);
};
function DepositModal({ onClose, moimWalletId, setIsNew }) {
  const navigate = useNavigate();

  //송금할 지갑번호
  const {
    value: targetWalletId,
    isValid: walletNumIsValid,
    hasError: awalletNumInputHasError,
    valueChangeHandler: walletNumChangeHandler,
    inputBlurHandler: targetWalletIdBlurHandler,
  } = useInput(validateAmountValue);

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
    console.log("송금시도!" + amountValue);
    console.log("송금시도! 내지갑 번호 " + targetWalletId);
    console.log("송금 moimwallet id = " + moimWalletId);
    console.log(messageValue);
    // Check if walletNumIsValid is false
    if (!walletNumIsValid) {
      alert("송금 대상 지갑번호가 유효하지 않습니다.");
      return;
    }

    // Check if amountValueIsValid is false
    if (!amountValueIsValid) {
      alert("송금할 금액이 유효하지 않습니다.");
      return;
    }

    // Check if messageValueIsValid is false
    if (!messageValueIsValid) {
      alert("거래내역에 남길 메시지가 유효하지 않습니다.");
      return;
    }

    const requestBody = {
      sendWalletId: moimWalletId.length === 0 ? null : moimWalletId,
      receiveWalletId: targetWalletId.length === 0 ? null : targetWalletId,
      amount: amountValue.length === 0 ? null : amountValue,
      message: messageValue.length === 0 ? null : messageValue,
    };
    try {
      const response = await transferRequest(requestBody);
      if (response.data.state === 200) {
        console.log("모임통장에서 송금 성공 : ", response);
        alert("송금에 성공했습니다!");
        setIsNew((prev) => !prev);
        onClose();
        // navigate("/community", { state: { moimWalletId } });
      } else {
        alert("모임통장 송금 실패\n사유 c: " + response.data);
        console.error("모임통장으로 송금 실패! : ", response.data);
        onClose();
      }
    } catch (error) {
      alert("모임통장 송금에 실패했습니다.");
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={classes2.input2}>
        <p>송금 대상 지갑번호</p>
        <Input
          type="text"
          placeholder="송금 대상 지갑번호를 입력해주세요."
          required={true}
          onChange={walletNumChangeHandler}
          onBlur={targetWalletIdBlurHandler}
          error={awalletNumInputHasError}
          errorMessage="송금 대상 지갑번호를 입력해주세요.(숫자만)"
        />
      </div>
      <div className={classes2.input2}>
        <p>모임통장에서 송금할 금액</p>
        <Input
          type="text"
          placeholder="송금할 금액을 입력해주세요"
          required={true}
          onChange={amountValueChangeHandler}
          onBlur={amountValueHandler}
          error={amountValueInputHasError}
          errorMessage="송금할 금액을 다시 입력해주세요.(숫자만)"
        />
      </div>
      <div className={classes2.input2}>
        <p>거래내역에 남길 메시지</p>
        <Input
          type="text"
          placeholder="메시지를 입력하지 않으면 해당 모임통장의 이름입력됩니다."
          required={true}
          onChange={messageValueChangeHandler}
          onBlur={messageValueHandler}
          error={messageValueInputHasError}
          errorMessage="메시지를 다시 입력해주세요.(알파벳,한글,숫자만)"
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
