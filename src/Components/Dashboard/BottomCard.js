import React from "react";
import classes from "./BottomCard.module.css";

const BottomCard = ({ color, number, label }) => {
  const background = { backgroundColor: color };

  return (
    <div className={classes.container} style={background}>
      <div className={classes.centered}>
        <h1 className={classes["numbers-dashboard"]}>{number}</h1>
        <p className={classes["semi-bold"]} style={{ color: "#fff" }}>
          {label}
        </p>
      </div>
    </div>
  );
};

export default BottomCard;
