import React, { useState, useContext, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./Schedule.module.css";
import PatientContext from "../Store/patient-context";
import Modal from "../UI/Modal";

const Schedule = (props) => {
  const { onClosing, seletectPatient } = props;

  const patientCtx = useContext(PatientContext);

  const { addAppointment, providers } = patientCtx;

  const [appttValues, setApptValues] = useState({
    id: Math.floor(Math.random() * 100),
    name: "",
    reason: "",
    date: "",
    covidStatus: "",
    type: "",
    callButton: "Call",
    provider: "",
  });

  const handleApptChange = (e) => {
    const { name, value } = e.target;
    let formattedDate = value;

    setApptValues((prevValue) => {
      return {
        ...prevValue,
        name: seletectPatient.name,
        [name]: formattedDate,
      };
    });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    if (id === "videocall" || id === "In-person") {
      setApptValues((prevValue) => ({
        ...prevValue,
        type: checked ? id : "",
      }));
    } else if (id === "No Covid" || id === "Likely Covid") {
      setApptValues((prevValue) => ({
        ...prevValue,
        covidStatus: checked ? id : "",
      }));
    }
  };

  const onAddAppt = (e) => {
    e.preventDefault();
    addAppointment(appttValues);
    onClosing();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        props.onClosing();
      } else if (event.key === "Enter") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const providersToDisplay = providers.filter((dr) => dr.id !== 0);

  return (
    <>
      <Modal>
        <Card title="Schedule an Appointment">
          <div className={classes["client-details"]}>
            <p>Patient</p>
            <p className="text-h4">{seletectPatient.name}</p>
            <p className="text-medium">
              {seletectPatient.age}({seletectPatient.birthday})
            </p>
          </div>
          <div className={`${classes["client-contacts"]} text-main`}>
            <p>
              <i className="fa-solid fa-phone"></i> {seletectPatient.contact}
            </p>
            <p>
              <i className="fa-regular fa-envelope"></i> {seletectPatient.email}
            </p>
            <p>
              <i className="fa-solid fa-location-crosshairs"></i>
              {seletectPatient.address}
            </p>
          </div>

          <label htmlFor="">Provider </label>
          <div className={classes["select-wrapper"]}>
            <select
              className={classes.selected}
              name="provider"
              onChange={handleApptChange}
            >
              <option>Select a provider</option>
              {providersToDisplay.map((dr) => (
                <option>{dr.label}</option>
              ))}
            </select>
          </div>
          <label>Appointment Date</label>
          <input
            className={classes.input}
            onChange={handleApptChange}
            name="date"
            type="date"
            min="2018-01-01"
            max="2030-12-31"
          />
          <label htmlFor="">Appointment Time</label>
          <input
            className={classes.input}
            name="time"
            onChange={handleApptChange}
            type="time"
            min="09:00"
            max="18:00"
          />
          <label htmlFor="">Reason</label>
          <input
            className={classes.input}
            name="reason"
            onChange={handleApptChange}
            type="text"
          />
          <label>Appointment type</label>
          <div className={classes["nc-checkbox"]}>
            <div>
              <input
                onChange={handleCheckboxChange}
                type="checkbox"
                id="videocall"
              ></input>
              <label htmlFor="videocall">Videocall</label>
            </div>
            <div>
              <input
                onChange={handleCheckboxChange}
                type="checkbox"
                id="In-person"
              ></input>
              <label htmlFor="In-person">In-person</label>
            </div>
          </div>
          <label>Covid status</label>
          <div className={classes["nc-checkbox"]}>
            <div>
              <input
                onChange={handleCheckboxChange}
                type="checkbox"
                id="No Covid"
              ></input>
              <label htmlFor="No Covid">No Covid</label>
            </div>
            <div>
              <input
                onChange={handleCheckboxChange}
                type="checkbox"
                id="Likely Covid"
              ></input>
              <label htmlFor="Likely Covid">Likely Covid</label>
            </div>
          </div>
          <div className={classes["submit-section"]}>
            <button onClick={onClosing} className="btn-cancel text-medium">
              Cancel
            </button>
            <button className="btn-accept text-medium" onClick={onAddAppt}>
              Schedule appointment
            </button>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default Schedule;
