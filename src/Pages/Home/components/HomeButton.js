import classes from "./HomeButton.module.css";
import Arrow from "../../../assets/right-arrow-2.js";

const HomeButton = (props) => {
  return (
    <button className={`${classes.homeButton}`} style={{ background: props.background }} onClick={props.onClick}>
      <div className={classes.leftContainer}>
        <div className={classes.iconBox}>{props.icon}</div>
        <div className={classes.textBox}>
          <p className={classes.firstText}>{props.title}</p>
          <p className={classes.secondText}>{props.subTitle}</p>
        </div>
      </div>
      <div className={classes.iconContainer}>
        <Arrow />
      </div>
    </button>
  );
};

export default HomeButton;
