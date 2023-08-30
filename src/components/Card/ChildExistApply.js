import { useNavigate } from "react-router-dom";
import { RiInformationFill } from "react-icons/ri";
import { FaWallet, FaPercentage, FaCoins, FaMoneyCheck } from "react-icons/fa";
// import classes from "./Wallet.module.css";
import ApproveBtn from "../Button/ApproveBtn";
import RefuseBtn from "../Button/RefuseBtn";
import classes from "./ExistApply.module.css";

const ExistApply = (props) => {
  let existapplyColor = "";
  switch (props.color) {
    case "violet":
      existapplyColor = classes.violet;
      break;
    case "blue":
      existapplyColor = classes.blue;
      break;
    case "yellow":
      existapplyColor = classes.yellow;
      break;
    case "red1":
      existapplyColor = classes.red1;
      break;
    case "red2":
      existapplyColor = classes.red2;
      break;
    default:
      existapplyColor = classes.default;
  }

  return (
    <div className={`${classes.existapply} ${existapplyColor}`}>
      <div className={classes.firstRow}>
        <div className={classes.titleBox}>
          <p className={classes.subTitle}>
            {props.valid
              ? "진행 중인 대출"
              : "대출 신청 결과를 기다리고 있어요!"}
          </p>
          <p className={classes.title}>
            대출명 : {props.loanName.toLocaleString()}
          </p>
          <p className={classes.title}>
            대출 금액 : {Number(props.loanAmount).toLocaleString()}원
          </p>
          <p className={classes.title}>메시지 : {props.loanMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ExistApply;
