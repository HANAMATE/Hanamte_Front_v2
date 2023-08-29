import React from "react";

import classes from "./ApproveBtn.module.css";

const ApproveBtn = (props) => {
  return (
    <button
      className={classes.signButton}
      type={props.type || "submit"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default ApproveBtn;
