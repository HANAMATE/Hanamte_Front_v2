import { useSelector } from "react-redux";
import SetAmount3 from "../../../components/SetAmount/SetAmoun3";
import { useLocation } from "react-router-dom";

const Send = () => {
  const location = useLocation();
  const { balance } = useSelector((state) => state.auth);
  return (
    <SetAmount3
      type="send"
      title="용돈 보내기"
      subMessage="내 지갑 잔액"
      balance={balance}
      buttonMessage="보내기"
      childId={location.state.userId}
    />
  );
};

export default Send;
