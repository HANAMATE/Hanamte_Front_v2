import { useEffect, useState } from "react";

import Header from "../../../components/Layout/Header";
import Section from "../../../components/Card/Section";
import AllowanceHistoryCard from "../../../components/Card/AllowanceHistoryCard";
import AllowanceAskCard from "../../../components/Card/AllowanceAskCard";

import classes from "./History.module.css";
import RootLayout from "../../../components/Layout/RootLayout";
import { getRequestHistoryChild } from "../../../apis/requests";

/*
const DUMMY_HISTORY = [
  {
    id: 1,
    name: "강민경",
    amount: "15500",
  },
  {
    id: 2,
    name: "권민선",
    amount: "35000",
  },
  {
    id: 3,
    name: "김민재",
    amount: "7000",
  },
  {
    id: 4,
    name: "민새미",
    amount: "48000",
  },
  {
    id: 5,
    name: "최안식",
    amount: "24500",
  },
];
*/

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function getRequestHistory() {
      try {
        const response = await getRequestHistoryChild();
        setHistory(response.data.data);
      } catch (error) {
        console.error("requestAllowance 실패", error);
      }
    }

    getRequestHistory();
  }, []);

  return (
    <RootLayout header={true}>
      <Header left="back" title="용돈 조회" right="blank" />
      <Section title="기다리는 중" seeMore={true} seeMoreText="지난 용돈">
        <div className={classes.cardContainer}>
          <AllowanceAskCard remainingTime="19" />
          {history.map((each) => (
            <AllowanceHistoryCard
              key={each.requestId}
              name={each.targetId}
              amount={each.allowanceAmount}
            />
          ))}
        </div>
      </Section>
    </RootLayout>
  );
};

export default History;
