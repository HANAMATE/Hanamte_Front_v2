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
import DropDown from "../../components/DropDown";
import { doLikeRequest } from "../../apis/requests";
import React, { useState } from "react";

const Article = (props) => {
  const date = new Date(props.transaction.date);
  const [likes, setLikes] = useState(props.transaction.article?.like || 0);
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
  const clickLikeHandler = async () => {
    const requestBody = {
      articleId: props.transaction.article.articleId,
    };

    try {
      const response = await doLikeRequest(requestBody);

      if (response.data.state === 200) {
        // 좋아요 요청이 성공했을 때, 좋아요 수를 업데이트
        setLikes(response.data.data.likes);
        alert("좋아요 성공~", response);
      }
    } catch (error) {
      console.error("좋아요 실패!", error);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.titleBox}>
        <div className={classes.left}>
          <div className={classes.textBox}>
            <p className={classes.title}>
              {props.transaction.transactionMessage || "Nan"}
            </p>
            <div>
              <p className={classes.subTitle}>{formattedDate}</p>{" "}
              <p
                className={
                  props.transaction.type === "입금"
                    ? classes.red2
                    : classes.blue2
                }
              >
                {props.transaction.type === "입금"
                  ? `+${props.transaction.amount}`
                  : `-${props.transaction.amount}`}
                원
              </p>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          {
            <DropDown
              transaction={props.transaction}
              setIsNew={props.setIsNew}
            ></DropDown>
          }
        </div>
      </div>
      {props.transaction.article !== null ? (
        <div className={classes.container}>
          <Carousel showThumbs={false} className={classes.carouselContainer}>
            {props.transaction.article.imageUrl !== null
              ? props.transaction.article.imageUrl.map((image, index) => (
                  <div key={index}>
                    <img
                      className={classes.image}
                      src={image}
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                ))
              : null}
          </Carousel>
          <div className={classes.replyBox}>
            <div className={classes.replyHeader}>
              <div className={classes.left}>
                <HiOutlineChatBubbleOvalLeft size="24" />
                <div
                  className={classes.left}
                  onClick={() => {
                    clickLikeHandler();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <AiOutlineHeart size="24" />
                </div>
                {likes} {/* 좋아요 수 출력 */}
                <IoPaperPlaneOutline size="24" />
              </div>
              <MdBookmarkBorder size="24" />
            </div>
            <div className={classes.replyHeader}>
              <p>{props.transaction.article.content}</p>
            </div>
          </div>
          <CommentBox
            comment={props.transaction.article.commentList}
            articleId={props.transaction.article.articleId}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Article;
