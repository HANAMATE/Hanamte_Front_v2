import RootLayout from "../../../components/Layout/RootLayout";
import SetAmount from "../../../components/SetAmount/SetAmount";
import { useSelector } from "react-redux";

const Success = () => {
  const { accountBalance } = useSelector((state) => state.auth);

  return (
    <RootLayout>
      <div>계좌에서 가져오기 성공</div>
    </RootLayout>
  );
};

export default Success;
