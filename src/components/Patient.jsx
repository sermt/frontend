import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../redux";

export default function Patient({ patient }) {
  const { name, owner, email, telephone, date, _id, symptoms } = patient;


  const dispatch = useDispatch();
  const { setPatientData, deletePatient } = bindActionCreators(actionCreators, dispatch);

  const preEdit = () => {
    setPatientData(patient);
    return;
  };
  const preDelete = () => {
    if (window.confirm("Are you sure you want to delete")) {
      deletePatient(patient._id);
    }
    return;
  };
  const dateFormat = (date) => {
    const date_ = date.split("T")[0].split("-");
    const newDate = new Date(date_[0],date_[1],date_[2]);
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString("en-US", options)
    // return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    //   newDate
    // );
  };
  return (
    <div className=" block m-2 p-6  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <p className="font-normal  text-gray-700 dark:text-gray-400">
        ID: <span className="text-bold text-indigo-700">{_id}</span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Date:{" "}
        <span className="text-bold text-indigo-700">{dateFormat(date)}</span>
      </p>
      <p className="font-normal  text-gray-700 dark:text-gray-400">
        Owner: <span className="text-bold text-indigo-700">{owner}</span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Name: <span className="text-bold text-indigo-700">{name}</span>
      </p>
      <p className="font-normal text-dark">
        Email: <span className="text-bold text-indigo-700">{email}</span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Telephone:{" "}
        <span className="text-bold text-indigo-700">
          {telephone || "Missing"}
        </span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Symptoms: <span className="text-bold text-indigo-700">{symptoms}</span>
      </p>
      <div className="flex justify-between my-5">
        <button
          className="py-2 px-10 bg-indigo-700 hover:bg-indigo-800 text-white
        uppercase font-bold rounded-lg"
          type="button"
          onClick={preEdit}
        >
          Edit
        </button>
        <button
          className="py-2 px-10  bg-red-700 hover:bg-red-800 text-white
        uppercase font-bold rounded-lg"
          onClick={preDelete}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}