import React from "react";

import classes from "./RefuseBtn.module.css";

const RefuseBtn = (props) => {
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

export default RefuseBtn;
