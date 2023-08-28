import { useState } from "react";

import Comment from "./Comment";
import classes from "./CommentBox.module.css";
import CommentNew from "./CommentNew";

function getTimeDifferenceString(timestamp) {
  const now = new Date();
  const targetTime = new Date(timestamp);
  const timeDifference = now - targetTime;

  if (timeDifference < 60000) { // Less than 1 minute
    return `${Math.floor(timeDifference / 1000)}초 전`;
  } else if (timeDifference < 3600000) { // Less than 1 hour
    return `${Math.floor(timeDifference / 60000)}분 전`;
  } else if (timeDifference < 86400000) { // Less than 1 day
    return `${Math.floor(timeDifference / 3600000)}시간 전`;
  } else if (timeDifference < 604800000) { // Less than 1 week
    return `${Math.floor(timeDifference / 86400000)}일 전`;
  } else if (timeDifference < 1209600000) { // Less than 2 weeks
    return `${Math.floor(timeDifference / 604800000)}주 전`;
  } else { // 2 weeks or more
    const options = { year: "numeric", month: "long", day: "numeric" };
    return targetTime.toLocaleDateString("ko-KR", options);
  }
}
const CommentBox = (props) => {
  const DUMMY = props.comment;
  const moreThanThree = DUMMY.length > 3;
  const [showAllComments, setShowAllComments] = useState(false);

  const clickSeeMoreHandler = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className={classes.container}>
      {DUMMY.slice(0, 3).map((each) => (
        <Comment key={each.id} image={each.image} name={each.writerName} date={getTimeDifferenceString(each.createDate)} content={each.commentContent} />
      ))}
      {showAllComments &&
        DUMMY.slice(3).map((each) => (
          <Comment key={each.id} image={each.image} name={each.writerName} date={getTimeDifferenceString(each.createDate)} content={each.commentContent} />
        ))}
      {moreThanThree && (
        <button className={classes.seeMore} onClick={clickSeeMoreHandler}>
          {showAllComments ? "댓글 닫기" : "댓글 전체보기"}
        </button>
      )}
      <CommentNew />
    </div>
  );
};

export default CommentBox;
