import React from "react";
import classes from "./TopCard.module.css";
import CircleIcon from "./CircleIcon";
import PopUp from "./PopUp";

const TopCard = ({ icon, number, label, color, background, onClick }) => {
  return (
    <div onClick={onClick} className={classes.container}>
      <div className={classes.centered}>
        <CircleIcon
          icon={icon}
          background={background}
          color={color}
          size={74}
        />
        <div>
          <h1 className={classes["numbers-dashboard"]}>{number}</h1>
          <p className={classes["semi-bold"]}>{label}</p>
        </div>
      </div>
    </div>
  );
};

export default TopCard;
