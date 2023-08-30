import classes from "./HomeCard.module.css";

const HomeCard = (props) => {
  const cardStyle = props.bgcolor ? { backgroundImage: props.bgcolor } : {};
  const titleStyle = props.tcolor ? { color: props.tcolor } : {};
  const descriptionStyle = props.dcolor ? { color: props.dcolor } : {};
  return (
    <div className={classes.homeCard} style={cardStyle}>
      <div className={classes.textBox}>
        <div className={classes.title} style={titleStyle}>
          {props.title}
        </div>
        <div className={classes.description} style={descriptionStyle}>
          {props.description}
        </div>
      </div>
      <img className={classes.icon} src={props.icon} alt="icon" />
    </div>
  );
};

export default HomeCard;
