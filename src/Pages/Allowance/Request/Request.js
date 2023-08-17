import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiMagnifyingGlassBold } from "react-icons/pi";

import Header from "../../../components/Layout/Header";
import InputBox from "../../../components/Input/InputBox";
import Member from "../../../components/Button/Member";
import classes from "./Request.module.css";
import RootLayout from "../../../components/Layout/RootLayout";

const DUMMY_MEMBER = [
  {
    id: 1,
    name: "김민재",
    phone: "010-9510-2137",
  },
  {
    id: 2,
    name: "강민경",
    phone: "010-6259-5634",
  },
  {
    id: 3,
    name: "빌게이츠",
    phone: "010-2340-2223",
  },
  {
    id: 4,
    name: "스티브잡스",
    phone: "010-7732-1940",
  },
];

const DUMMY_MEMBER_2 = [
  {
    id: 1,
    name: "김민재",
    phone: "010-9510-2137",
  },
];

const Request = (props) => {
  return (
    <RootLayout header={true}>
      <Header left="back" title="누구에게 달라고 할래요?" right="blank" />
      <section className={classes.firstSection}>
        <InputBox left={<PiMagnifyingGlassBold size="24" fill="#aaa" />} placeholder="부모멤버의 연락처를 검색해봐요" />
        <p className={classes.title}>즐겨찾는 멤버 1</p>
        <div className={classes.memberList}>
          {DUMMY_MEMBER.map((member) => (
            <Link key={member.id} to="set" state={{ id: member.id, name: member.name }}>
              <Member key={member.id} name={member.name} phone={member.phone} starred={true} />
            </Link>
          ))}
        </div>
      </section>
      <div className={classes.line} />
      <section className={classes.SecondSection}>
        <p className={classes.title}>검색된 멤버</p>
        <div className={classes.memberList}>
          {DUMMY_MEMBER_2.map((member) => (
            <Member key={member.id} name={member.name} phone={member.phone} starred={false} />
          ))}
        </div>
      </section>
    </RootLayout>
  );
};

export default Request;
