import RootLayout from "../../../components/Layout/RootLayout";
import SetAmount from "../../../components/SetAmount/SetAmount";

const Fill = () => {
  return (
    <RootLayout>
      <SetAmount type="fill" title="충전하기" subMessage="충전계좌 잔액" balance="241000" buttonMessage="충전하기" />
    </RootLayout>
  );
};

export default Fill;
