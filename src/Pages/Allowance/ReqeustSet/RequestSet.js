import { useLocation, useNavigate } from "react-router-dom";

import SetAmount from "../../../components/SetAmount/SetAmount";
import RootLayout from "../../../components/Layout/RootLayout";

const RequestSet = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const submitAmount = async (submittedAmount) => {
    navigate("/allowance/request/confirm", {
      state: { id: location.state.id, name: location.state.name, amount: submittedAmount },
    });
  };

  return (
    <RootLayout header={true}>
      <SetAmount
        target={location.state.name}
        title="용돈 조르기"
        message="얼마를 달라고 할까요?"
        subMessage="최대"
        buttonMessage="다음"
        balance="50000"
        destination="../confirm"
        type="RequestSet"
        submitAmount={submitAmount}
      />
    </RootLayout>
  );
};

export default RequestSet;
