import classes from "./RequestConfirm.module.css";
import LoveLetter from "../../../assets/love-letter.png";
import { Fragment, useEffect, useState } from "react";
import Header from "../../../components/Layout/Header";
import Button2 from "../../../components/Button/Button2";
import InputBox from "../../../components/Input/InputBox";
import Footer from "../../../components/Layout/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import LocaleStringToNumber from "../../../util/LocaleStringToNumber";
import axios from "axios";
import RootLayout from "../../../components/Layout/RootLayout";

const AskSend = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allowSendRequest, setAllowSendRequest] = useState(false);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    id: location.state.id,
    amount: LocaleStringToNumber(location.state.amount),
    message: message,
  });
  const onChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const onClickHandler = (event) => {
    event.preventDefault();
    setValues((prevValues) => ({ ...prevValues, message: message }));
    setAllowSendRequest(true);
  };

  useEffect(() => {
    if (allowSendRequest) {
      axios.defaults.withCredentials = true;
      navigate("/allowance/request/end", {
        state: { name: location.state.name, amount: location.state.amount },
      });
    }
  }, [values, allowSendRequest, navigate, location.state]);

  return (
    <RootLayout header={true}>
      <Header left="back" title="용돈 조르기" right="cancel" />
      <section className={classes.firstSection}>
        <div className={classes.upper}>
          <p className={classes.title}>
            <strong>{location.state.name}</strong>님에게
            <br />
            <strong>{location.state.amount}</strong>원을 요청할게요
          </p>
          <p className={classes.subTitle}>추가 메시지를 입력해 줄래요?</p>
          <div className={classes.card}>
            <div className={classes.imageBox}>
              <img src={LoveLetter} alt="love-letter" />
            </div>
            <InputBox placeholder="하고 싶은 말을 적어봐요!" onChange={onChangeHandler} />
          </div>
        </div>
        <Button2 onClick={onClickHandler}>조르기 20번 남았어요</Button2>
      </section>
    </RootLayout>
  );
};

export default AskSend;
