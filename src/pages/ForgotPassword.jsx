import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/Axios";
export default function ForgotPassword() {
  const [states, setStates] = useState({});
  const [message, setAlert] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email } = states;
    try {
      if (email.trim().length > 0 && name.trim().length > 0) {
      }
    } catch (error) {
      setAlert({ msg: "All fields are required", error: true });
      return;
    }
    try {
      const { data } = await axiosClient.post("veterinaries/forget-password", { headers: {
        'Access-Control-Allow-Origin': '*',
        'origin':'x-requested-with',
        'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
        'Content-Type': 'application/json',
    },
        email,
      });
     
      setAlert({ msg: data.message, error: false });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
    setStates({});
  };
  const changeState = (event) => {
    switch (event.target.id) {
      case "name":
        setStates((prev) => ({ ...prev, name: event.target.value }));
        break;
      case "email":
        setStates((prev) => ({ ...prev, email: event.target.value }));
        break;
      default:
        throw Error("I'm Groot");
    }
  };
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recovery Password
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl bg-white">
        {message && <Alert alert={message} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="text-black block text-xl font-bold">Name</label>
            <input
              id="name"
              type="text"
              className="border w-full p-3 bg-gray-50 rounded-xl"
              name="name"
              value={states.name || ""}
              onChange={changeState}
              placeholder="Name"
            />
          </div>
          <div className="my-5">
            <label className="text-black block text-xl font-bold">Email</label>
            <input
              id="email"
              type="email"
              onChange={changeState}
              value={states.email || ""}
              className="border w-full p-3 bg-gray-50 rounded-xl"
              name="email"
              placeholder="Example@example.com"
            />
          </div>
          <input
            type="submit"
            value="Send email"
            className="bg-indigo-200 w-full md:w-auto p-3 rounded-xl uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-10 lg-flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500 hover:cursor-pointer hover:text-blue-800 "
            to="/"
          >
            Already registered? Sign in
          </Link>
        </nav>
      </div>
    </>
  );
}