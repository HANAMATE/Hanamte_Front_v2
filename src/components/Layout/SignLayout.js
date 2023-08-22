import classes from "./SignLyaout.module.css";
// import MainIcon from "../../assets/MainIcon.gif";
import MainIcon from "../../assets/Main2.png";


const SignLayout = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.iconContainer}>
        <img src={MainIcon} alt="mainIcon" />
      </div>
      {props.children}
    </div>
  );
};

export default SignLayout;
