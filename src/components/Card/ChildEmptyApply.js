import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

import classes from "./EmptyApply.module.css";

const EmptyApply = (props) => {
  const navigate = useNavigate();

  const fillClickHandler = () => {
    navigate("applyForm");
  };
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
          <p className={classes.title}>돈이 필요하면 대출을 요청해봐요 </p>
          <p className={classes.subTitle}>
            (이전 신청이 거부되거나 없을 경우 대출 신청을 할 수 있습니다~)
          </p>
          <div className={classes.secondRow}>
            <button className={classes.applyButton} onClick={fillClickHandler}>
              <FaPlusCircle size="36" fill="#f9f9f9" />
              <p>요청하기</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyApply;
