import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import RootLayout from "../../components/Layout/RootLayout";
import Header from "../../components/Layout/Header";
import ParentEmptyApply from "../../components/Card/ParentEmptyApply";
import ParentExistApply from "../../components/Card/ParentExistApply";

import ChildEmptyApply from "../../components/Card/ChildEmptyApply";
import ChildExistApply from "../../components/Card/ChildExistApply";

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
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MyIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTI4OTIxNzF9.8Pies2qoVeAPMF2eK-qgoYadjXiDGry4z3flWYK8lMI";
    const { userType } = useSelector((state) => state.auth); // assuming userType is available in the state

  //   const {
  //   // isAuthenticated,
  //   loanName,
  //   loanAmount,
  //   // balance,
  //   loanMessage,
  //   // accessToken,
  //   // loginId,
  // } = useSelector((state) => state.auth);

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
        } 
        else if(res.data.state === 204){
          // setLoanInfo(res.data.data);
          console.log("대출 신청 내역이 없습니다");
          setLoanInfo(res.data.data);
          console.log(res.data.data);
        }
        else {
          console.log("토큰 유효기간이 끝났을 겁니당~");
        }
      });
  }, []);


  return (
    <RootLayout header={true}>
      <Header left="back" title="대출 내역" right="blank" />
      {loanInfo && loanInfo.userType === "Parent" ? (
      loanInfo.loanName && loanInfo.loanAmount && loanInfo.loanMessage ? (
        <ParentExistApply
          loanName={loanInfo.loanName}
          loanAmount={loanInfo.loanAmount}
          loanMessage={loanInfo.loanMessage}
        />
      ) : (
        <ParentEmptyApply />
      )
    ) : loanInfo && loanInfo.userType === "Child" ? (
      loanInfo.loanName && loanInfo.loanAmount && loanInfo.loanMessage ? (
        <ChildExistApply
          loanName={loanInfo.loanName}
          loanAmount={loanInfo.loanAmount}
          loanMessage={loanInfo.loanMessage}
        />
      ) : (
        <ChildEmptyApply />
      )
    ) : userType === "Parent" ? (
      <ParentEmptyApply />
    ) : (
      <ChildEmptyApply />
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