import React, { useState, useEffect } from "react";
import TopCard from "./TopCard";
import classes from "./Dashboard.module.css";
import BottomCard from "./BottomCard";
import PopUp from "./PopUp";

const Dashboard = () => {
  const [selectedId, setSelectedId] = useState(null);

  const selectedCard = (id) => {
    setSelectedId(id);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [maxWidth, setMaxWidth] = useState(
    () => document.documentElement.clientWidth - 200
  );

  useEffect(() => {
    const updateMaxWidth = () => {
      const newMaxWidth = document.documentElement.clientWidth - 180;
      setMaxWidth(newMaxWidth);
    };

    window.addEventListener("resize", updateMaxWidth);

    updateMaxWidth();

    return () => {
      window.removeEventListener("resize", updateMaxWidth);
    };
  }, []);

  const topCards = [
    {
      id: 1,
      icon: "far fa-list-alt fa-xl",
      number: "830",
      label: "Online Request",
      color: "#06a689",
      background: "rgba(6, 166, 137, 0.07)",
    },
    {
      id: 2,
      icon: "fas fa-users fa-xl",
      number: "215",
      label: "Patients Schedule",
      color: "#3783F5",
      background: "rgba(55, 131, 245, 0.07)",
    },
    {
      id: 3,
      icon: "fa-solid fa-video fa-xl",
      number: "134",
      label: "Video Consults",
      color: "#A26BBE",
      background: "rgba(162, 107, 190, 0.07)",
    },
    {
      id: 4,
      icon: "fa-regular fa-star fa-xl",
      number: "4.9",
      label: "Average Rating",
      color: "#E1E812",
      background: "rgba(225, 232, 18, 0.07)",
    },
  ];

  const bottomCards = [
    {
      id: 1,
      number: "84 %",
      label: "AWV Performance Efficiency",
      color: "#06A689",
    },
    {
      id: 2,
      number: "99 %",
      label: "RPM Enrollment Efficiency",
      color: "#05B9C5",
    },
    {
      id: 3,
      number: "$ 4,920",
      label: "RPM Revenue Potential",
      color: "#3783F5",
    },
    {
      id: 4,
      number: "$ 10,500",
      label: "Preventative Care Revenue Potential",
      color: "#A26BBE",
    },
  ];

  return (
    <>
      <div
        className={classes.section}
        style={{ maxWidth: maxWidth, width: "95%" }}
      >
        <div className={classes["section-header"]}>
          <h1 className="text-h4">Welcome, Margaret Lim!</h1>
          <div className={classes.menu}>
            <p className="text-medium ">
              1 Jan 2021 - 31 jan 2021 <i className="fa-solid fa-calendar"></i>
            </p>
          </div>
        </div>
        <div className={classes["card-section"]}>
          <div className={classes["first-row"]}>
            {topCards.map((item) => (
              <div key={item.id} style={{ position: "relative" }}>
                <TopCard
                  onClick={() => selectedCard(item.id)}
                  icon={item.icon}
                  number={item.number}
                  label={item.label}
                  color={item.color}
                  background={item.background}
                />
                {selectedId === item.id && (
                  <PopUp
                    title={item.label}
                    number={item.number}
                    icon={item.icon}
                    color={item.color}
                    background={item.background}
                    id={item.id}
                    selectedCard={selectedCard}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={classes["first-row"]}>
            {bottomCards.map((item) => (
              <BottomCard
                key={item.id}
                number={item.number}
                label={item.label}
                color={item.color}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
