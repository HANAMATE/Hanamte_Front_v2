import React from "react";

import classes from "./Button1.module.css";

const Button1 = (props) => {
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

export default Button1;
