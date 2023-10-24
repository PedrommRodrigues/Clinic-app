import React, { useState } from "react";
import classes from "./Requests.module.css";
import PatientContext from "../Store/patient-context";

const Medication = ({ settingRequestNumber }) => {
  const tableHeader = [
    {
      id: 1,
      label: "Patient",
    },
    {
      id: 2,
      label: "Date",
    },
    {
      id: 3,
      label: "Medication name",
    },
    {
      id: 4,
      label: "Dosage",
    },
    {
      id: 5,
      label: "Frequency",
    },
    {
      id: 6,
      label: "",
    },
  ];

  /* ----------------------- button functionality ----------------------- */

  const [dataToRender, setDataToRender] = useState([
    {
      id: "0",
      name: "Cameron Williamson",
      birthday: "21.08.1975",
      date: "21 Jan 2023",
      medName: "Advil",
      dosage: "500mg",
      frequency: "Once a day",
    },
    {
      id: "1",
      name: "Ronald Richards",
      birthday: "21.08.1966",
      date: "21 Jan 2023",
      medName: "Advil",
      dosage: "500mg",
      frequency: "Once a day",
    },
  ]);

  const cancelButton = (id) => {
    const newTableData = dataToRender.filter((item) => item.id !== id);
    setDataToRender(newTableData);
  };

  settingRequestNumber(dataToRender.length);

  return (
    <div className={classes["patient-list-container"]}>
      <table className={classes.table}>
        <thead className="text-semibold">
          <tr>
            {tableHeader.map((item) => (
              <th key={item.id}>{item.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataToRender.map((patient) => {
            const age = (birthday) => {
              const today = new Date().getFullYear();
              const clientAge = new Date(birthday).getFullYear();
              return today - clientAge;
            };

            const clientAge = age(patient.birthday);

            return (
              <React.Fragment key={patient.id}>
                <tr>
                  <th>
                    {patient.name}
                    <div className="text-medium" style={{ color: "#A1ACB1" }}>
                      {clientAge}yo ({patient.birthday})
                    </div>
                  </th>
                  <td>{patient.date}</td>
                  <td>{patient.medName}</td>
                  <td>{patient.dosage}</td>
                  <td>{patient.frequency}</td>
                  <td>
                    <div className={classes.buttons}>
                      <button
                        style={{ marginRight: "18px" }}
                        className="btn-accept-sm"
                        onClick={() => cancelButton(patient.id)}
                      >
                        Cancel
                      </button>
                      <button
                        style={{ marginRight: "18px" }}
                        className={classes["call-green"]}
                        onClick={() => cancelButton(patient.id)}
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Medication;
