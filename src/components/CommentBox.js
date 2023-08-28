import { useEffect, useState } from "react";

import Comment from "./Comment";
import classes from "./CommentBox.module.css";
import CommentNew from "./CommentNew";
import {getArticleDetail} from "../../src/apis/requests";
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
  // let DUMMY = props.comment;
  const [showAllComments, setShowAllComments] = useState(false);
  const [comments, setComments] = useState(props.comment); // 댓글 목록 상태 추가
  const moreThanThree = comments.length > 3;
  const clickSeeMoreHandler = () => {
    setShowAllComments(!showAllComments);
  };

  async function onCommentSubmit(){
    try {
      const response = await getArticleDetail({articleId: props.articleId}); // 서버로부터 업데이트된 댓글 목록을 받아옴
      console.log(props.articleId)
      const updatedComments = response.data.data.commentList; // 업데이트된 댓글 목록
      // props.comment = updatedComments;
      console.log("onCommentSubmit 호출")
      console.log(response)
      setComments(updatedComments);
      if(updatedComments.length>3){
        moreThanThree = true;
      }
      // this.forceUpdate();
    } catch (error) {
      console.error("댓글 추가 후 재랜더링 실패", error);
    }
  };

  return (
    <div className={classes.container}>
      {comments.slice(0, 3).map((each) => (
        <Comment key={each.commentId} image={each.image} name={each.writerName} date={getTimeDifferenceString(each.createDate)} content={each.commentContent} />
      ))}
      {showAllComments &&
        comments.slice(3).map((each) => (
          <Comment key={each.commentId} image={each.image} name={each.writerName} date={getTimeDifferenceString(each.createDate)} content={each.commentContent} />
        ))}
      {comments.length > 3 && (
        <button className={classes.seeMore} onClick={clickSeeMoreHandler}>
          {showAllComments ? "댓글 닫기" : "댓글 전체보기"}
        </button>
      )}
      <CommentNew
        articleId={props.articleId}
        onCommentSubmit ={onCommentSubmit}
      />    </div>
  );
};

export default CommentBox;
