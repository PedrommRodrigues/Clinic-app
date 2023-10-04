import React, { useEffect, useState } from "react";
import classes from "./MenuContainer.module.css";

const MenuContainer = ({ title, headerSection, children }) => {
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

  return (
    <div
      className={classes.section}
      style={{ maxWidth: maxWidth, width: "95%" }}
    >
      <div className={classes["section-header"]}>
        <h1 className="text-h4">{title}</h1>
        <div className={classes.menu}>{headerSection}</div>
      </div>
      <div className={classes["card-section"]}>{children}</div>
    </div>
  );
};

export default MenuContainer;
