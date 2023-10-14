import React, { useState, useEffect } from "react";
import Appointments from "../Appointments/Appointments";
import Patients from "../Patients/Patients";
import Dashboard from "../Dashboard/Dashboard";
import classes from "./SideBar.module.css";
import Requests from "../Requests/Requests";

const SideBar = () => {
  const [selectedId, setSelectedId] = useState(1);

  const [maxHeight, setMaxHeight] = useState(
    () => document.documentElement.clientHeight
  );

  useEffect(() => {
    const updateMaxHeight = () => {
      const newMaxHeight = document.documentElement.clientHeight;
      setMaxHeight(newMaxHeight);
    };

    window.addEventListener("resize", updateMaxHeight);

    updateMaxHeight();

    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, []);

  const clickHandler = (id) => {
    setSelectedId(id);
  };

  const menuItems = [
    {
      id: 1,
      label: "Appointments",
      icon: "fa-regular fa-calendar-check fa-xl",
    },
    {
      id: 2,
      label: "Patients",
      icon: "fas fa-users fa-xl",
    },
    {
      id: 3,
      label: "Dashboard",
      icon: "fas fa-th-large fa-xl",
    },
    {
      id: 4,
      label: "Request",
      icon: "far fa-list-alt fa-xl",
    },
  ];

  return (
    <>
      <div className={classes["side-bar"]} style={{ height: maxHeight }}>
        <img
          src="/Images/logo-icon-trans 1.svg"
          alt="connected clinic"
          className={classes.logo}
        />
        <div className={`${classes["sb-menu"]} text-medium`}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => clickHandler(item.id)}
              className={`${selectedId === item.id && classes.clicked} `}
            >
              <span
                className={`${classes.bar} ${
                  selectedId === item.id && classes.active
                }`}
              ></span>
              <i className={item.icon}></i>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
        <div className={`${classes.logout} text-medium`}>
          <span className={classes.bar}></span>
          <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
          <p>Log Out</p>
        </div>
      </div>
      <div className={classes.container}>
        {selectedId === 1 && <Appointments />}
        {selectedId === 2 && <Patients />}
        {selectedId === 3 && <Dashboard />}
        {selectedId === 4 && <Requests />}
      </div>
    </>
  );
};

export default SideBar;
