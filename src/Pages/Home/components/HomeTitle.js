import { Fragment } from "react";
import classes from "./HomeTitle.module.css";
import { useNavigate } from "react-router-dom";

const HomeTitle = (props) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {!props.isAuthenticated ? (
        <header
          className={`${classes.startTitle} ${classes.homeHeader}`}
          onClick={() => navigate("/login")}
        >
          <p className={classes.startMessage}>지금 바로</p>
          <p className={classes.startMessage}>하나메이트 시작하기</p>
        </header>
      ) : (
        <header className={`${classes.headerButton} ${classes.homeHeader}`}>
          <p className={classes.firstText}>{props.name}</p>
          <p className={classes.secondText}>내 지갑 {props.balance}원</p>
        </header>
      )}
    </Fragment>
  );
};

export default HomeTitle;
