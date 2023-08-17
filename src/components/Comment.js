import classes from "./Comment.module.css";

const Comment = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.imageBox}>
        <img src={props.image} alt="profile" />
      </div>
      <div className={classes.commentBox}>
        <div className={classes.commentHeader}>
          <p className={classes.name}>{props.name}</p>
          <p className={classes.date}>{props.date}</p>
        </div>
        <p className={classes.content}>{props.content}</p>
      </div>
    </div>
  );
};

export default Comment;
