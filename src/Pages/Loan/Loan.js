import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import RootLayout from "../../components/Layout/RootLayout";
import Header from "../../components/Layout/Header";
// import EmptyApply from "../../components/Card/EmptyApply";
import ExistApply from "../../components/Card/ExistApply";

import Section from "../../components/Card/Section";
import TransactionBox from "../../components/Card/TransactionBox";
import Transaction from "../../components/Card/Transaction";
import axios from "axios";

import Button2 from "../../components/Button/Button2";
import Input from "../../components/Input/Input";
import ApproveBtn from "../../components/Button/ApproveBtn";

const Loan = (props) => {
  const [loanInfo, setLoanInfo] = useState(null);
  const [dummy, setDummy] = useState([]);
  const accessToken =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MyIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTI3ODM2Nzd9.64MvSqTgi0ssRxlnvs2FRDbhhPR7gXcAKZKxUMH4OfE";
  const {
    // isAuthenticated,
    loanName,
    loanAmount,
    // balance,
    loanMessage,
    // accessToken,
    // loginId,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/loan/applyInfo", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        // axios.get("https://hanamate.onrender.com/").then((res) => {
        if (res.data.state === 200) {
          console.log("Success on React Server");
          setLoanInfo(res.data.data);
          console.log(res.data.data);
        } else {
          console.log("토큰 유효기간이 끝났을 겁니당~");
        }
      });
  }, []);
  return (
    <RootLayout header={true}>
      <Header left="back" title="내 지갑" right="blank" />
      {/* <EmptyApply balance={balance} /> */}
      {loanInfo && (
        <ExistApply
          loanName={loanInfo.loanName} // Pass the loanName prop
          loanAmount={loanInfo.loanAmount} // Pass the loanAmount prop
          loanMessage={loanInfo.loanMessage} // Pass the loanMessage prop
        />
      )}

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

export default Loan;
