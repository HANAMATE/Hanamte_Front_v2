import { PiDotsThreeBold } from "react-icons/pi";
import { BsPersonPlus } from "react-icons/bs";
import classes from "./Account.module.css";
import Beach from "../../assets/beach.png";
import { useState } from "react";
//<BsPersonPlus size="16" stroke-width="0.2" />

import Profile01 from "../../assets/profile01.png";
import Profile02 from "../../assets/profile02.png";
import Profile03 from "../../assets/profile03.png";
import Profile04 from "../../assets/profile04.png";
import Profile05 from "../../assets/profile05.png";
import Profile06 from "../../assets/profile06.png";
import { Fragment } from "react";
import DepositModal from "../../components/Modal/DepositModal";
import WithdrawMoadal from "../../components/Modal/WithdrawModal";
import { DropdownMenuForAccount } from "../../components/DropDown";
const DUMMY_MEMBER = [
  { id: 1, profile: Profile01 },
  { id: 2, profile: Profile02 },
  { id: 3, profile: Profile03 },
  { id: 4, profile: Profile04 },
  { id: 5, profile: Profile05 },
  { id: 6, profile: Profile06 },
];

const Account = (props) => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const onClickButton1 = () => {
    setIsOpen1(true);
  };

  const onClickButton2 = () => {
    setIsOpen2(true);
  };
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.imageBox}>
          <img className={classes.image} src={Beach} alt="Beach" />
        </div>
        <div className={classes.textBox}>
          <div className={classes.upperBox}>
            <p className={classes.amount}>
              {props.moim.balance !== undefined
                ? `${props.moim.balance}원`
                : "Nan 원"}
              <p style={{ fontSize: "14px" }} className={classes.amount}>
                {props.moim.balance !== undefined
                  ? `목표 : ${props.moim.targetAmount}원`
                  : "Nan 원"}
              </p>
            </p>

            <DropdownMenuForAccount
              moim={props.moim}
              setIsNew={props.setIsNew}
            ></DropdownMenuForAccount>
            {/* <PiDotsThreeBold size="32" /> */}
          </div>
          <div id="modal" className={classes.lowerBox}>
            <button onClick={onClickButton1} style={{ cursor: "pointer" }}>
              입금
            </button>
            {isOpen1 && (
              <DepositModal
                setIsNew={props.setIsNew}
                moimWalletId={props.moim.walletId}
                onClose={() => {
                  setIsOpen1(false);
                }}
              />
            )}
            <button onClick={onClickButton2} style={{ cursor: "pointer" }}>
              송금
            </button>
            {isOpen2 && (
              <WithdrawMoadal
                setIsNew={props.setIsNew}
                moimWalletId={props.moim.walletId}
                onClose={() => {
                  setIsOpen2(false);
                }}
              />
            )}
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
