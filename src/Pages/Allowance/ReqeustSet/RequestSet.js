import { useLocation, useNavigate } from "react-router-dom";

import SetAmount2 from "../../../components/SetAmount/SetAmount2";
import RootLayout from "../../../components/Layout/RootLayout";

const RequestSet = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const submitAmount = async (submittedAmount) => {
    navigate("/allowance/request/confirm", {
      state: {
        id: location.state.id,
        name: location.state.name,
        amount: submittedAmount,
        userId: location.state.userId,
      },
    });
  };

  return (
    <RootLayout header={true}>
      <SetAmount2
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
