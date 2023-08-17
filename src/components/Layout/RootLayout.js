import classes from "./RootLayout.module.css";
import { useSelector } from "react-redux";

const RootLayout = (props) => {
  const extraHeader = props.header ? classes.withHeader : classes.withoutHeader;
  const extraFooter = props.footer ? classes.withFooter : classes.withoutFooter;
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className={classes.outerBox}>
      <div className={classes.fixedBox} />
      {!isAuthenticated && <div className={classes.marginTop} />}
      <div className={`${classes.innerBox} ${extraHeader} ${extraFooter}`}>{props.children}</div>
    </div>
  );
};

export default RootLayout;
