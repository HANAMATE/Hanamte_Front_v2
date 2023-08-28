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
    let localStorageAT = localStorage.getItem("AccessToken");
    let localStorageRT = localStorage.getItem("RefreshToken");

    async function fetchInit() {
      await axios
        .post(
          process.env.REACT_APP_SERVER_URL + "/users/init",
          {},
          { headers: { Authorization: localStorageAT.replace("Bearer ", "") } }
        )
        .then((response) => {
          const isParent = response.data.data.userType === "Parent";
          console.log(response.data.data.userName);
          dispatch(
            authActions.login({
              loginId: response.data.data.userId,
              name: response.data.data.userName,
              userType: isParent,
              accessToken: localStorageAT,
              refreshToken: localStorageRT,
            })
          );
        })
        .catch((err) => {
          console.error(err);
        })
        .finally((fin) => {
          console.log("end");
        });
    }

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

    // console.log(localStorageAT);
    /*
    if (accessToken === "") {
      navigate("/login");
    } else {
      fetchInit();
      getbalance();
    }*/

    if (localStorageAT === null && accessToken === "") {
      navigate("/login");
    } else {
      fetchInit().then(() => {
        getbalance();
      });
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
