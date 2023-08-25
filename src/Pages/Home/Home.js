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

    let localStorageAT = localStorage.getItem("AccessToken");
    let localStorageRT = localStorage.getItem("RefreshToken");

    // console.log(localStorageAT);
    if (accessToken === "") {
      navigate("/login");
    } else {
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
