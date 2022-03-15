import React, { useState } from "react";

import Alert from "../components/Alert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from '../redux'

export default function Register() {
  const authState = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const {userRegistration} = bindActionCreators(actionCreators, dispatch)

  const [states, setStates] = useState({});
  const [message, setMessage] = useState({});
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirm } = states;
    // filters
    //check if property exists
    if (name && email && password && confirm) {
      //check white spaces
      if (
        name.trim().length > 0 &&
        email.trim().length > 0 &&
        password.trim().length > 0 &&
        confirm.trim().length > 0
      ) {
        //check password length
        if (password.length < 8) {
          setMessage({
            msg: "Passwords must have at least 8 characters",
            error: true,
          });
          return;
        }
        //check if passwords are equals
        if (password !== confirm) {
          setMessage({ msg: "Passwords not match", error: true });
          return;
        } //validate email
        if (!validateEmail(email)) {
          setMessage({
            msg: "asd",
            error: true,
          });
          return;
        }
      } else {
        setMessage({ msg: "Don't empty fields", error: true });
        return;
      }
    } else {
      setMessage({ msg: "Don't empty fields", error: true });
      return;
    }
    setMessage({});
    //create user
    try {
      await userRegistration(name, email, password);
      setMessage({
        msg: "User has been created, please check your email.",
        error: false,
      });
      setStates({})
    } catch (error) {
      setMessage({ msg: error.response.data.msg, error: true });
      return;
    }
  };
  const changeState = (event) => {
    switch (event.target.id) {
      case "name":
        setStates((prev) => ({ ...prev, name: event.target.value }));
        break;
      case "email":
        setStates((prev) => ({ ...prev, email: event.target.value }));
        break;
      case "password":
        setStates((prev) => ({ ...prev, password: event.target.value }));
        break;
      case "confirm":
        setStates((prev) => ({ ...prev, confirm: event.target.value }));
        break;
      default:
        throw Error("I'm Evil");
    }
  };
  const { msg } = message;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Create an account and start managing your patients
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl bg-white">
        {msg && <Alert alert={message} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="text-black block text-xl font-bold">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="border w-full p-3 bg-gray-50 rounded-xl"
              value={states.name || ""}
              onChange={changeState}
              placeholder="Your name"
            />
          </div>
          <div className="my-5">
            <label className="text-black block text-xl font-bold">Email</label>
            <input
              id="email"
              onChange={changeState}
              type="email"
              className="border w-full p-3 bg-gray-50 rounded-xl"
              value={states.email || ""}
              name="email"
              placeholder="Example@example.comsss"
            />
          </div>
          <div className="my-5">
            <label className="text-black block text-xl font-bold">
              Password
            </label>
            <input
              id="password"
              onChange={changeState}
              type="password"
              className="border w-full p-3 bg-gray-50 rounded-xl"
              value={states.password || ""}
              name="password"
              placeholder="***********"
            />
          </div>
          <div className="my-5">
            <label className="text-black block text-xl font-bold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              onChange={changeState}
              className="border w-full p-3 bg-gray-50 rounded-xl"
              value={states.confirm || ""}
              placeholder="***********"
            />
          </div>
          <input
            disabled={authState.isLoadingRegistration}
            type="submit"
            value="Register"
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
          <Link
            className="block text-center my-5 text-gray-500 hover:cursor-pointer hover:text-blue-800"
            to="/forget-Password"
          >
            Forgot Password? Click here
          </Link>
        </nav>
      </div>
    </>
  );
}