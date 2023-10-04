import React, { useState, useContext, useEffect, useRef } from "react";
import NewClient from "./NewClient";
import Schedule from "./Schedule";
import classes from "./Patients.module.css";
import MenuContainer from "../UI/MenuContainer";
import PatientContext from "../Store/patient-context";
import SmallMenu from "../UI/SmallMenu";

const Patients = () => {
  const patientHeader = [
    {
      id: 1,
      label: "Patient",
    },
    {
      id: 2,
      label: "Provider",
    },
    {
      id: 3,
      label: "Appointment",
    },
    {
      id: 4,
      label: "Eligible for",
    },
    {
      id: 5,
      label: "",
    },
  ];

  const patientCtx = useContext(PatientContext);

  const { patientList } = patientCtx;

  const [displayClientCard, setDisplayClientCard] = useState(false);

  const [seletectPatient, setSelectedPatient] = useState(null);

  const [displayScheduleCard, setDisplayScheduleCard] = useState(false);

  const schHandler = (selectedPatient) => {
    setSelectedPatient(selectedPatient);
    setDisplayScheduleCard(!displayScheduleCard);
  };

  const patientHandler = () => {
    setDisplayClientCard(!displayClientCard);
  };

  /* -------------------------- Display filter menus -------------------------- */

  const [eligibleLabel, setEligibleLabel] = useState("All Patients");

  const [providerLabel, setProviderLabel] = useState("All Providers");

  const [isEligibleMenuOpen, setIsEligibleMenuOpen] = useState(false);

  const [isProviderMenuOpen, setIsProviderMenuOpen] = useState(false);

  const onEligibleSelected = (eligibleLabel) => {
    setEligibleLabel(eligibleLabel);
    setIsEligibleMenuOpen(!isEligibleMenuOpen);
  };

  const onProviderSelected = (providerLabel) => {
    setProviderLabel(providerLabel);
    setIsProviderMenuOpen(!isProviderMenuOpen);
  };

  const openEligibleMenu = () => {
    setIsEligibleMenuOpen(!isEligibleMenuOpen);
    if (isProviderMenuOpen) {
      setIsProviderMenuOpen(!isProviderMenuOpen);
    }
  };

  const openProviderMenu = () => {
    setIsProviderMenuOpen(!isProviderMenuOpen);

    if (isEligibleMenuOpen) {
      setIsEligibleMenuOpen(!isEligibleMenuOpen);
    }
  };

  /* ------------------------------ Closing menus ----------------------------- */

  const patientsRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsEligibleMenuOpen(false);
        setIsProviderMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (patientsRef.current && !patientsRef.current.contains(e.target)) {
        setIsEligibleMenuOpen(false);
        setIsProviderMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ---------------------------------- Filter section  ---------------------------------- */

  const [searchText, setSearchText] = useState("");

  const searchFilter = (e) => {
    let searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
  };

  const renderPatients = () => {
    let patientListFiltered = [];

    switch (eligibleLabel) {
      case "Wellness Screen":
        patientListFiltered = patientList.filter(
          (item) => item.Wellness === "Wellness"
        );
        break;
      case "Enrolled in RPM":
        patientListFiltered = patientList.filter((item) => item.RPM === "RPM");
        break;
      case "Enrolled in CCM":
        patientListFiltered = patientList.filter((item) => item.CCM === "CCM");
        break;
      default:
        patientListFiltered = patientList;
    }

    switch (providerLabel) {
      case "Dr Antoine Brown":
      case "Dr Arlene McCoy":
      case "Dr Kristin Watson":
      case "Dr Eleanor Pena":
      case "Dr Margaret Lim":
        patientListFiltered = patientListFiltered.filter(
          (item) => item.provider === providerLabel
        );
        break;
      default:
        patientListFiltered = patientListFiltered;
    }

    if (searchText !== "") {
      patientListFiltered = patientListFiltered.filter((patient) =>
        patient.name.toLowerCase().includes(searchText)
      );
    }
    return patientListFiltered;
  };

  return (
    <MenuContainer
      title="Patients"
      headerSection={
        <>
          <div onClick={patientHandler} className={classes["new-patient"]}>
            <i className={`$ fa-solid fa-circle-plus fa-xl`} />
            <p>Add new Patient</p>
          </div>
        </>
      }
    >
      <div>
        <div className={classes["table-header"]}>
          <p className={`${classes.counter} text-h4`}>
            {patientList.length}{" "}
            <span style={{ fontWeight: "400" }}>patients total</span>
          </p>
          <div className={classes["header-container"]}>
            <div className={classes["header-menu"]}>
              <div>
                <div className={classes.menu} onClick={openEligibleMenu}>
                  <p className={"text-main"}>{eligibleLabel}</p>
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
                    ref={patientsRef}
                    className={classes["small-menu-container"]}
                  >
                    <SmallMenu
                      menuType={"enrolled"}
                      selected={eligibleLabel}
                      onEligibleSelected={onEligibleSelected}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className={classes.menu} onClick={openProviderMenu}>
                  <p className={"text-main"}>{providerLabel} </p>
                  <img
                    style={{
                      transform: `rotate(${isProviderMenuOpen ? 180 : 0}deg)`,
                      transition: "all .25s",
                    }}
                    src="./Images/icons/chevron.svg"
                  />
                </div>
                {isProviderMenuOpen && (
                  <div
                    ref={patientsRef}
                    className={classes["small-menu-container"]}
                  >
                    <SmallMenu
                      menuType={"provider"}
                      selected={providerLabel}
                      onProviderSelected={onProviderSelected}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className={classes["search-container"]}>
                  <input
                    type="text"
                    onChange={searchFilter}
                    className={classes["search-input"]}
                    placeholder="Search..."
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
          <table border="1" frame="void" rules="rows">
            <thead className="text-semibold">
              <tr>
                {patientHeader.map((items) => (
                  <th key={items.id}>{items.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderPatients().map((item) => (
                <tr key={item.pttNumber}>
                  <th>
                    <div>{item.name}</div>
                    <div className={classes.united}>
                      <img src="/Images/icons/United.svg" />
                      <p className="text-medium" style={{ color: "#A1ACB1" }}>
                        United Healthcare
                      </p>
                    </div>
                  </th>
                  <td>{item.provider}</td>
                  <td>
                    <button
                      onClick={() => schHandler(item)}
                      className={classes.details}
                    >
                      Schedule appointment
                    </button>
                  </td>
                  <td className={`text-medium`}>
                    <div className={classes.eligible}>
                      <div>
                        <img
                          src="./Images/icons/check-one.svg"
                          alt="checked"
                          style={{
                            opacity:
                              item.Wellness === undefined ||
                              item.Wellness === ""
                                ? "0"
                                : "1",
                          }}
                        />
                        <span
                          style={{
                            color:
                              item.Wellness === undefined ||
                              item.Wellness === ""
                                ? "#A1ACB1"
                                : "#06A689",
                          }}
                        >
                          Wellness Screen
                        </span>
                      </div>
                      <div>
                        <img
                          src="./Images/icons/check-one.svg"
                          alt="checked"
                          style={{
                            opacity:
                              item.RPM === undefined || item.RPM === ""
                                ? "0"
                                : "1",
                          }}
                        />
                        <span
                          style={{
                            color:
                              item.RPM === undefined || item.RPM === ""
                                ? "#A1ACB1"
                                : "#06A689",
                          }}
                        >
                          RPM
                        </span>
                      </div>
                      <div>
                        <img
                          src="./Images/icons/check-one.svg"
                          alt="checked"
                          style={{
                            opacity:
                              item.CCM === undefined || item.CCM === ""
                                ? "0"
                                : "1",
                          }}
                        />
                        <span
                          style={{
                            color:
                              item.CCM === undefined || item.CCM === ""
                                ? "#A1ACB1"
                                : "#06A689",
                          }}
                        >
                          CCM
                        </span>
                      </div>
                    </div>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {displayClientCard === true && <NewClient onClosing={patientHandler} />}
      {displayScheduleCard === true && (
        <Schedule onClosing={schHandler} seletectPatient={seletectPatient} />
      )}
    </MenuContainer>
  );
};

export default Patients;
