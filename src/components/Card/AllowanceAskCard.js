import { useNavigate } from "react-router-dom";
import classes from "./AllowanceAskCard.module.css";
import { HiPlusCircle } from "react-icons/hi";

const AllowanceAskCard = (props) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/allowance/request");
  };

  return (
    <div className={classes.container} onClick={clickHandler}>
      <div className={classes.remainingTime}>
        <p className={classes.remainingMessage}>
          용돈을 <strong>{props.remainingTime}</strong>번<br />
          요청할 수 있어요
        </p>
        <HiPlusCircle className={classes.icon} size="48" fill="#6527be" />
      </div>
    </div>
  );
};

export default AllowanceAskCard;
