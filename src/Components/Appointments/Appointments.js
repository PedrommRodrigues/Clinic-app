import React, { useState, useContext, useEffect, useRef } from "react";
import classes from "./appointments.module.css";
import MenuContainer from "../UI/MenuContainer";
import PatientContext from "../Store/patient-context";
import TableRow from "../UI/TableRow";
import SmallMenu from "../UI/SmallMenu";

const Appointments = () => {
  const notChecked = <img src="/Images/icons/check-one.svg" alt="checked" />;
  const checked = <img src="/Images/icons/check-double.svg" alt="checked" />;

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
      label: "COVID Status",
    },
    {
      id: 5,
      label: "Actions",
    },
    {
      id: 6,
      label: "",
    },
  ];

  const patientCtx = useContext(PatientContext);

  const { mergedAppointments } = patientCtx;

  const [details, setDetails] = useState({});

  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState("");

  const [typeName, setTypeName] = useState("All");

  const [isEligibleMenuOpen, setIsEligibleMenuOpen] = useState("");

  const [eligibleType, setEligibleType] = useState("All");

  const [check, setCheck] = useState({});

  const [call, setCall] = useState({});

  /* ----------------------------- Date formating ----------------------------- */

  const today = new Date().getDate();
  const month = new Date().toLocaleString("en-US", { month: "short" });
  const year = new Date().getFullYear();
  const formattedTitleDate = `${today} ${month} ${year}`;

  /* ----------------------------- Menu handling ----------------------------- */

  const selectType = () => {
    setIsTypeMenuOpen(!isTypeMenuOpen);

    if (isEligibleMenuOpen === true) {
      setIsEligibleMenuOpen(false);
    }
  };

  const onTypeSelected = (typeLabel) => {
    setIsTypeMenuOpen(!isTypeMenuOpen);
    setTypeName(typeLabel);
  };

  const onEligibleSelected = (eligibleLabel) => {
    setEligibleType(eligibleLabel);
    setIsEligibleMenuOpen(!isEligibleMenuOpen);
  };

  const eligibleFor = () => {
    setIsEligibleMenuOpen(!isEligibleMenuOpen);
    if (isTypeMenuOpen === true) {
      setIsTypeMenuOpen(false);
    }
  };

  const openDetails = (id) => {
    setDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsEligibleMenuOpen(false);
        setIsTypeMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsEligibleMenuOpen(false);
        setIsTypeMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const checkIn = (id) => {
    setCheck((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const callIn = (id) => {
    setCall((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  /* ----------------------------- Sorting section ---------------------------- */

  const sortedAppointments = [...mergedAppointments].sort((a, b) => {
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

  /* ----------------------------- Filter Section ----------------------------- */

  const [searchText, setSearchText] = useState("");

  const filteringSection = () => {
    let filterAppt = [];

    switch (typeName) {
      case "Video Consults":
        filterAppt = sortedAppointments.filter(
          (item) => item.type === "videocall"
        );
        break;
      case "Consults In Person":
        filterAppt = sortedAppointments.filter(
          (item) => item.type === "In-Person"
        );
        break;
      default:
        filterAppt = sortedAppointments;
    }

    switch (eligibleType) {
      case "Wellness Screen":
        filterAppt = filterAppt.filter((item) => item.Wellness === "Wellness");
        break;
      case "RPM":
        filterAppt = filterAppt.filter((item) => item.RPM === "RPM");
        break;
      case "CCM":
        filterAppt = filterAppt.filter((item) => item.CCM === "CCM");
        break;
    }

    if (searchText !== "") {
      filterAppt = filterAppt.filter((item) =>
        item.name.toLowerCase().includes(searchText)
      );
    }
    return filterAppt;
  };

  const searchFilter = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  /* ------------------------------- Time format ------------------------------ */

  function convertTo12HourFormat(time24) {
    // Split the input time string into hours and minutes
    const [hours, minutes] = time24.split(":").map(Number);

    // Determine whether it's AM or PM
    const period = hours >= 12 ? "pm" : "am";

    // Convert hours to 12-hour format
    const hours12 = hours % 12 === 0 ? 12 : hours % 12;

    // Format the result
    const time12 = `${hours12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    return time12;
  }

  const videocallImg = (
    <img
      src="/Images/icons/Camera.svg"
      alt="camera"
      style={{ marginRight: "18px", marginTop: "10px" }}
    />
  );

  const inPersonImg = (
    <img
      src="/Images/boy.svg"
      alt="person"
      style={{ marginRight: "18px", marginTop: "10px" }}
    />
  );

  return (
    <MenuContainer
      title="Appointments"
      headerSection={
        <>
          <div className={classes.list}>
            <i className="fa-solid fa-list" style={{ color: "#06A689" }}></i>
            <p style={{ color: "#06A689" }}>List</p>
          </div>
          <div>
            <i className="fa-solid fa-calendar-days"></i>
            <p>Calendar</p>
          </div>
        </>
      }
    >
      <div>
        <div className={classes["table-header"]}>
          <p className={`${classes.counter} text-h4`}>
            {" "}
            {mergedAppointments.length} appointments{" "}
            <span style={{ fontWeight: "400" }}>for</span>{" "}
            <strong style={{ color: "#3783F5" }}>{formattedTitleDate}</strong>
          </p>
          <div className={classes["header-container"]}>
            <div className={classes["header-menu"]}>
              <div>
                <div className={classes.menu} onClick={selectType}>
                  <p className={"text-main"}>Type: {typeName}</p>
                  <img
                    style={{
                      transform: `rotate(${isTypeMenuOpen ? 180 : 0}deg)`,
                      transition: "all .25s",
                    }}
                    src="./Images/icons/chevron.svg"
                  />
                </div>
                {isTypeMenuOpen && (
                  <div
                    ref={menuRef}
                    className={classes["small-menu-container"]}
                  >
                    <SmallMenu
                      onTypeSelected={onTypeSelected}
                      selected={typeName}
                      menuType={"type"}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className={classes.menu} onClick={eligibleFor}>
                  <p className={"text-main"}>Eligible for: {eligibleType} </p>
                  <img
                    style={{
                      transform: `rotate(${isEligibleMenuOpen ? 180 : 0}deg)`,
                      transition: "all .25s",
                    }}
                    src="./Images/icons/chevron.svg"
                  />
                </div>
                {isEligibleMenuOpen && (
                  <div
                    ref={menuRef}
                    className={classes["small-menu-container"]}
                  >
                    <SmallMenu
                      onEligibleSelected={onEligibleSelected}
                      selected={eligibleType}
                      menuType={"eligible"}
                      onFocus={console.log(sortedAppointments)}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className={classes["search-container"]}>
                  <input
                    type="text"
                    className={classes["search-input"]}
                    placeholder="Search..."
                    onChange={searchFilter}
                    onFocus={() =>
                      console.log(
                        "this is from appt - mergedappt",
                        mergedAppointments
                      )
                    }
                  />
                  <img
                    src="./Images/icons/lupe.svg"
                    className={classes["search-icon"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["patient-list-container"]}>
          <table>
            <thead className="text-semibold">
              <tr>
                {tableHeader.map((item) => (
                  <th key={item.id}>{item.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteringSection().map((appt) => {
                const formatDate = (date) => {
                  const dateObj = new Date(date);
                  const day = dateObj.getDate();
                  const monthLong = dateObj.toLocaleString("en-US", {
                    month: "long",
                  });
                  const monthShort = monthLong.slice(0, 3);
                  return `${day} ${monthShort}`;
                };

                return (
                  <React.Fragment key={appt.id}>
                    <tr className={details[appt.id] && classes.border}>
                      <th>
                        <div className={classes.united}>
                          {appt.name}
                          {!call[appt.id] && !check[appt.id] ? (
                            <img
                              src="/Images/icons/check-one.svg"
                              style={{ opacity: 0 }}
                            />
                          ) : (
                            " "
                          )}
                          {call[appt.id] && !check[appt.id]
                            ? notChecked
                            : check[appt.id] && checked}
                        </div>
                        <div className={classes.united}>
                          <img src="/Images/icons/United.svg" />
                          <p
                            className="text-medium"
                            style={{ color: "#A1ACB1" }}
                          >
                            United Healthcare
                          </p>
                        </div>
                      </th>
                      <td>{appt.reason}</td>
                      <td className={classes.center}>
                        <div className={classes.type}>
                          {appt.type === `videocall`
                            ? videocallImg
                            : inPersonImg}
                        </div>
                        <div className={` ${classes.centered}`}>
                          <div> {formatDate(appt.date)}</div>
                          <div>
                            <p className={classes.bold}>
                              {convertTo12HourFormat(appt.time)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td
                        style={{
                          color:
                            appt.covidStatus === "No Covid"
                              ? "#06A689"
                              : "#DE2B13",
                        }}
                      >
                        {appt.covidStatus}
                      </td>
                      <td className={classes.actions}>
                        <button
                          className={`${classes["call-blue"]} text-medium`}
                          onClick={() => callIn(appt.id)}
                          style={{
                            opacity: call[appt.id] ? 0 : 1,
                            cursor: check[appt.id] ? "default" : "pointer",
                          }}
                        >
                          Call
                        </button>
                        <button
                          className={`${classes["call-green"]} text-medium`}
                          onClick={() => checkIn(appt.id)}
                          style={{
                            opacity: check[appt.id] ? 0 : 1,
                            cursor: check[appt.id] ? "default" : "pointer",
                          }}
                          disabled={!call[appt.id]}
                        >
                          Check In
                        </button>
                      </td>
                      <td className={classes.buttons}>
                        <button className={classes.details}>
                          <div className={classes.img}>
                            <img src="/Images/icons/document.svg" />
                          </div>
                        </button>
                        <button className={classes.message}>
                          <div className={classes.img}>
                            <img src="/Images/icons/chat.svg" />
                          </div>
                        </button>
                        <img
                          onClick={() => openDetails(appt.id)}
                          style={{
                            transform: `rotate(${
                              details[appt.id] ? 180 : 0
                            }deg)`,
                            transition: "all .25s",
                            marginRight: "18px",
                            cursor: "pointer",
                          }}
                          className={classes.expand}
                          src="/Images/icons/chevron.svg"
                          alt="expand"
                        />
                      </td>
                    </tr>
                    {details[appt.id] && (
                      <TableRow
                        renderType="appointments"
                        sorted={sortedAppointments}
                        apptId={appt.name}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </MenuContainer>
  );
};

export default Appointments;
