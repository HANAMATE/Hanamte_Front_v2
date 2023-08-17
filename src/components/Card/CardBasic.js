import classes from "./CardBasic.module.css";

const CardBasic = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default CardBasic;
