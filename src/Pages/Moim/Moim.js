import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "../../Pages/Home/components/HomeCardBox.module.css";

import axios from "axios";
import Asteroid from "../../assets/asteroid.png";
import WalletPurple from "../../assets/wallet-purple.png";
import { authActions } from "../../store/auth-slice";

import HomeCard from "../Home/components/HomeCard";
import { useNavigate } from "react-router-dom";
import RootLayout from "../../components/Layout/RootLayout";
import { getRequestMyMoimList } from "../../../src/apis/requests";
import Header from "../../components/Layout/Header";
import CommunityLayout from "../../components/Layout/CommunityLayout";

const MoimList = () => {
  const navigate = useNavigate();
  const moimCardClick = (walletId) => {
    navigate("/community", { state: { walletId } });
  };

  const makeMoimClick = () => {
    navigate("/moimForm", { state: { moim: null } });
  };
  const { accessToken, loginId } = useSelector((state) => state.auth);
  //   const dispatch = useDispatch();
  const [moims, setMoims] = useState([]);

  async function getMyMoimList() {
    try {
      const response = await getRequestMyMoimList();
      if (response.data.data !== []) {
        setMoims(response.data.data);
      }
    } catch (error) {
      console.error("getBalance 실패", error);
    }
  }

  useEffect(() => {
    getMyMoimList();
  }, []);

  return (
    <RootLayout header={true}>
      <Header left="back" title={"모임통장 서비스"} right="blank" />
      <div className={classes.container}>
        <div className={classes.cardContainer}>
          {moims !== [] ? (
            moims.map((moim) => (
              <div
                onClick={() => moimCardClick(moim.walletId)}
                style={{ cursor: "pointer" }}
              >
                <HomeCard
                  key={moim.walletId}
                  title={moim.walletName}
                  description={moim.balance + "원"}
                  targetAmount={moim.targetAmount}
                  goal={moim.balance / moim.targetAmount}
                  icon={Asteroid}
                />
              </div>
            ))
          ) : (
            <div>없습니다.</div>
          )}
          <div onClick={() => makeMoimClick()} style={{ cursor: "pointer" }}>
            <HomeCard
              key={-1}
              title="모임통장 만들기"
              bgcolor="linear-gradient(-45deg, #5f3084, #3f3084)"
              tcolor="#ccc"
              dcolor="#fbfbfb"
              description={"목표금액도 정하고 모임통장 만들러가기!"}
              icon={WalletPurple}
            />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default MoimList;
