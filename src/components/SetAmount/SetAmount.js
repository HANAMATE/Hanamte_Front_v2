import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

import Header from "../Layout/Header";
import Button1 from "../Button/Button1";
import classes from "./SetAmount.module.css";
import { fetchPostAccount } from "../../apis/requests";

const SetAmount = (props) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("0");

  const plusMath = (number) => {
    if (Number(amount) + number >= Number(props.balance)) {
      setAmount(props.balance);
    } else {
      setAmount(String(Number(amount) + number));
    }
  };
  const addNumber = (number) => {
    if (Number(amount + number) >= Number(props.balance)) {
      setAmount(props.balance);
    } else {
      setAmount((prevPhoneNumber) => prevPhoneNumber + number);
    }
  };
  const deleteNumber = () => {
    setAmount((prevPhoneNumber) => prevPhoneNumber.slice(0, -1));
  };
  async function postAccount() {
    try {
      const response = await fetchPostAccount({ amount: amount });
      return response;
    } catch (error) {
      console.error("postAccount 실패", error);
    }
  }
  const onClickHandler = async () => {
    const res = await postAccount();
    if (res.data.state === 200) {
      alert("가져오기 성공했습니다.");
    } else {
      alert("가져오기 실패했습니다.");
    }
    navigate("/allowance");
  };

  return (
    <Fragment>
      <Header left="back" title={props.title} right="blank" />
      <div className={classes.container}>
        <section className={classes.firstSection}>
          <h1>{props.message}</h1>
          <div className={classes.number}>
            <p>
              <strong>
                {amount === "" ? "0" : Number(amount).toLocaleString()}
              </strong>
              원
            </p>
          </div>
          {props.subMessage && (
            <p className={classes.subMessage}>
              {props.subMessage} {Number(props.balance).toLocaleString()}원
            </p>
          )}
        </section>
        <section className={classes.secondSection}>
          <div className={classes.buttonContainer}>
            <div onClick={() => plusMath(100)}>+ 백원</div>
            <div onClick={() => plusMath(1000)}>+ 천원</div>
            <div onClick={() => plusMath(10000)}>+ 만원</div>
          </div>
          <div className={classes.numberContainer}>
            <div onClick={() => addNumber("1")}>1</div>
            <div onClick={() => addNumber("2")}>2</div>
            <div onClick={() => addNumber("3")}>3</div>
            <div onClick={() => addNumber("4")}>4</div>
            <div onClick={() => addNumber("5")}>5</div>
            <div onClick={() => addNumber("6")}>6</div>
            <div onClick={() => addNumber("7")}>7</div>
            <div onClick={() => addNumber("8")}>8</div>
            <div onClick={() => addNumber("9")}>9</div>
            <div onClick={() => addNumber("00")}>00</div>
            <div onClick={() => addNumber("0")}>0</div>
            <div onClick={deleteNumber}>
              <AiOutlineArrowLeft />
            </div>
          </div>
          <div className={classes.nextContainer}>
            <Button1 onClick={onClickHandler}>{props.buttonMessage}</Button1>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default SetAmount;
