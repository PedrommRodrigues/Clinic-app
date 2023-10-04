import React from "react";
import classes from "./Card.module.css";

const Card = ({ title, children }) => {
  return (
    <section className={classes.add}>
      <div className={classes["add-card"]}>
        <div className={classes["create-header"]}>
          <h3 className={classes["text-h3"]}>{title}</h3>
        </div>
        <form>{children}</form>
      </div>
    </section>
  );
};

export default Card;
