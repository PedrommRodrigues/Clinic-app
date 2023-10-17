import React, { useState, useContext } from "react";
import classes from "./Requests.module.css";
import PatientContext from "../Store/patient-context";
import TableRow from "../UI/TableRow";

const Incoming = ({ filterText, providerLabel, incomingNumber }) => {
  const patientCtx = useContext(PatientContext);

  const { mergedAppointments, addAppointment } = patientCtx;

  const [appointmentsToRender, setAppointmentsToRender] =
    useState(mergedAppointments);

  incomingNumber(appointmentsToRender.length);

  const videocallImg = (
    <img
      src="/Images/icons/camera.svg"
      alt="camera"
      style={{ marginRight: "18px" }}
    />
  );

  const boyImg = (
    <img src="/Images/boy.svg" alt="boy" style={{ marginRight: "18px" }} />
  );

  const [details, setDetails] = useState({});

  const openDetails = (id) => {
    setDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  /* ----------------------------- button section ----------------------------- */

  const cancelButton = (id) => {
    const updatedAppointments = sortedAppointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointmentsToRender(updatedAppointments);
  };

  /* ----------------------------- Sorting section ---------------------------- */

  const sortedAppointments = [...appointmentsToRender].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    const yearDiff = dateA.getFullYear() - dateB.getFullYear();
    if (yearDiff !== 0) {
      return yearDiff;
    }

    const monthDIff = dateA.getMonth() - dateB.getMonth();
    if (monthDIff !== 0) {
      return monthDIff;
    }

    return dateA.getDate() - dateB.getDate();
  });

  console.log(sortedAppointments.length);
  /* ------------------------------- Data format ------------------------------ */

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const monthLong = dateObj.toLocaleString("en-US", {
      month: "long",
    });
    const monthShort = monthLong.slice(0, 3);
    return `${day} ${monthShort}`;
  };

  /* ---------------------------- Filtering section --------------------------- */

  const filteringSection = () => {
    let filterAppt = [...sortedAppointments];

    switch (providerLabel) {
      case "Dr Antoine Brown":
      case "Dr Arlene McCoy":
      case "Dr Kristin Watson":
      case "Dr Eleanor Pena":
      case "Dr Margaret Lim":
        filterAppt = filterAppt.filter(
          (item) => item.provider === providerLabel
        );
        break;
      default:
        filterAppt = filterAppt;
    }

    if (filterText !== "") {
      filterAppt = filterAppt.filter((item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    return filterAppt;
  };

  const tableHeader = [
    {
      id: 1,
      label: "Patient",
    },
    {
      id: 2,
      label: "Reason",
    },
    {
      id: 3,
      label: "Appointment",
    },
    {
      id: 4,
      label: "Provider",
    },
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
          {filteringSection().map((patient) => {
            const age = (birthday) => {
              const today = new Date().getFullYear();
              const clientAge = new Date(birthday).getFullYear();
              return today - clientAge;
            };

            const clientAge = age(patient.birthday);

            return (
              <React.Fragment key={patient.id}>
                <tr className={details[patient.id] && classes.border}>
                  <th>
                    {patient.name}
                    <div className="text-medium" style={{ color: "#A1ACB1" }}>
                      {clientAge}yo ({patient.birthday})
                    </div>
                  </th>
                  <td>
                    <div className={classes.reason}>{patient.reason}</div>
                  </td>
                  <td className={classes["call-type"]}>
                    {patient.type === `videocall` ? videocallImg : boyImg}
                    <div className={`${classes.column} ${classes.centered}`}>
                      <div>{formatDate(patient.date)}</div>
                      <div className={classes.time}>11:30 am</div>
                    </div>
                  </td>
                  <td>{patient.provider}</td>
                  <td className={classes.buttons}>
                    <button
                      className={`${classes["spacing-btn"]} btn-cancel-sm`}
                      onClick={() => cancelButton(patient.id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-accept-sm"
                      onClick={() => cancelButton(patient.id)}
                    >
                      Confirm
                    </button>
                    <img
                      onClick={() => openDetails(patient.id)}
                      style={{
                        transform: `rotate(${
                          details[patient.id] ? 180 : 0
                        }deg)`,
                        transition: "all .25s",
                        marginRight: "18px",
                        cursor: "pointer",
                      }}
                      className={classes["spacing-img"]}
                      src="/Images/icons/chevron.svg"
                      alt="arrow down"
                    />
                  </td>
                </tr>
                {details[patient.id] && (
                  <TableRow
                    renderType="requests"
                    phone={patient.contact}
                    covid={patient.covidStatus}
                  />
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Incoming;
