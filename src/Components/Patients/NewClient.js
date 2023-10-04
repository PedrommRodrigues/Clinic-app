import React, { useState, useContext, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./NewClient.module.css";
import PatientContext from "../Store/patient-context";
import Modal from "../UI/Modal";

const NewClient = (props) => {
  const patientCtx = useContext(PatientContext);

  const addPatient = patientCtx.addPatient;

  const [formValues, setFormValues] = useState({
    name: "",
    birthday: "",
    address: "",
    contact: "",
    email: "",
    provider: "Dr.Margaret Lim",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === "birthday") {
      const birthYear = new Date(value).getFullYear();
      const today = new Date().getFullYear();
      setFormValues((prevValues) => ({
        ...prevValues,
        age: today - birthYear,
      }));
    }
  }

  function handleCheckboxChange(e) {
    const { id, checked } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: checked ? id : "",
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    addPatient({
      ...formValues,
      pttNumber: Math.floor(Math.random() * 100),
      appt: <button className={classes.details}>Schedule appointment</button>,
    });
    props.onClosing();
  }

  /* ------------------- Submit and close by keyboard input ------------------- */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        props.onClosing();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ---------------------------- Form validations ---------------------------- */

  const isContactPatternValid = () => {
    const nonLetterPattern = /^[^A-Za-z]+$/;
    const contact = formValues.contact;
    const isContactValid = contact === "" || nonLetterPattern.test(contact);
    return isContactValid;
  };

  const isEmailPatternValid = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const email = formValues.email;
    const isEmailValid = email === "" || emailPattern.test(email);

    return isEmailValid;
  };

  return (
    <>
      <Modal>
        <Card className={classes.test} title="Create new patient">
          <label style={{ marginTop: "15px" }}>Name </label>
          <div className={classes["select-wrapper"]}>
            <input
              className={classes.input}
              name="name"
              onChange={handleChange}
              value={formValues.cName}
              type="text"
              required
            />
          </div>
          <label>Birthday</label>
          <input
            className={classes.input}
            name="birthday"
            type="date"
            onChange={handleChange}
            value={formValues.birthday}
            min="1950-01-01"
            max="2027-12-31"
            required
          />
          <label>Address</label>
          <input
            className={classes.input}
            name="address"
            type="text"
            onChange={handleChange}
            value={formValues.address}
            required
          />
          <label>Contact</label>
          <input
            className={classes.input}
            name="contact"
            type="tel"
            value={formValues.contact}
            onChange={handleChange}
            onBlur={() => isContactPatternValid(formValues.contact)}
            style={{
              border: isContactPatternValid()
                ? "1px solid #a1acb1"
                : "1px solid red",
            }}
            required
          />
          <label>Email</label>
          <input
            className={classes.input}
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            onBlur={() => isEmailPatternValid(formValues.email)}
            style={{
              border: isEmailPatternValid()
                ? "1px solid #a1acb1"
                : "1px solid red",
            }}
            required
          />
          <label>Select provider</label>
          <select
            className={classes.selected}
            name="provider"
            onChange={handleChange}
          >
            <option>Dr Margaret Lim</option>
            <option>Dr Antoine Brown</option>
            <option>Dr Arlene Brown</option>
            <option>Dr Kristin Watson</option>
            <option>Dr Eleanor Pena</option>
          </select>
          <div className={classes["nc-checkbox"]}>
            <div className={classes.pointer}>
              <input
                className={classes.input}
                onChange={handleCheckboxChange}
                type="checkbox"
                id="Wellness"
              ></input>
              <label htmlFor="Wellness">Wellness Screen</label>
            </div>
            <div>
              <input
                className={classes.input}
                onChange={handleCheckboxChange}
                type="checkbox"
                id="CCM"
              ></input>
              <label htmlFor="CCM">CCM</label>
            </div>
            <div>
              <input
                className={classes.input}
                onChange={handleCheckboxChange}
                type="checkbox"
                id="RPM"
              ></input>
              <label htmlFor="RPM">RPM</label>
            </div>
          </div>
          <div className={classes["submit-section"]}>
            <button
              onClick={props.onClosing}
              className="btn-cancel text-medium"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className={`btn-accept text-medium ${
                !(
                  formValues.name &&
                  formValues.birthday &&
                  formValues.contact &&
                  formValues.provider
                ) && "disabled"
              }`}
              disabled={
                !(
                  formValues.name &&
                  formValues.birthday &&
                  formValues.contact &&
                  formValues.provider
                )
              }
            >
              Create new client
            </button>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default NewClient;
