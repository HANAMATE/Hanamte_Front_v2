import { Fragment, useState, useEffect } from "react";
import classes from "./CommunityAccount.module.css";
import Header from "../../../components/Layout/Header";
import CommunityLayout from "../../../components/Layout/CommunityLayout";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation 추가

import Wave from "../../../assets/wave-colored.png";
import DUMMY00 from "../../../assets/DUMMY01.jpeg";
import DUMMY01 from "../../../assets/DUMMY01.jpeg";
import DUMMY02 from "../../../assets/DUMMY02.jpeg";
import DUMMY03 from "../../../assets/DUMMY03.jpeg";
import DUMMY04 from "../../../assets/DUMMY04.jpeg";
import DUMMY05 from "../../../assets/DUMMY05.jpeg";
import DUMMY06 from "../../../assets/DUMMY06.jpeg";
import DUMMY07 from "../../../assets/DUMMY07.jpeg";
import DUMMY08 from "../../../assets/DUMMY08.jpeg";
import DUMMY09 from "../../../assets/DUMMY09.jpeg";
import DUMMY10 from "../../../assets/DUMMY10.jpeg";
import DUMMY11 from "../../../assets/DUMMY11.jpeg";
import DUMMY12 from "../../../assets/DUMMY12.jpeg";
import Article from "../Article";
import CommunityHeader from "../../../components/Layout/CommunityHeader";
import Section from "../../../components/Card/Section";
import Wallet from "../../../components/Card/Wallet";
import Account from "../Account";
import { getRequestMyMoim } from "../../../../src/apis/requests";

const DUMMY_ARTICLE = [
  // DUMMY00,
  DUMMY01,
  DUMMY02,
  DUMMY03,
  DUMMY04,
  DUMMY05,
  DUMMY06,
  DUMMY07,
  DUMMY08,
  DUMMY09,
  DUMMY10,
  DUMMY11,
  DUMMY12,
];

const CommunityAccount = (props) => {
  const location = useLocation();
  const { walletId } = location.state; // walletId 값을 받아옴
  const [moim, setMoim] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isNew, setIsNew] = useState(false);

  async function getMyMoim(walletId) {
    try {
      const response = await getRequestMyMoim(walletId);
      if (response.data.data !== []) {
        setMoim(response.data.data);
        setTransactions(response.data.data.transactionList);
      }
    } catch (error) {
      console.error("getMyMoim 실패", error);
    }
  }

  useEffect(() => {
    getMyMoim(walletId);
  }, []);

  useEffect(() => {
    getMyMoim(walletId);
  }, [isNew]);

  return (
    <CommunityLayout>
      <Header left="back" title={moim.walletName} right="blank" />
      <div>
        {/* <div className={classes.walletBox}>
          <Wallet color="blue" />s
        </div> */}
        <Account moim={moim} setIsNew={setIsNew} />
        <Section
          community={true}
          title="모임일기"
          seeMore={true}
          seeMoreText="거래내역 전체보기"
        >
          {transactions.reverse().map((transaction) => {
            return (
              <div /*style={{margin :'10px 0'}}*/>
                <Article
                  key={transaction.id}
                  image={transaction}
                  transaction={transaction}
                  walletId={transaction.walletId}
                  setIsNew={setIsNew}
                />
              </div>
            );
          })}
        </Section>
        <section className={classes.articleSection}></section>
      </div>
    </CommunityLayout>
  );
};

export default CommunityAccount;
