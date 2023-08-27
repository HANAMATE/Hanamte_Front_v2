import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "../../Pages/Home/components/HomeCardBox.module.css";

import axios from "axios";
import Asteroid from "../../assets/asteroid.png";
import { authActions } from "../../store/auth-slice";

import HomeCard from "../Home/components/HomeCard";
import { useNavigate } from "react-router-dom";
import RootLayout from "../../components/Layout/RootLayout";
import {getRequestMyMoimList} from "../../../src/apis/requests";

const MoimList = () => {
    const navigate = useNavigate();
    const moimCardClick = (walletId) => {
        navigate("/community", { state: { walletId } });
      };

    const {
        accessToken,
        loginId,
      } = useSelector((state) => state.auth);
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
        <RootLayout>
            <div className={classes.cardContainer}>
        {moims !== [] ? moims.map((moim) => (
            <div onClick={()=>moimCardClick(moim.walletId)}>
            <HomeCard key={moim.walletId} title={moim.walletName} 
            description = {moim.balance+"원"} icon={Asteroid} 
             />
             </div>
          )): <div>없습니다.</div>
          }
            </div>

        </RootLayout>
    )
};

export default MoimList;