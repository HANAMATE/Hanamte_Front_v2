import classes from "./RequestConfirm.module.css";
import LoveLetter from "../../../assets/love-letter.png";
import { useEffect, useState } from "react";
import Header from "../../../components/Layout/Header";
import Button2 from "../../../components/Button/Button2";
import InputBox from "../../../components/Input/InputBox";
import { useLocation, useNavigate } from "react-router-dom";
import LocaleStringToNumber from "../../../util/LocaleStringToNumber";
import RootLayout from "../../../components/Layout/RootLayout";
import { fetchRequestAllowance } from "../../../apis/requests";

const AskSend = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allowSendRequest, setAllowSendRequest] = useState(false);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    parentId: location.state.userId,
    allowanceAmount: LocaleStringToNumber(location.state.amount),
    requestDescription: message,
  });
  const onChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  async function requestAllowance() {
    try {
      const response = await fetchRequestAllowance(values);
      return response;
    } catch (error) {
      console.error("requestAllowance 실패", error);
    }
  }

  const onClickHandler = async (event) => {
    event.preventDefault();
    setValues((prevValues) => ({ ...prevValues, requestDescription: message }));
    setAllowSendRequest(true);

    const response = await requestAllowance();
    if (response.data.state === 200) {
      alert("용돈 조르기 요청에 성공했습니다.");
    } else {
      alert("용돈 조르기 요청에 실패했습니다.");
    }

    navigate("/allowance/history");
  };

  useEffect(() => {
    if (allowSendRequest) {
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
            <InputBox
              placeholder="하고 싶은 말을 적어봐요!"
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <Button2 onClick={onClickHandler}>용돈 조르기</Button2>
      </section>
    </RootLayout>
  );
};

export default AskSend;
