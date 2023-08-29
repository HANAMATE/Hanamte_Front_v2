import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import RootLayout from "../../components/Layout/RootLayout";
import Header from "../../components/Layout/Header";

import Section from "../../components/Card/Section";
import TransactionBox from "../../components/Card/TransactionBox";
import TransactionLoan from "../../components/Card/TransactionLoan";
import axios from "axios";

import Button2 from "../../components/Button/Button2";
import Input from "../../components/Input/Input";
import ApproveBtn from "../../components/Button/ApproveBtn";

const LoanHistory = (props) => {
  const { loanId } = useParams();

  const [loanInfo, setLoanInfo] = useState(null);
  const [historyInfo, setHistoryInfo] = useState([]);
  const accessToken =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTMyODc5Mzh9.eJruGKBTLzXINYOAVmaMEd8-HQME5zBUvPlAas8Y3yg";
  const { userType } = useSelector((state) => state.auth); // assuming userType is available in the state

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
      .get(
        process.env.REACT_APP_SERVER_URL + `/loan/loandetailInfo/${loanId}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((res) => {
        if (res.data.state === 200) {
          console.log("Success on React Server");
          setLoanInfo(res.data.data);
          console.log(res.data.data);
        } else {
          console.log("토큰 유효기간이 끝났을 겁니당~");
        }
      });

    axios
      .get(
        process.env.REACT_APP_SERVER_URL + `/loan/historydetailInfo/${loanId}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((res) => {
        if (res.data.state === 200) {
          setHistoryInfo(res.data.data);
          console.log(res.data.data);
        } else {
          console.log("오류남");
          console.log("토큰 유효기간이 끝났을 겁니다.");
        }
      });
  }, [loanId]);

  const navigate = useNavigate(); // useNavigate로 변경

  return (
    <RootLayout header={true}>
      <Header left="back" title="대출 내역" right="blank" />
      <div>
        {loanInfo ? (
          <div>
            <p>대출 상품명: {loanInfo.loanName}</p>
            <p>대출 금액: {loanInfo.loanAmount}원</p>
            <p>대출 메시지: {loanInfo.loanMessage || "없음"}</p>
            <p>이자율: {loanInfo.interestRate}%</p>
            <p>상환 방식 : {loanInfo.paymentMethod}</p>
            <p>{loanInfo.sequence}개월</p>
            <p>총 상환금액: {loanInfo.total_repaymentAmount}</p>
            <p>총 이자 :{loanInfo.total_interestRate} </p>
          </div>
        ) : (
          <p>대출 정보를 가져오는 중...</p>
        )}
      </div>
      <Section title="최근 대출상세내역">
        <TransactionBox>
          {historyInfo && historyInfo.length > 0 ? (
            historyInfo.map((transaction, index) => (
              <TransactionLoan
                key={index}
                dateBox={transaction.sequence_time} // 순서
                title={`거래일: ${formatDate(transaction.transactionDate)}`} // 거래일
                change={`상환 금액: ${transaction.repaymentAmount}원`} // 상환 금액
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

export default LoanHistory;
