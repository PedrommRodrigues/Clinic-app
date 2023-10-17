import React, { useContext, useState, useEffect, useRef } from "react";
import MenuContainer from "../UI/MenuContainer";
import classes from "./Requests.module.css";
import Incoming from "./Incoming";
import Medication from "./Medication";
import SmallMenu from "../UI/SmallMenu";
import PatientContext from "../Store/patient-context";

const Requests = () => {
  const [selectedMenu, setSelectedMenu] = useState("1");
  const [providerLabel, setProviderLabel] = useState("All Providers");

  const patientCtx = useContext(PatientContext);

  const { mergedAppointments } = patientCtx;

  const menuHandler = (id) => {
    setSelectedMenu(id);
  };

  /* ---------------------------------- Updating number of incoming and requests ---------------------------------- */

  const [incomingNumber, setIncomingNumber] = useState("");

  const settingIncomingData = (props) => {
    setIncomingNumber(props);
  };

  const [requestNumber, setRequestNumber] = useState("2");

  const settingRequestNumber = (props) => {
    setRequestNumber(props);
  };
  /* ------------------------------ Display menus ----------------------------- */

  const [isProviderMenuOpen, setIsproviderMenuOpen] = useState(false);

  const onProviderSelected = (providerLabel) => {
    setProviderLabel(providerLabel);
    setIsproviderMenuOpen(false);
  };

  const openMenu = () => {
    setIsproviderMenuOpen(!isProviderMenuOpen);
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsproviderMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsproviderMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ------------------------------ Search filter ----------------------------- */

  const [searchText, setSearchText] = useState("");

  const searchFilter = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  return (
    <MenuContainer title="Incoming Requests">
      <div className={classes["top-section"]}>
        <div className={`${classes.requests} text-h4`}>
          <p
            onClick={() => menuHandler("1")}
            className={
              selectedMenu === "1" ? classes["text-h4-with-border"] : ""
            }
          >
            Incoming Requests ({incomingNumber})
          </p>
          <p
            onClick={() => menuHandler("2")}
            className={
              selectedMenu === "2" ? classes["text-h4-with-border"] : ""
            }
          >
            Medication Refill Requests ({requestNumber})
          </p>
        </div>
        <div className={`${classes["filter-section"]} text-main`}>
          <div>
            <div className={classes.menu} onClick={openMenu}>
              <p className={"text-main"}>{providerLabel}</p>
              <img
                style={{
                  transform: `rotate(${isProviderMenuOpen ? 180 : 0}deg)`,
                  transition: "all .25s",
                }}
                src="./Images/icons/chevron.svg"
              />
            </div>
            {isProviderMenuOpen && (
              <div ref={menuRef} className={classes["small-menu-container"]}>
                <SmallMenu
                  menuType={"provider"}
                  onProviderSelected={onProviderSelected}
                  selected={providerLabel}
                />
              </div>
            )}
          </div>
          <div className={classes["filter-1"]}>
            <div className={classes["search-container"]}>
              <input
                type="text"
                className={classes["search-input"]}
                placeholder="Search..."
                onChange={searchFilter}
              />
              <img
                src="./Images/icons/lupe.svg"
                className={classes["search-icon"]}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedMenu === "1" ? (
        <Incoming
          filterText={searchText}
          providerLabel={providerLabel}
          incomingNumber={settingIncomingData}
        />
      ) : (
        <Medication settingRequestNumber={settingRequestNumber} />
      )}
    </MenuContainer>
  );
};

export default Requests;
