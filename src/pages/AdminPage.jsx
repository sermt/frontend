import React, { useState } from "react";
import Form from "../components/Form";
import Patients from "../components/Patients";
export default function AdminPage() {
  const [showForm, setShowForm] = useState(true);
  const formHandler = () => {
    setShowForm((prev) => !prev);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        onClick={formHandler}
        className="bg-blue-500 
      hover:bg-blue-700 mb-10 md:hidden text-white
       font-bold py-2 px-4 rounded"
      >
       {showForm ? 'Hidde Form': 'Show form'}
      </button>
      <div
        className={`${
          showForm ? "block" : "hidden"
        } md:block md:w-1/2 lg:2/5`}
      >
        <Form />
      </div>
      <div className=" md:w-1/2 lg:3/5">
        <Patients  />
      </div>
    </div>
  );
}