import React, { useState, useContext } from "react";
import classes from "./smallMenu.module.css";
import PatientContext from "../Store/patient-context";

const SmallMenu = ({
  menuType,
  onTypeSelected,
  onEligibleSelected,
  onProviderSelected,
  selected,
}) => {
  const patientCtx = useContext(PatientContext);

  const { providers } = patientCtx;

  const [hover, setHover] = useState(null);

  const onTypeItemSelected = (typeLabel) => {
    onTypeSelected(typeLabel === "All" ? "All" : typeLabel);
  };

  const notChecked = (
    <img src="./Images/icons/radio-button.svg" alt="radio-button" />
  );

  const checked = (
    <img src="./Images/icons/radio-button-checked.svg" alt="radio-button" />
  );

  const checkBox = <img src="./Images/icons/check-box.svg" alt="check box" />;

  const checkBoxChecked = (
    <img src="./Images/icons/check-box-checked.svg" alt="checkbox checked" />
  );
  const type = [
    {
      id: 0,
      label: "All",
    },
    {
      id: 1,
      label: "Video Consults",
    },
    {
      id: 2,
      label: "Consults In Person",
    },
  ];

  const eligible = [
    {
      id: 0,
      label: "All",
    },
    {
      id: 1,
      label: "Wellness Screen",
    },
    {
      id: 2,
      label: "RPM",
    },
    {
      id: 3,
      label: "CCM",
    },
  ];

  const enrolled = [
    {
      id: 0,
      label: "All Patients",
    },
    {
      id: 1,
      label: "Wellness Screen",
    },
    {
      id: 2,
      label: "Enrolled in RPM",
    },
    {
      id: 3,
      label: "Enrolled in CCM",
    },
  ];

  if (menuType === "type") {
    return (
      <div className={classes.container}>
        {type.map((typeItem) => (
          <div
            key={typeItem.id}
            onMouseEnter={() => setHover(typeItem.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onTypeItemSelected(typeItem.label)}
          >
            {selected === typeItem.label || hover === typeItem.id
              ? checked
              : notChecked}
            <p onClick={() => onTypeItemSelected(typeItem.label)}>
              {typeItem.label}
            </p>
          </div>
        ))}
      </div>
    );
  } else if (menuType === "eligible") {
    return (
      <div className={classes.container}>
        {eligible.map((eligible) => (
          <div
            key={eligible.id}
            onMouseEnter={() => setHover(eligible.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onEligibleSelected(eligible.label)}
          >
            {selected === eligible.label || hover === eligible.id
              ? checkBoxChecked
              : checkBox}
            <p>{eligible.label}</p>
          </div>
        ))}
      </div>
    );
  } else if (menuType === "enrolled") {
    return (
      <div className={classes.container}>
        {enrolled.map((enrolled) => (
          <div
            key={enrolled.id}
            onMouseEnter={() => setHover(enrolled.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onEligibleSelected(enrolled.label)}
          >
            {selected === enrolled.label || hover === enrolled.id
              ? checkBoxChecked
              : checkBox}
            <p>{enrolled.label}</p>
          </div>
        ))}
      </div>
    );
  } else if (menuType === "provider") {
    return (
      <div className={classes.container}>
        {providers.map((dr) => (
          <div
            key={dr.id}
            onMouseEnter={() => setHover(dr.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onProviderSelected(dr.label)}
          >
            {selected === dr.label || hover === dr.id
              ? checkBoxChecked
              : checkBox}
            <p>{dr.label}</p>
          </div>
        ))}
      </div>
    );
  }
};

export default SmallMenu;
