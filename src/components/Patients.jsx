import React, { useEffect, useState } from "react";
import Patient from "../components/Patient";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import Pagination from "../components/Pagination";

export default function Patients() {
  const statePatient =  useSelector(state=>state);
  const [patients, setPatients ] =useState([]);
  const dispatch = useDispatch()
  const {getPatients} = bindActionCreators(actionCreators, dispatch)
  const dataLimit = 2;
  const maxPages = Math.ceil(patients.length / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const handlerPagination = (action) => {
    setCurrentPage((prev) => prev + action);
  };
  useEffect(()=>{
    getPatients()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  useEffect(()=>{
    setPatients(statePatient.patients.data)
  },[statePatient])

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    
    if(patients.length > 0){
    return patients.slice(startIndex, endIndex);}
    else return 0;
  };
  let paginatedPatients = getPaginatedData();
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
          {/* {patients.map((patient) => (
            <Patient key={patient._id} patient={patient} />
          ))} */}
          {paginatedPatients.map((patient) => (
        <Patient key={patient._id} patient={patient} />
      ))}
      {maxPages > 1 ? (
        <Pagination
          current={currentPage}
          max={maxPages}
          setCurrent={handlerPagination}
        />
      ) : null}
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
