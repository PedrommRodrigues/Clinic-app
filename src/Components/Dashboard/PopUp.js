import React, { useState } from "react";
import classes from "./PopUp.module.css";
import CircleIcon from "./CircleIcon";

const PopUp = ({
  title,
  number,
  icon,
  color,
  background,
  selectedCard,
  id,
}) => {
  const female = "/Images/girl.svg";
  const male = "/Images/boy.svg";

  const clients = [
    {
      id: "1",
      name: "Annete Black",
      gender: female,
    },
    {
      id: "2",
      name: "Cameron Williamson",
      gender: male,
    },
    {
      id: "3",
      name: "Savannah Nguyen",
      gender: female,
    },
    {
      id: "4",
      name: "Jenny Wilson",
      gender: female,
    },
    {
      id: "5",
      name: "Darlene Robertson",
      gender: female,
    },
    {
      id: "6",
      name: "Floyd Miles",
      gender: male,
    },
    {
      id: "7",
      name: "Denise Fonts",
      gender: female,
    },
    {
      id: "8",
      name: "Floyd Miles",
      gender: male,
    },
  ];

  return (
    <div
      style={{ left: id === 4 ? "-140px" : "100px" }}
      className={classes.container}
    >
      <div className={classes.header} style={{ backgroundColor: background }}>
        <i className={icon} style={{ color: color }}></i>
        <div className={classes.title}>
          <h1 className="text-h3">{title}</h1>
          <span className="text-h4-regular">({number})</span>
        </div>
        <div className={classes.close} onClick={selectedCard}>
          <i className="fa-solid fa-x fa-sm"></i>
        </div>
      </div>
      <div className={classes.list}>
        <table className={classes.test}>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>
                  <div className={classes.name}>
                    <CircleIcon
                      size={44}
                      gender={client.gender}
                      background={"rgba(55, 131, 245, 0.07)"}
                    />
                    <p className="text-semibold">{client.name}</p>
                    <span className={classes.right}>1 jan 2020</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopUp;
