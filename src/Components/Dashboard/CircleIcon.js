import React from "react";
import classes from "./CircleIcon.module.css";

const CircleIcon = ({ background, color, icon, size, gender }) => {
  const image = <i className={icon}></i>;
  const img = <img src={gender} />;

  let backgroundStyle = {
    backgroundColor: background
  };

  if (gender === "/Images/girl.svg") {
    backgroundStyle = {
      backgroundColor: "rgba(6, 166, 137, 0.07)"
    };
  }

  const sizeOfCicle = {
    width: `${size}px`,
    height: `${size}px`
  };

  const colorStyle = { color: color };

  return (
    <div className={classes.wrapper} style={sizeOfCicle}>
      <div
        className={classes["background-circle"]}
        style={backgroundStyle}
      ></div>
      <span style={colorStyle}>
        {image}
        {img}
      </span>
    </div>
  );
};

export default CircleIcon;
