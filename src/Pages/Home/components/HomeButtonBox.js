import classes from "./HomeButtonBox.module.css";
import HomeButton from "./HomeButton";
import { FaPray, FaWallet } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiBankFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HomeButtonBox = (props) => {
  const navigate = useNavigate();
  const allowanceClickHandler = () => {
    navigate("allowance");
  };
  const askClickHandler = () => {
    navigate("allowance/request");
  };
  const loanClickHandler = () => {
    navigate("loan");
  };
  const jointClickHandler = () => {
    navigate("community");
  };

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <HomeButton
          background="var(--violet2)"
          icon={<FaWallet size="32" />}
          title="직접 관리하는"
          subTitle="내 지갑!"
          onClick={allowanceClickHandler}
        />
        <HomeButton
          background="var(--blue4)"
          icon={<FaPray size="32" />}
          title="용돈 부족하면"
          subTitle="부탁해봐요!"
          onClick={askClickHandler}
        />
        <HomeButton
          background="var(--yellow2)"
          icon={<RiBankFill size="32" />}
          title="진행 중인"
          subTitle="대출이 없네요"
          onClick={loanClickHandler}
        />
        <HomeButton
          background="var(--red2)"
          icon={<BsFillPeopleFill size="32" />}
          title="친구들과"
          subTitle="다 함께!"
          onClick={jointClickHandler}
        />
      </div>
    </div>
  );
};

export default HomeButtonBox;
