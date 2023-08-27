import { Fragment } from "react";
import classes from "./TransactionLoan.module.css";

const TransactionLoan = (props) => {
  const color = props.type === "입금" ? classes.in : classes.out;

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.dateBox}>{props.dateBox}</div>
        <div className={classes.descriptionBox}>
          <p className={classes.title}>{props.title}</p>
          
        </div>
        <div className={classes.amountBox}>
          <p className={`${classes.change} ${color} `}>{props.change}</p>
          <p className={classes.remain}>{props.remain}</p>
          <p className={classes.subTitle}>{props.subTitle}</p>
        </div>
      </div>
      <div className={classes.line} />
    </Fragment>
  );
};

export default TransactionLoan;