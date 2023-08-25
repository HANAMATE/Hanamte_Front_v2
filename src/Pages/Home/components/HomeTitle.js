import { Fragment } from "react";
import classes from "./HomeTitle.module.css";
import { useNavigate } from "react-router-dom";
import Button1 from "../../../components/Button/Button1";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";

const HomeTitle = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    navigate("/login");
  };

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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <p className={classes.firstText}>{props.name}</p>
              <p className={classes.secondText}>내 지갑 {props.balance}원</p>
            </div>
            <button onClick={onClickHandler}>로그아웃</button>
          </div>
        </header>
      )}
    </Fragment>
  );
};

export default HomeTitle;
