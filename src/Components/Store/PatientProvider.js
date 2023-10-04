import React, { useState } from "react";
import PatientContext from "./patient-context";

const PatientProvider = (props) => {
  const [patientList, setPatientList] = useState([
    {
      pttNumber: "0",
      name: "Cameron Williamson",
      provider: "Dr Antoine Brown",
      birthday: "12.12.1975",
      contact: "+351 588 954 257",
      email: "cameron@gmail.com",
      age: "",
      address: "15208 West 119th Street, Olathe, Kansas 666062",
      Wellness: "",
      RPM: "RPM",
      CCM: "CCM",
    },
    {
      pttNumber: "2",
      name: "Dianna Russel",
      provider: "Dr Arlene McCoy",
      birthday: "09.12.1967",
      age: "",
      contact: "+351 588 954 257",
      email: "diannarussel@gmail.com",
      address: "15208 West 119th Street, Olathe, Kansas 666062",
      Wellness: "Wellness",
      RPM: "RPM",
      CCM: "CCM",
    },
    {
      pttNumber: "3",
      name: "Leslie Alexander",
      provider: "Dr Antoine Brown",
      birthday: "09.12.1989",
      age: "",
      contact: "+351 588 954 257",
      email: "cameron@gmail.com",
      address: "15208 West 119th Street, Olathe, Kansas 666062",
      Wellness: "Wellness",
      RPM: "",
      CCM: "CCM",
    },
    {
      pttNumber: "4",
      name: "Jacob Jones",
      provider: "Dr Kristin Watson",
      birthday: "09.12.2000",
      age: "",
      contact: "+351 588 954 257",
      email: "cameron@gmail.com",
      address: "15208 West 119th Street, Olathe, Kansas 666062",
      Wellness: "Wellness",
      RPM: "",
      CCM: "CCM",
    },
    {
      pttNumber: "5",
      name: "Devon Lane",
      provider: "Dr Antoine Brown",
      birthday: "09.12.1963",
      age: "",
      contact: "+351 588 954 257",
      email: "cameron@gmail.com",
      address: "15208 West 119th Street, Olathe, Kansas 666062",
      Wellness: "",
      RPM: "RPM",
      CCM: "CCM",
    },
    {
      pttNumber: "6",
      name: "Jerome Bell",
      provider: "Dr Eleanor Pena",
      birthday: "09.12.1967",
      age: "",
      contact: "+351 588 954 257",
      email: "cameron@gmail.com",
      address: "15208 West 119th Street, Olathe, Kansas 666062",
      Wellness: "Wellness",
      RPM: "",
      CCM: "CCM",
    },
    {
      pttNumber: "7",
      name: "Esher Howard",
      provider: "Dr Eleano Pena",
      birthday: "09.12.1967",
      age: "",
      contact: "+351 588 954 257",
      email: "cameron@gmail.com",
      address: "15208 West 119th Street, Olathe, Kansas 666062",
      Wellness: "Wellness",
      RPM: "",
      CCM: "CCM",
    },
    {
      pttNumber: "8",
      name: "Courtney Henry",
      provider: "Dr Margaret Lim",
      birthday: "09.12.1967",
      age: "",
      contact: "+351 588 954 257",
      email: "cameron@gmail.com",
      address: "15208 West 119th Street, Olathe, Kansas 666062",
      Wellness: "Wellness",
      RPM: "",
      CCM: "CCM",
    },
  ]);

  const [appointment, setAppointment] = useState([
    {
      id: 0,
      name: "Cameron Williamson",
      reason: "Obesity/Weight Loss",
      date: "2023-02-23",
      time: "10:30",
      covidStatus: "No Covid",
      type: "videocall",
      callButton: "Call",
      provider: "Dr Margaret Lim",
    },
    {
      id: 1,
      name: "Leslie Alexander",
      reason: "Back pain",
      date: "2023-04-05",
      time: "11:30",
      covidStatus: "Likely COVID",
      type: "videocall",
      callButton: "Call",
      provider: "Dr. Antoine Brown",
    },
    {
      id: 2,
      name: "Jacob Jones",
      reason: "Annual physical",
      date: "03.05.2023",
      time: "13:00",
      covidStatus: "Likely COVID",
      type: "In-Person",
      callButton: "Call",
      provider: "Dr. Margaret Lim",
    },
    {
      id: 3,
      name: "Kathryn Murphy",
      birthday: "09.12.1967",
      pttNumber: 26,
      reason: "Headaches",
      date: "04.05.2023",
      time: "14:30",
      covidStatus: "No Covid",
      type: "videocall",
      callButton: "Call",
      provider: "Dr. Margaret Lim",
    },
    {
      id: 4,
      name: "Savannah Nguyen",
      pttNumber: 25,
      birthday: "09.12.1963",
      reason: "Regular abdominal pain",
      date: "02.03.2023",
      time: "15:30",
      covidStatus: "Likely COVID",
      type: "In-Person",
      callButton: "Call",
      provider: "Dr. Antoine Brown",
    },
    {
      id: 5,
      name: "Jerome Bell",
      reason: "Obesity/Weight loss consultation",
      date: "12.03.2023",
      time: "17:00",
      covidStatus: "No Covid",
      type: "In-Person",
      callButton: "Call",
      provider: "Dr. Margaret Lim",
    },
  ]);

  const provider = [
    {
      id: 0,
      label: "All Providers",
    },
    {
      id: 1,
      label: "Dr Antoine Brown",
    },
    {
      id: 2,
      label: "Dr Arlene McCoy",
    },
    {
      id: 3,
      label: "Dr Kristin Watson",
    },
    {
      id: 4,
      label: "Dr Eleanor Pena",
    },
    {
      id: 5,
      label: "Dr Margaret Lim",
    },
  ];

  const mergedAppointments = appointment.map((appt) => {
    const patient = patientList.find((patient) => patient.name === appt.name);
    const patientType = appt.type.toLowerCase();
    return { ...appt, ...patient, patientType };
  });

  const addPatient = (clientData) => {
    setPatientList((prevPatient) => {
      return [...prevPatient, clientData];
    });
  };

  const addAppointment = (apptData) => {
    setAppointment((prevData) => {
      return [...prevData, apptData];
    });
  };

  const removeAppointment = (apptData) => {
    setAppointment((prevData) =>
      prevData.filter((appt) => appt.id !== apptData)
    );
  };

  const patientContext = {
    addPatient: addPatient,
    patientList: patientList,
    addAppointment: addAppointment,
    removeAppointment: removeAppointment,
    appointment: appointment,
    mergedAppointments: mergedAppointments,
    providers: provider,
  };

  return (
    <PatientContext.Provider value={patientContext}>
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
