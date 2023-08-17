import { Fragment } from "react";
import classes from "./TransactionBox.module.css";

const TransactionBox = (props) => {
  return (
    <Fragment>
      <div className={classes.line} />
      {props.children}
    </Fragment>
  );
};

export default TransactionBox;
