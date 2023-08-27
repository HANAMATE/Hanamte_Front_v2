/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  PiFinnTheHumanFill,
  PiFinnTheHumanDuotone,
  PiDotsThreeBold,
} from "react-icons/pi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import { Carousel } from "react-responsive-carousel"; //캐로젤 추가
import "react-responsive-carousel/lib/styles/carousel.min.css"; //캐로젤 추가
import classes from "./Article.module.css";
import CommentBox from "../../components/CommentBox";

const Article = (props) => {
  const date = new Date(props.transaction.date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat("ko-KR", options);
  const formattedDate = dateFormatter.format(date);

  return (
    <div className={classes.container}>
      <div className={classes.titleBox}>
        <div className={classes.left}>
          {/* <PiFinnTheHumanDuotone size="24" /> */}
          <div className={classes.textBox}>
            <p className={classes.title}>
              {props.transaction.transactionMessage || "Nan"}
            </p>
            <div>
              <p className={classes.subTitle}>{formattedDate}</p>{" "}
              <p className={props.transaction.type === "입금"? classes.red2: classes.blue2}>
                {props.transaction.type === "입금"? `+${props.transaction.amount}`: `-${props.transaction.amount}`}원
              </p>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <PiDotsThreeBold size="24" />
        </div>
      </div>
      {props.transaction.article !== null ? (
          <div className={classes.container}>
          <Carousel showThumbs={false}>
            {props.transaction.article.imageUrl !== null ? (
              props.transaction.article.imageUrl.map((image, index) => (
                <div key={index}>
                  <img className={classes.image} src={image} alt={`Image ${index + 1}`}/>
                </div>
              ))
            ) : null}
          </Carousel>
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
      ) : null}
    </div>
  );
};

export default Article;
