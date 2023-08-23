import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import RootLayout from "../../components/Layout/RootLayout";
import Header from "../../components/Layout/Header";
import EmptyApply from "../../components/Card/EmptyApply";
import Section from "../../components/Card/Section";
import TransactionBox from "../../components/Card/TransactionBox";
import Transaction from "../../components/Card/Transaction";
import axios from "axios";

const Loan = (props) => {
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
      <EmptyApply balance={balance} />
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
    // <>
    //   <main>
    //     <h1>Loan</h1>
    //   </main>
    // </>
  );
};

export default Loan;
