import classes from "./CommunityHeader.module.css";
import { FiChevronLeft } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CommunityHeader = (props) => {
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate("..");
  };

  return (
    <div className={classes.headerBox}>
      {props.left === "back" && <FiChevronLeft size="24" onClick={backClickHandler} />}
      {props.left === "blank" && <div className={classes.blank} />}
      <div className={classes.titleBox}>
        <p>{props.title}</p>
      </div>
      {props.right === "cancel" && <MdClear size="24" onClick={backClickHandler} />}
      {props.right === "blank" && <div className={classes.blank} />}
    </div>
  );
};

export default CommunityHeader;
