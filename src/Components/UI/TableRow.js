import React, { useContext } from "react";
import classes from "./TableRow.module.css";
import PatientContext from "../Store/patient-context";

const TableRow = ({ renderType, phone, covid, apptId }) => {
  const patientCtx = useContext(PatientContext);

  const { removeAppointment, mergedAppointments } = patientCtx;

  const getPatientDataByPttNumber = (apptId) => {
    for (const patient of mergedAppointments) {
      if (patient.name === apptId) {
        return patient;
      }
    }
    return null;
  };

  const patientData = getPatientDataByPttNumber(apptId);
  console.log(patientData);

  if (renderType === "requests") {
    return (
      <tr className={classes.table}>
        <th className={classes.text}>
          Phone: <span>{phone}</span>
        </th>
        <td
          style={{
            color: covid === "No Covid" ? "#06A689" : "red",
          }}
        >
          {covid}
        </td>
      </tr>
    );
  } else if (renderType === "appointments") {
    return (
      <tr className={classes.table}>
        <th className={classes.eligible}>
          <div>
            <img
              style={{
                opacity:
                  patientData.Wellness === undefined ||
                  patientData.Wellness === ""
                    ? "0"
                    : "1",
              }}
              src="./Images/icons/check-one.svg"
            />
            <span
              style={{
                color:
                  patientData.Wellness === undefined ||
                  patientData.Wellness === ""
                    ? "#A1ACB1"
                    : "#06A689",
              }}
              className="text-medium"
            >
              {" "}
              Wellness Screen{" "}
            </span>
          </div>
          <div>
            <img
              style={{
                opacity:
                  patientData.RPM === undefined || patientData.RPM === ""
                    ? "0"
                    : "1",
              }}
              src="./Images/icons/check-one.svg"
            />
            <span
              style={{
                color:
                  patientData.RPM === undefined || patientData.RPM === ""
                    ? "#A1ACB1"
                    : "#06A689",
              }}
              className="text-medium"
            >
              {" "}
              RPM{" "}
            </span>
          </div>
          <div>
            <img
              style={{
                opacity:
                  patientData.CCM === undefined || patientData.CCM === ""
                    ? "0"
                    : "1",
              }}
              src="./Images/icons/check-one.svg"
            />
            <span
              style={{
                color:
                  patientData.CCM === undefined || patientData.CCM === ""
                    ? "#A1ACB1"
                    : "#06A689",
              }}
              className="text-medium"
            >
              {" "}
              CCM{" "}
            </span>
          </div>
        </th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <div
            className={classes.cancel}
            onClick={() => removeAppointment(patientData.id)}
          >
            <div className={classes.icon}>
              <div className={classes.button}></div>
              <img src="./Images/icons/close.svg" />
            </div>
            <div className={classes["cancel-text"]}>Cancel appointment</div>
          </div>
        </td>
      </tr>
    );
  }
};

export default TableRow;
