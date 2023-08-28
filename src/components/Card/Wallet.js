import { useNavigate } from "react-router-dom";
import { RiInformationFill } from "react-icons/ri";
import { FaWallet, FaPercentage, FaCoins, FaMoneyCheck } from "react-icons/fa";
import classes from "./Wallet.module.css";
import { fetchBalance, getMyAccount } from "../../apis/requests";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useEffect } from "react";

const Wallet = (props) => {
  const { loginId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const walletClickHandler = () => {
    navigate("history");
  };

  async function getAccountInfo() {
    try {
      const response = await getMyAccount();
      if (response.data.state === 200) {
        dispatch(
          authActions.setAccountBalance({
            accountBalance: response.data.data.balance,
          })
        );
      }
      return response;
    } catch (error) {
      console.error("getBalance 실패", error);
    }
  }

  const fillClickHandler = async () => {
    const response = await getAccountInfo();

    if (response.data.state === 200) {
      navigate("fill");
    } else {
      alert("연결된 계좌가 없습니다.");
    }
  };

  useEffect(() => {
    async function getbalance() {
      try {
        const response = await fetchBalance({ userId: loginId });
        dispatch(
          authActions.setBalance({
            balance: response.data.data.balance,
          })
        );
      } catch (error) {
        console.error("getBalance 실패", error);
      }
    }
    getbalance();
  }, []);

  let walletColor = "";
  switch (props.color) {
    case "violet":
      walletColor = classes.violet;
      break;
    case "blue":
      walletColor = classes.blue;
      break;
    case "yellow":
      walletColor = classes.yellow;
      break;
    case "red1":
      walletColor = classes.red1;
      break;
    case "red2":
      walletColor = classes.red2;
      break;
    default:
      walletColor = classes.default;
  }

  return (
    <div className={`${classes.wallet} ${walletColor}`}>
      <div className={classes.firstRow}>
        <div className={classes.titleBox}>
          <p className={classes.subTitle}>남은 용돈</p>
          <p className={classes.title}>
            {Number(props.balance).toLocaleString()}원
          </p>
        </div>
        <div className={classes.iconBox}>
          <RiInformationFill fill="#f9f9f9" />
        </div>
      </div>
      <div className={classes.secondRow}>
        <button className={classes.walletButton} onClick={walletClickHandler}>
          <FaWallet size="32" fill="#f9f9f9" />
          <p>용돈 조회</p>
        </button>
        <button className={classes.walletButton}>
          <FaPercentage size="32" fill="#f9f9f9" />
          <p>더치페이</p>
        </button>
        <button className={classes.walletButton}>
          <FaCoins size="32" fill="#f9f9f9" />
          <p>보내기</p>
        </button>
        <button className={classes.walletButton} onClick={fillClickHandler}>
          <FaMoneyCheck size="32" fill="#f9f9f9" />
          <p>채우기</p>
        </button>
      </div>
    </div>
  );
};

export default Wallet;
