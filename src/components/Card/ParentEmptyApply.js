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
    </div>
  );
};

export default EmptyApply;
