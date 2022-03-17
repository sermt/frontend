import React, { useEffect, useState } from "react";
import Patient from "../components/Patient";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";

export default function Patients() {
  const statePatient =  useSelector(state=>state);
  
  const [patients, setPatients ] =useState([]);
  const dispatch = useDispatch()
  const {getPatients} = bindActionCreators(actionCreators, dispatch)

  useEffect(()=>{
    getPatients()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  useEffect(()=>{
    setPatients(statePatient.patients.data)
  },[statePatient])

  return (
    <>
      {patients?.length ? (
        <>
          <h1 className="font-black text-center uppercase text-2xl">
            patient <span className="text-indigo-600">list</span>
          </h1>
          <p className="text-center uppercase text-xl font-black text-indigo-600">
            Manage your <span className="text-black">patients</span>
          </p>
          {patients.map((patient) => (
            <Patient key={patient._id} patient={patient} />
          ))}
        </>
      ) : (
        <>
          {" "}
          <h1 className="font-black text-center text-3xl">
            There are not any patients
          </h1>
          <p className="text-center font-black text-indigo-600">
            Start adding your patients
          </p>
        </>
      )}
    </>
  );
}
