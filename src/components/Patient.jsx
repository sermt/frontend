import React from "react";
import usePatients from "../hooks/usePatients";
export default function Patient({ patient }) {
  const { name, owner, email, telephone, date, _id, symptoms } = patient;
  //functions that triggers edit a patient and delete a patient
  const { setEdit, deletePatient } = usePatients();
  const preEdit = () => {
    setEdit(patient);
    return;
  };
  const preDelete = () => {
    if (window.confirm("Are you sure you want to delete")) {
      deletePatient(patient._id);
    }
    return;
  };
  const dateFormat = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
      newDate
    );
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