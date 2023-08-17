import { PiFinnTheHumanFill, PiFinnTheHumanDuotone, PiDotsThreeBold } from "react-icons/pi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";

import classes from "./Article.module.css";
import CommentBox from "../../components/CommentBox";

const Article = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.titleBox}>
        <div className={classes.left}>
          {/* <PiFinnTheHumanDuotone size="24" /> */}
          <div className={classes.textBox}>
            <p className={classes.title}>곤트란쉐리에 성수점</p>
            <div>
              <p className={classes.subTitle}>2023년 8월 7일 월요일 오후 2시 31분</p>{" "}
              <p className={classes.blue2}>-32,000원</p>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <PiDotsThreeBold size="24" />
        </div>
      </div>
      <img className={classes.image} src={props.image} alt="DUMMY00" />
      <div className={classes.replyBox}>
        <div className={classes.replyHeader}>
          <div className={classes.left}>
            <HiOutlineChatBubbleOvalLeft size="24" />
            <AiOutlineHeart size="24" />
            <IoPaperPlaneOutline size="24" />
          </div>
          <MdBookmarkBorder size="24" />
        </div>
        <div className={classes.replyHeader}>
          <p>시럽은 신중하게 뿌리는 편 🥞</p>
        </div>
        <div className={classes.reply}>
          <p className={classes.name}>happy._.ej</p>
          <p className={classes.content}>이영지 뷔스티에 보라색양말 내꺼</p>
        </div>
        <div className={classes.reply}>
          <p className={classes.name}>happy._.ej</p>
          <p className={classes.content}>김미미 악세사리 다 내꺼내꺼</p>
        </div>
      </div>
      <CommentBox />
    </div>
  );
};

export default Article;
