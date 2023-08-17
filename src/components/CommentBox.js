import { useState } from "react";

import Comment from "./Comment";
import classes from "./CommentBox.module.css";
import CommentNew from "./CommentNew";

import Profile01 from "../assets/profile01.png";
import Profile02 from "../assets/profile02.png";
import Profile03 from "../assets/profile03.png";
import Profile04 from "../assets/profile04.png";
import Profile05 from "../assets/profile05.png";

const DUMMY = [
  {
    id: 1,
    image: Profile01,
    name: "권민선",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque et diam sagittis vestibulum ac vitae nisl. Morbi lacinia eu urna a sollicitudin. Quisque felis velit, sollicitudin et placerat id, elementum eget odio. Curabitur vitae mi tortor. Nam eu venenatis libero, quis sagittis justo. Cras sed tortor in leo fringilla porttitor aliquam eu quam. Nulla id pharetra ante, id tincidunt sapien.",
    date: "3시간 전",
  },
  {
    id: 2,
    image: Profile02,
    name: "최안식",
    content: "두번째 댓글",
    date: "7시간 전",
  },
  {
    id: 3,
    image: Profile03,
    name: "김민재",
    content: "세번째 댓글",
    date: "1일 전",
  },
  {
    id: 4,
    image: Profile04,
    name: "강민경",
    content: "네번째 댓글",
    date: "2일 전",
  },
  {
    id: 5,
    image: Profile05,
    name: "민새미",
    content: "다섯번째 댓글",
    date: "2일 전",
  },
];

const CommentBox = (props) => {
  const moreThanThree = DUMMY.length > 3;
  const [showAllComments, setShowAllComments] = useState(false);

  const clickSeeMoreHandler = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className={classes.container}>
      {DUMMY.slice(0, 3).map((each) => (
        <Comment key={each.id} image={each.image} name={each.name} date={each.date} content={each.content} />
      ))}
      {showAllComments &&
        DUMMY.slice(3).map((each) => (
          <Comment key={each.id} image={each.image} name={each.name} date={each.date} content={each.content} />
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
