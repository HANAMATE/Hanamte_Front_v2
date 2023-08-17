import classes from "./HomeCard.module.css";

const HomeCard = (props) => {
  return (
    <div className={classes.homeCard}>
      <div className={classes.textBox}>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.description}>{props.description}</div>
      </div>
      <img className={classes.icon} src={props.icon} alt="icon" />
    </div>
  );
};

export default HomeCard;
