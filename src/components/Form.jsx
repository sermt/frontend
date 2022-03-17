import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Alert from "../components/Alert";
import { actionCreators } from "../redux";
export default function Form() {
  // const { createPatient, patient } = usePatients();

  const patient = useSelector((state) => state.patients).patient;
  const dispatch = useDispatch();
  const { createPatient } = bindActionCreators(actionCreators, dispatch);

  const [states, setStates] = useState({});
  const [message, setAlert] = useState({
    msg: "Please, fill all fields!",
    error: false,
  });
  useEffect(() => {
    if (patient?.name) {
      setStates({
        pet_owner: patient.owner,
        pet_name: patient.name,
        pet_email: patient.email,
        pet_tel: patient.telephone || "",
        pet_symptoms: patient.symptoms,
        pet_date: patient.date,
        pet_id: patient._id,
      });
    }
  }, [patient]);
  const submitHandler = async (event) => {
    event.preventDefault();
    const {
      pet_name,
      pet_id,
      pet_email,
      pet_owner,
      pet_tel,
      pet_date,
      pet_symptoms,
    } = states;
    try {
      if (
        pet_name.trim().length > 0 &&
        pet_email.trim().length > 0 &&
        pet_symptoms.trim().length > 0 &&
        pet_owner.trim().length > 0 &&
        pet_date.trim().length > 0 &&
        pet_tel.trim().length > 0
      ) {
      }
    } catch (error) {
      setAlert({ msg: "All fields are required", error: true });
      return;
    }
    try {
      createPatient({
        name: pet_name,
        email: pet_email,
        symptoms: pet_symptoms,
        owner: pet_owner,
        date: pet_date,
        telephone: pet_tel,
        _id: pet_id,
      });
      if (pet_id) {
        setAlert({ msg: "Patient has been updated", error: false });
      } else {
        setAlert({ msg: "Patient has been created", error: false });
      }
    } catch (error) {
      setAlert({ msg: error, error: true });
    }

    setStates({});
    setAlert({
      msg: "Please, fill all fields!",
      error: false,
    });
  };
  const changeState = (event) => {
    switch (event.target.id) {
      case "pet_name": {
        setStates((prev) => ({ ...prev, pet_name: event.target.value }));
        break;
      }
      case "pet_email": {
        setStates((prev) => ({ ...prev, pet_email: event.target.value }));
        break;
      }
      case "pet_owner": {
        setStates((prev) => ({ ...prev, pet_owner: event.target.value }));
        break;
      }
      case "pet_tel": {
        setStates((prev) => ({ ...prev, pet_tel: event.target.value }));
        break;
      }
      case "pet_date": {
        setStates((prev) => ({ ...prev, pet_date: event.target.value }));
        break;
      }
      case "pet_symptoms": {
        setStates((prev) => ({ ...prev, pet_symptoms: event.target.value }));
        break;
      }
      default:
        throw Error("I'm Groot");
    }
  };
  return (
    <>
      <p className="font-black mb-5 text-center uppercase text-2xl">
        {" "}
        Add your patients and{" "}
        <span className="text-blue-800 text-2xl font-black uppercase  ">
          manage them
        </span>
      </p>
      <Alert alert={message} />
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="pet_name"
            className="text-gray-700 uppercase font-bold"
          >
            Pet's Name
          </label>
          <input
            required
            id="pet_name"
            value={states.pet_name || ""}
            onChange={changeState}
            type="text"
            placeholder="Name"
            className="border-2 w-full block mt-2 placeholder-grey-500 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pet_owner"
            className="text-gray-700 uppercase font-bold"
          >
            Owner
          </label>
          <input
            required
            id="pet_owner"
            type="text"
            value={states.pet_owner || ""}
            onChange={changeState}
            placeholder="Full name"
            className="border-2 w-full block mt-2 placeholder-grey-500 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pet_email"
            className="text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="pet_email"
            required
            value={states.pet_email || ""}
            onChange={changeState}
            type="email"
            placeholder="Email address"
            className="border-2 w-full block mt-2 placeholder-grey-500 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pet_tel"
            className="text-gray-700 uppercase font-bold"
          >
            Telephone number
          </label>
          <input
            required
            id="pet_tel"
            value={states.pet_tel || ""}
            onChange={changeState}
            type="tel"
            placeholder="1234567890"
            pattern="[0-9]{10}"
            className="border-2 w-full block mt-2 placeholder-grey-500 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pet_date"
            className="text-gray-700 uppercase font-bold"
          >
            Date
          </label>
          <input
            required
            id="pet_date"
            type="date"
            value={states.pet_date || ""}
            onChange={changeState}
            className="border-2 w-full block mt-2 placeholder-grey-500 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pet_symptoms"
            className="text-gray-700 uppercase font-bold"
          >
            symptoms
          </label>
          <textarea
            required
            id="pet_symptoms"
            type="text"
            value={states.pet_symptoms || ""}
            onChange={changeState}
            placeholder="Describe symptoms"
            className="border-2 w-full block mt-2 placeholder-grey-500 rounded-md"
          ></textarea>
        </div>
        <input
          type="submit"
          value={states?.pet_id ? "Save changes" : "Add pet"}
          className="bg-blue-500 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </>
  );
}