import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import RootLayout from "../../components/Layout/RootLayout";
import Header from "../../components/Layout/Header";
import ParentEmptyApply from "../../components/Card/ParentEmptyApply";
import ParentExistApply from "../../components/Card/ParentExistApply";

import ChildEmptyApply from "../../components/Card/ChildEmptyApply";
import ChildExistApply from "../../components/Card/ChildExistApply";

import Section from "../../components/Card/Section";
import TransactionBox from "../../components/Card/TransactionBox";
import TransactionLoan from "../../components/Card/TransactionLoan";
import axios from "axios";

import Button2 from "../../components/Button/Button2";
import Input from "../../components/Input/Input";
import ApproveBtn from "../../components/Button/ApproveBtn";

const Loan = (props) => {
  const [loanInfo, setLoanInfo] = useState(null);
  const [historyInfo, setHistoryInfo] = useState([]);
  const [dummy, setDummy] = useState([]);
  const accessToken =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTMyODc5Mzh9.eJruGKBTLzXINYOAVmaMEd8-HQME5zBUvPlAas8Y3yg";
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

  const formatDate = (date) => {
    if (!date) {
      return "진행 중인 대출";
    }

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

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
        } else if (res.data.state === 204) {
          // setLoanInfo(res.data.data);
          console.log("대출 신청 내역이 없습니다");
          setLoanInfo(res.data.data);
          console.log(res.data.data);
        } else {
          console.log("토큰 유효기간이 끝났을 겁니당~");
          // setLoanInfo(res.data.data);
        }
      });

    axios
      .get(process.env.REACT_APP_SERVER_URL + "/loan/historyInfo", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        if (res.data.state === 200) {
          setHistoryInfo(res.data.data);
        } else {
          console.log("토큰 유효기간이 끝났을 겁니다.");
        }
      });
  }, []);

  const navigate = useNavigate(); // useNavigate로 변경

  const handleTransactionClick = (transaction) => {
    console.log("리스트 클릭됨");
    navigate(`/loan/loanHistory/${transaction.loanId}`);
  };

  return (
    <RootLayout header={true}>
      <Header left="back" title="대출 내역" right="blank" />
      {loanInfo && loanInfo.userType === "Parent" ? (
        loanInfo.loanName && loanInfo.loanAmount && loanInfo.loanMessage ? (
          <ParentExistApply
            loanName={loanInfo.loanName}
            loanAmount={loanInfo.loanAmount}
            loanMessage={loanInfo.loanMessage}
            sequence={loanInfo.sequence}
            valid={loanInfo.valid}
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

      <Section
        title="최근 대출내역"
        seeMore={true}
        seeMoreText="각 내역 선택 -> 상세내역 이동"
      >
        <TransactionBox>
          {historyInfo && historyInfo.length > 0 ? (
            historyInfo.map((transaction, index) => (
              <TransactionLoan
                key={index}
                onClick={() => handleTransactionClick(transaction)}
                dateBox={index + 1}
                title={`${transaction.loanName}`}
                change={`금액: ${transaction.loanAmount}원`}
                subTitle={`End Date: ${formatDate(transaction.endDate)}`}
              />
            ))
          ) : (
            <p>거래 내역이 없습니다.</p>
          )}
        </TransactionBox>
      </Section>
    </RootLayout>
  );
};

export default Loan;
