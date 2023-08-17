import classes from "./AllowanceHistoryCard.module.css";
import LoveLetter from "../../assets/love-letter.png";

const AllowanceHistoryCard = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.titleBox}>
        <p>
          {props.name}
          <br />
          <strong>{Number(props.amount).toLocaleString()}원</strong>
        </p>
      </div>
      <div className={classes.iconBox}>
        <img src={LoveLetter} alt="love-letter" />
      </div>
    </div>
  );
};

export default AllowanceHistoryCard;
