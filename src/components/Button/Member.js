import { FaStar } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import classes from "./Member.module.css";

const Member = (props) => {
  return (
    <button className={classes.member}>
      <div className={classes.profile}>
        <AiOutlineUser size="40" />
        <div className={classes.namePhone}>
          <p className={classes.name}>{props.name}</p>
          <p className={classes.phone}>{props.phone}</p>
        </div>
      </div>
      {props.starred && <FaStar fill="var(--yellow1)" size="16" />}
      {!props.starred && <FaStar fill="#aaa" size="16" />}
    </button>
  );
};

export default Member;
