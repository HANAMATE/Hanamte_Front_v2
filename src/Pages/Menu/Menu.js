import { NavLink } from "react-router-dom";
import classes from "./Menu.module.css";
import Boy from "../../assets/teenager-boy.png";
import Wallet from "../../assets/wallet-blue.png";
import Gear from "../../assets/gear-green.png";
import Phone from "../../assets/phone-red.png";
import Footer from "../../components/Layout/Footer";
import RootLayout from "../../components/Layout/RootLayout";

const Menu = (props) => {
  return (
    <RootLayout footer={true}>
      <div className={classes.container}>
        <div className={classes.profileContainer}>
          <img className={classes.picture} src={Boy} alt="profile" />
          <p className={classes.name}>{props.name}김민재</p>
        </div>
        <div className={classes.buttonContainer}>
          <button className={classes.menuButton}>
            <img className={classes.icon} src={Wallet} alt="icon" />
            <p>내 지갑</p>
          </button>
          <button className={classes.menuButton}>
            <img className={classes.icon} src={Gear} alt="icon" />
            <p>로그인 설정</p>
          </button>
          <button className={classes.menuButton}>
            <img className={classes.icon} src={Phone} alt="icon" />
            <p>고객센터</p>
          </button>
        </div>
        <div className={classes.linkContainer}>
          <p className={classes.title}>부자 활동</p>
          <NavLink>계획하기</NavLink>
          <NavLink>모으기</NavLink>
          <NavLink>쓰기</NavLink>
          <NavLink>불리기</NavLink>
          <NavLink>나누기</NavLink>
        </div>
        <div className={classes.linkContainer}>
          <p className={classes.title}>내 지갑</p>
          <NavLink>용돈 조회</NavLink>
          <NavLink>더치 페이</NavLink>
          <NavLink>보내기</NavLink>
          <NavLink>채우기</NavLink>
        </div>
        <div className={classes.linkContainer}>
          <p className={classes.title}>i 플레이</p>
          <NavLink>나의 퀴즈</NavLink>
          <NavLink>오늘의 기분</NavLink>
          <NavLink>미션</NavLink>
        </div>
        <div className={classes.appVersion}>앱 버전 정보</div>
      </div>
      <Footer />
    </RootLayout>
  );
};

export default Menu;
