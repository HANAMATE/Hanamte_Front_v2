import RootLayout from "../../../components/Layout/RootLayout";
import SetAmount from "../../../components/SetAmount/SetAmount";
import { useSelector } from "react-redux";

const Fill = () => {
  const { accountBalance } = useSelector((state) => state.auth);

  return (
    <RootLayout>
      <SetAmount
        type="fill"
        title="충전하기"
        subMessage="충전계좌 잔액"
        balance={accountBalance}
        buttonMessage="충전하기"
      />
    </RootLayout>
  );
};

export default Fill;
