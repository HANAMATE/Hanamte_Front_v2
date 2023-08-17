import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let className = "";
  if (props.error) {
    className = `${classes["input-container"]} ${classes.invalid}`;
  } else {
    className = classes["input-container"];
  }

  return (
    <div className={className}>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        label={props.label}
        onChange={props.onChange}
        {...(props.value && { value: props.value })}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
      {props.error && (
        <p className={classes["error-message"]}>{props.errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
