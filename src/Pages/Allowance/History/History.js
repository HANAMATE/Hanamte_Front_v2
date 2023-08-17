import { Fragment } from "react";

import Header from "../../../components/Layout/Header";
import Section from "../../../components/Card/Section";
import AllowanceHistoryCard from "../../../components/Card/AllowanceHistoryCard";
import AllowanceAskCard from "../../../components/Card/AllowanceAskCard";

import classes from "./History.module.css";
import RootLayout from "../../../components/Layout/RootLayout";

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

const History = (props) => {
  return (
    <RootLayout header={true}>
      <Header left="back" title="용돈 조회" right="blank" />
      <Section title="기다리는 중" seeMore={true} seeMoreText="지난 용돈">
        <div className={classes.cardContainer}>
          <AllowanceAskCard remainingTime="18" />
          {DUMMY_HISTORY.map((each) => (
            <AllowanceHistoryCard key={each.id} name={each.name} amount={each.amount} />
          ))}
        </div>
      </Section>
    </RootLayout>
  );
};

export default History;
