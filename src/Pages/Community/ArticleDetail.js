import { PiFinnTheHumanFill, PiFinnTheHumanDuotone, PiDotsThreeBold } from "react-icons/pi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";

import CommunityLayout from "../../components/Layout/CommunityLayout";
import Header from "../../components/Layout/Header";

import classes from "./ArticleDetail.module.css";

import DUMMY00 from "../../assets/DUMMY00.jpeg";
import Article from "./Article";

const ArticleDetail = (props) => {
  return (
    <CommunityLayout>
      <Header left="back" title="게시물" right="blank" />
      <Article image={DUMMY00} />
    </CommunityLayout>
  );
};

export default ArticleDetail;
