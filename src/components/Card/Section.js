import { FiChevronRight } from "react-icons/fi";
import classes from "./Section.module.css";

const Section = (props) => {
  const titleClass = props.community ? classes.community : classes.notCommunity;
  let seeMoreColor = "";
  switch (props.seeMoreColor) {
    case "violet":
      seeMoreColor = classes.violet;
      break;
    case "blue":
      seeMoreColor = classes.blue;
      break;
    case "yellow":
      seeMoreColor = classes.yellow;
      break;
    case "red":
      seeMoreColor = classes.red;
      break;
    default:
      seeMoreColor = classes.default;
  }

  return (
    <div className={classes.container}>
      <div className={`${classes.titleBox} ${titleClass}`}>
        <p className={classes.title}>{props.title}</p>
        {props.seeMore && (
          <button className={classes.seeMore}>
            <p className={`${classes.seeMoreText} ${seeMoreColor}`}>{props.seeMoreText}</p>
            {/* <FiChevronRight size="1.2rem" /> */}
          </button>
        )}
      </div>
      {props.children}

      <div className={classes.contentBox}>
        {props.alert && (
          <div className={classes.alertBox}>
            느낌표
            <p className={classes.alertMessage}>아직 활동이 없네요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
