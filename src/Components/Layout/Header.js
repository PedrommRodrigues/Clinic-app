import React from "react";
import classes from "./header.module.css";

const Header = () => {
  return (
    <>
      <div className={classes.header}>
        <div className={`${classes.hospital} text-main`}>
          <i className="fa-solid fa-house"></i>
          <p>Kansas City Family Medical Care</p>
          <button>
            <img src="/Images/icons/chev-down.svg" alt="" />
          </button>
        </div>
        <div className={classes.user}>
          <img src="/Images/icons/Bell.svg" alt="" />
          <img className={classes.picture} src="/Images/doctor.svg" alt="" />
          <div className={classes["user-info"]}>
            <p className={classes["text-main"]}>Margaret Lim</p>
            <p className={classes.spec}>Cardiologist</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
