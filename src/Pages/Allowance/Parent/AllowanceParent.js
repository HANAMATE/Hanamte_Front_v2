import { useEffect, useState } from "react";

import classes from "./AllowanceParent.module.css";
import RootLayout from "../../../components/Layout/RootLayout";
import Header from "../../../components/Layout/Header";
import { fetchApprove, getRequestHistoryParent } from "../../../apis/requests";

const AllowanceParent = () => {
  const [requests, setRequests] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  async function getRequests() {
    try {
      const response = await getRequestHistoryParent();
      if (response.data.data !== []) {
        setRequests(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("getRequests 실패", error);
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    getRequests();
  }, [isClicked]);

  const onClickApprove = async (rId, result) => {
    alert("clicked");
    setIsClicked(true);
    await fetchApprove({
      requestId: rId,
      askAllowance: result,
    }).then(() => {
      setIsClicked(false);
    });
  };

  return (
    <RootLayout header={true}>
      <Header left="back" title={"용돈 조르기 요청 확인"} right="blank" />
      {requests.map((each) => (
        <div key={each.requestId}>
          <div className={classes.container}>
            <h1>{each.requestId}</h1>
            <div>
              <div className={classes.content}>
                <div className={classes.date}>
                  {each.createDate.substring(0, 10)}
                </div>
                <div className={classes.contentTitle}>
                  <div>{each.requesterId}</div>
                  <div>{each.allowanceAmount}</div>
                </div>
                <div>{each.requestDescription}</div>
              </div>
            </div>
          </div>
          <div className={classes.btnContainer}>
            <button
              className={classes.btn}
              onClick={() => {
                onClickApprove(each.requestId, true);
              }}
            >
              승인
            </button>
            <button
              className={classes.btn}
              onClick={() => {
                onClickApprove(each.requestId, false);
              }}
            >
              거절
            </button>
          </div>
        </div>
      ))}
    </RootLayout>
  );
};

export default AllowanceParent;
