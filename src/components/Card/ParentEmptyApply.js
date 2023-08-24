import { useNavigate } from "react-router-dom";
import { RiInformationFill } from "react-icons/ri";
import { FaWallet, FaPercentage, FaCoins, FaMoneyCheck } from "react-icons/fa";
// import classes from "./Wallet.module.css";
import classes from "./EmptyApply.module.css";

const EmptyApply = (props) => {
  let emptyapplyColor = "";
  switch (props.color) {
    case "violet":
      emptyapplyColor = classes.violet;
      break;
    case "blue":
      emptyapplyColor = classes.blue;
      break;
    case "yellow":
      emptyapplyColor = classes.yellow;
      break;
    case "red1":
      emptyapplyColor = classes.red1;
      break;
    case "red2":
      emptyapplyColor = classes.red2;
      break;
    default:
      emptyapplyColor = classes.default;
  }

  return (
    <div className={`${classes.emptyapply} ${emptyapplyColor}`}>
      <div className={classes.firstRow}>
        <div className={classes.titleBox}>
          <p className={classes.title}>아이에게 신청받은 대출이 없어요</p>
        </div>
      </div>
      {/* <div className={classes.secondRow}>
        <button className={classes.walletButton} onClick={fillClickHandler}>
          <FaMoneyCheck size="32" fill="#f9f9f9" />
          <p>신청하기</p>
        </button>
      </div> */}
    </div>
  );
};

export default EmptyApply;
