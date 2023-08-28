// import { PiPaperPlaneRightFill } from "react-icons/pi";
import { LiaPaperPlane } from "react-icons/lia";
import { HiPlus } from "react-icons/hi";
import classes from "./CommentNew.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWriteComment } from "../../src/apis/requests"; // fetchWriteComment 경로를 실제 파일 경로로 수정해주세요
import { useNavigate } from "react-router-dom";

const CommentNew = (props) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const { loginId } = useSelector((state) => state.auth); // Redux에서 userId 가져오기

  const submitHandler = async (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      alert("댓글 내용을 입력해주세요!")
      // 입력값이 비어있는 경우 처리
      return;
    }
    try {
      const commentInfo = {
        articleId: props.articleId, // 댓글을 달 게시물 ID
        userId: loginId, // 로그인한 사용자의 ID
        content: inputValue, // 입력한 댓글 내용
      };
      const response = await fetchWriteComment(commentInfo); // POST 요청 보내기
      console.log(response)
      props.onCommentSubmit();
      // 필요한 처리를 수행하거나 메시지를 표시할 수 있음
    } catch (error) {
      console.error("댓글 작성 실패", error);
      
      // 에러 처리를 위한 코드를 추가할 수 있음
    }

    // 입력값 초기화
    setInputValue("");
    
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <HiPlus size="24" fill="#121212" />
        <div className={classes.inputBox}>
          <input
            name="comment"
            placeholder="댓글을 입력하세요."
            value={inputValue}
            onChange={inputChangeHandler}
          />
          {/* <button type="submit"> */}
          <button onClick={submitHandler}>
            <LiaPaperPlane size="24" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentNew;
