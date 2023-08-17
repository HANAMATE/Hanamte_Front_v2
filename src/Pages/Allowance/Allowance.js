import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import RootLayout from "../../components/Layout/RootLayout";
import Header from "../../components/Layout/Header";
import Wallet from "../../components/Card/Wallet";
import Section from "../../components/Card/Section";
import TransactionBox from "../../components/Card/TransactionBox";
import Transaction from "../../components/Card/Transaction";
import axios from "axios";

// const DUMMY = [

//   {
//     date: "08.09",
//     title: "텐동식당",
//     subTitle: "",
//     type: "출금",
//     change: "-12,000원",
//     remain: "433,000원",
//   },
//   {
//     date: "08.08",
//     title: "강민* 용돈",
//     subTitle: "# 정기용돈",
//     type: "입금",
//     change: "+200,000원",
//     remain: "445,000원",
//   },
//   {
//     date: "08.07",
//     title: "소바식당",
//     subTitle: "",
//     type: "출금",
//     change: "-15,000원",
//     remain: "245,000원",
//   },
//   {
//     date: "08.06",
//     title: "스타벅스",
//     subTitle: "",
//     type: "출금",
//     change: "-5,400원",
//     remain: "260,000원",
//   },
//   {
//     date: "08.05",
//     title: "버거킹",
//     subTitle: "",
//     type: "출금",
//     change: "-9,200원",
//     remain: "265,400원",
//   },
//   {
//     date: "08.04",
//     title: "최안* 용돈",
//     subTitle: "# 용돈조르기 성공!",
//     type: "입금",
//     change: "50,000원",
//     remain: "274,600원",
//   },
// ];

const Allowance = (props) => {
  const [dummy, setDummy] = useState([]);
  const {
    isAuthenticated,
    expiredAt,
    name,
    balance,
    isParent,
    accessToken,
    loginId,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/my-wallet/transactions", {
        userId: loginId,
        year: 2023,
        month: 8,
      })
      .then((res) => {
        // axios.get("https://hanamate.onrender.com/").then((res) => {
        if (res.data.state === 200) {
          console.log("Success on React Server");
          setDummy(res.data.data);
        }
      });
  }, []);

  return (
    <RootLayout header={true}>
      <Header left="back" title="내 지갑" right="blank" />
      <Wallet balance={balance} />
      <Section title="최근 거래내역" seeMore={true} seeMoreText="전체 거래내역">
        <TransactionBox>
          {dummy.map((each) => (
            <Transaction
              key={each.id}
              date={each.date}
              title={each.type}
              subTitle={each.type}
              type={each.type}
              change={each.amount}
              remain={each.walltId}
            />
          ))}
        </TransactionBox>
      </Section>
    </RootLayout>
  );
};

export default Allowance;
