import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import LocaleString from "../../util/LocaleString";
import { authActions } from "../../store/auth-slice";
import HomeTitle from "./components/HomeTitle";
import HomeButtonBox from "./components/HomeButtonBox";
import HomeCardBox from "./components/HomeCardBox";
import Footer from "../../components/Layout/Footer";
import RootLayout from "../../components/Layout/RootLayout";
import { useNavigate } from "react-router-dom";
import { fetchBalance } from "../../apis/requests";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const { isAuthenticated, loginId, name, balance, accessToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getbalance() {
      try {
        const response = await fetchBalance({ userId: loginId });
        dispatch(
          authActions.setBalance({
            balance: response.data.data.balance,
          })
        );
      } catch (error) {
        console.error("getBalance 실패", error);
      }
    }

    async function init(local_storage_AT) {
      let res;
      try {
        await axios
          .post(
            process.env.REACT_APP_SERVER_URL + "/users/init",
            {},
            {
              headers: {
                Authorization: local_storage_AT,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          )
          .then((response) => {
            res = response;
            if (response.data.state === 200) {
              console.log("init loginID: " + response.data.data);
              dispatch(
                authActions.setUserId({
                  loginId: response.data.data,
                })
              );
            } else {
              localStorage.removeItem("AccessToken");
              localStorage.removeItem("RefreshToken");
              navigate("/login");
            }
            return res.data.data;
          });
      } catch (error) {
        console.error("Init 실패", error);
      }
    }

    let localStorageAT = localStorage.getItem("AccessToken");
    let localStorageRT = localStorage.getItem("RefreshToken");

    // console.log(localStorageAT);
    if (accessToken === "") {
      navigate("/login");
    } else {
      // dispatch(
      //   authActions.setToken({
      //     accessToken: localStorageAT,
      //     refreshToken: localStorageRT,
      //   })
      // );
      // let temploginId = init(localStorageAT.replace("Bearer ", ""));
      // console.log("temploginId: " + temploginId);
      getbalance();
    }
  }, []);

  return (
    <RootLayout footer={true} header={true}>
      <HomeTitle
        isAuthenticated={isAuthenticated}
        name={name}
        balance={LocaleString(balance)}
      />
      <HomeButtonBox />
      <HomeCardBox />
      <Footer />
    </RootLayout>
  );
};

export default Home;
