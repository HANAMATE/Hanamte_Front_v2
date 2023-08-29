import { Link, useLocation, useNavigate } from "react-router-dom";

import SetAmount2 from "../../../components/SetAmount/SetAmount2";
import RootLayout from "../../../components/Layout/RootLayout";
import SetAmount from "../../../components/SetAmount/SetAmount";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGetChild, fetchGetParent } from "../../../apis/requests";
import Header from "../../../components/Layout/Header";
import classes from "../Request/Request.module.css";
import Member from "../../../components/Button/Member";

const SendWho = () => {
  const { loginId } = useSelector((state) => state.auth);
  const [parent, setParent] = useState([]);

  async function getChild() {
    try {
      const response = await fetchGetChild({ userId: loginId });
      if (response.data.data !== []) {
        setParent(response.data.data);
      }
    } catch (error) {
      console.error("getChild 실패", error);
    }
  }

  useEffect(() => {
    getChild();
  }, []);

  return (
    <RootLayout header={true}>
      <Header left="back" title="누구에게 용돈 줄래요?" right="blank" />
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

export default SendWho;
