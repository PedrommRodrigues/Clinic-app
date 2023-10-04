import React from "react";
import classes from "./Requests.module.css";

const Medication = () => {
  const tableHeader = [
    {
      id: 1,
      label: "Patient"
    },
    {
      id: 2,
      label: "Date"
    },
    {
      id: 3,
      label: "Medication name"
    },
    {
      id: 4,
      label: "Dosage"
    },
    {
      id: 5,
      label: "Frequency"
    },
    {
      id: 6,
      label: ""
    }
  ];

  const tableData = [
    {
      id: "0",
      name: "Cameron Williamson",
      birthday: "21.08.1975",
      date: "21 Jan 2023",
      medName: "Advil",
      dosage: "500mg",
      frequency: "Once a day"
    },
    {
      id: "1",
      name: "Ronald Richards",
      birthday: "21.08.1966",
      date: "21 Jan 2023",
      medName: "Advil",
      dosage: "500mg",
      frequency: "Once a day"
    }
  ];

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
          {tableData.map((patient) => {
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
                    <div>
                      <button className="btn-accept-sm">Appointment</button>
                      <button className="btn-cancel-sm green">Approve</button>
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
