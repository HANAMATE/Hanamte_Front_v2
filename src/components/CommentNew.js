// import { PiPaperPlaneRightFill } from "react-icons/pi";
import { LiaPaperPlane } from "react-icons/lia";
import { HiPlus } from "react-icons/hi";
import classes from "./CommentNew.module.css";
import { useState } from "react";

const CommentNew = (props) => {
  const [inputValue, setInputValue] = useState("");

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <HiPlus size="24" fill="#121212" />
        <div className={classes.inputBox}>
          <input name="comment" placeholder="댓글을 입력하세요." value={inputValue} onChange={inputChangeHandler} />
          {/* <PiPaperPlaneRightFill size="24" /> */}
          <button type="submit">
            <LiaPaperPlane size="24" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentNew;
