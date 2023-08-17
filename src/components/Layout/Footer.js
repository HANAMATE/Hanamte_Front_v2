import { NavLink } from "react-router-dom";
import classes from "./Footer.module.css";
import { HouseDoor, HouseDoorFill, Bell, BellFill, Calendar2, Calendar2Fill } from "react-bootstrap-icons";
import { PiSquaresFour, PiSquaresFourFill } from "react-icons/pi";

const Footer = (props) => {
  return (
    <div className={classes.footerBox}>
      <div className={classes.footerIconBox}>
        <NavLink to="/">
          {({ isActive }) =>
            isActive ? (
              <HouseDoorFill className={classes.footerIcon} size="24" color="#212121" />
            ) : (
              <HouseDoor className={classes.footerIcon} size="24" color="#212121" />
            )
          }
        </NavLink>
      </div>
      <div className={classes.footerIconBox}>
        <NavLink to="/notification">
          {({ isActive }) =>
            isActive ? (
              <BellFill className={classes.footerIcon} size="24" color="#212121" />
            ) : (
              <Bell className={classes.footerIcon} size="24" color="#212121" />
            )
          }
        </NavLink>
      </div>
      <div className={classes.footerIconBox}>
        <NavLink to="/calendar">
          {({ isActive }) =>
            isActive ? (
              <Calendar2Fill className={classes.footerIcon} size="24" color="#212121" />
            ) : (
              <Calendar2 className={classes.footerIcon} size="24" color="#212121" />
            )
          }
        </NavLink>
      </div>
      <div className={classes.footerIconBox}>
        <NavLink to="/menu">
          {({ isActive }) =>
            isActive ? (
              <PiSquaresFourFill className={classes.footerIcon} size="24" color="#212121" />
            ) : (
              <PiSquaresFour className={classes.footerIcon} size="24" color="#212121" />
            )
          }
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
