import React from "react";

import classes from "./Button2.module.css";

const Button2 = (props) => {
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

export default Button2;
