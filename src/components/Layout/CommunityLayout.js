import { Outlet } from "react-router-dom";
import classes from "./CommunityLayout.module.css";

const CommunityLayout = (props) => {
  return (
    <div className={classes.outerBox}>
      <div className={classes.fixedBox} />
      {props.children}
    </div>
  );
};

export default CommunityLayout;
