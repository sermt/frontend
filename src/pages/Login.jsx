import React, { useState } from "react";
import Alert from "../components/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../redux'

export default function Login() {
  const dispatch = useDispatch();
  const { userLogin } = bindActionCreators(actionCreators, dispatch)
  const navigate = useNavigate();
  const [message, setAlert] = useState({
    msg: "Please fill all fields",
    error: false,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;
    try {
      if ([email, password].includes("")) {
        setAlert({ msg: "All fields are required", error: true });
        return;
      }
      if (password.trim().length < 8) {
        setAlert({
          msg: "Password must be at least 8 characters",
          error: true,
        });
        return;
      }

      const data = await userLogin(password, email)
      console.log(123121312312)
      console.log(data)
      if(!data.token) {setAlert({ msg: data, error: true });
      return;}
      navigate("/admin");
    } catch (error) {
      setAlert({ msg: error, error: true });
      return;
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Log in and manage your patients
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl bg-white">
        {<Alert alert={message} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="text-black block text-xl font-bold">Email</label>
            <input
              id="email"
              type="email"
              className="border w-full p-3 bg-gray-50 rounded-xl"
              name="email"
              placeholder="Example@example.com"
            />
          </div>
          <div className="my-5">
            <label className="text-black block text-xl font-bold">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border w-full p-3 bg-gray-50 rounded-xl"
              name="password"
              placeholder="********"
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="bg-indigo-200 w-full md:w-auto p-3 rounded-xl uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-10 lg-flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500 hover:cursor-pointer hover:text-blue-800 "
            to="/register"
          >
            Don’t have an account? Register here
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