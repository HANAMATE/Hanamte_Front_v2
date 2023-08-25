import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../../components/Layout/Header";
import Member from "../../../components/Button/Member";
import classes from "./Request.module.css";
import RootLayout from "../../../components/Layout/RootLayout";
import { fetchGetParent } from "../../../apis/requests";
import { useSelector } from "react-redux";

/*
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
*/

const Request = (props) => {
  const { loginId } = useSelector((state) => state.auth);
  const [parent, setParent] = useState([]);

  async function getParents() {
    try {
      const response = await fetchGetParent({ userId: loginId });
      if (response.data.data !== []) {
        setParent(response.data.data);
      }
    } catch (error) {
      console.error("getParents 실패", error);
    }
  }

  useEffect(() => {
    getParents();
  }, []);

  return (
    <RootLayout header={true}>
      <Header left="back" title="누구에게 달라고 할래요?" right="blank" />
      <section className={classes.firstSection}>
        <div className={classes.memberList}>
          {parent.map((member) => (
            <Link
              key={member.userIdx}
              to="set"
              state={{
                id: member.userIdx,
                name: member.name,
                userId: member.userId,
              }}
            >
              <Member
                key={member.userIdx}
                userId={member.userId}
                name={member.userId}
                phone={member.phone}
                starred={true}
              />
            </Link>
          ))}
        </div>
      </section>
    </RootLayout>
  );
};

export default Request;
