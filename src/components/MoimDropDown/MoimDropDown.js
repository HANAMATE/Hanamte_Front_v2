import { useNavigate } from "react-router-dom";
import { RiInformationFill } from "react-icons/ri";
import { FaWallet, FaPercentage, FaCoins, FaMoneyCheck } from "react-icons/fa";
import classes from "./Wallet.module.css";
import { fetchBalance, getMyAccount } from "../../apis/requests";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useEffect } from "react";

export const MoimDropDown = (props) => {

  return (
    <div>

    </div>
  );
};

export const MoimDropDown2 = (props) => {

    return (
      <div>
  
      </div>
    );
  };

  export const MoimDropDown3 = (props) => {

    return (
      <div>
  
      </div>
    );
  };


export default MoimDropDown;
