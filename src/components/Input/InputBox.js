import classes from "./InputBox.module.css";

const InputBox = (props) => {
  const onChangeHandler = (event) => {
    props.onChange(event);
  };

  return (
    <div className={classes.inputBox}>
      {props.left}
      <input placeholder={props.placeholder} onChange={onChangeHandler} />
      {props.right}
    </div>
  );
};

export default InputBox;
