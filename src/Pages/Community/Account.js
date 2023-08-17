import { PiDotsThreeBold } from "react-icons/pi";
import { BsPersonPlus } from "react-icons/bs";
import classes from "./Account.module.css";
import Beach from "../../assets/beach.png";
//<BsPersonPlus size="16" stroke-width="0.2" />

import Profile01 from "../../assets/profile01.png";
import Profile02 from "../../assets/profile02.png";
import Profile03 from "../../assets/profile03.png";
import Profile04 from "../../assets/profile04.png";
import Profile05 from "../../assets/profile05.png";
import Profile06 from "../../assets/profile06.png";
import { Fragment } from "react";

const DUMMY_MEMBER = [
  { id: 1, profile: Profile01 },
  { id: 2, profile: Profile02 },
  { id: 3, profile: Profile03 },
  { id: 4, profile: Profile04 },
  { id: 5, profile: Profile05 },
  { id: 6, profile: Profile06 },
];

const Account = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.imageBox}>
          <img className={classes.image} src={Beach} alt="Beach" />
        </div>
        <div className={classes.textBox}>
          <div className={classes.upperBox}>
            <p className={classes.amount}>128,000원</p>
            <PiDotsThreeBold size="32" />
          </div>
          <div className={classes.lowerBox}>
            <button>입금</button>
            <button>출금</button>
            <button>초대</button>
          </div>
        </div>
      </div>
      <div className={classes.faceBox}>
        {DUMMY_MEMBER.map((each) => (
          <img key={each.id} src={each.profile} alt="profile" />
        ))}
      </div>
    </Fragment>
  );
};

export default Account;
