import React from "react";

const PatientContext = React.createContext({
  cName: "",
  birthday: "",
  contact: "",
  email: "",
  address: "",
  provider: "Dr Margaret Lim",
  Wellness: "",
  rpm: "",
  ccm: "",
  age: "",
});

export default PatientContext;
