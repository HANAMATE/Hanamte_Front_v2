import { BsCheckCircleFill } from "react-icons/bs";
import classes from "./RequestEnd.module.css";
import CardBasic from "../../../components/Card/CardBasic";
import Button2 from "../../../components/Button/Button2";
import { useNavigate, useLocation } from "react-router-dom";
import RootLayout from "../../../components/Layout/RootLayout";

const RequestEnd = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <RootLayout>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <BsCheckCircleFill className={classes.icon} size="96" fill="var(--violet3)" />
          <p className={classes.title}>조르기 요청 완료</p>
          <CardBasic>
            <div className={classes.card}>
              <p className={classes.name}>{location.state.name}</p>
              <p className={classes.amount}>{location.state.amount}원</p>
            </div>
          </CardBasic>
        </div>
        <div className={classes.buttonContainer}>
          <Button2 onClick={onClickHandler}>확인</Button2>
        </div>
      </div>
    </RootLayout>
  );
};

export default RequestEnd;
