import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/Axios";
export default function NewPassword() {
  const [message, setAlert] = useState("");
  const params = useParams();
  const { token } = params;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = document.getElementById("password").value;
    try {
      
      if (password.trim().length < 8) {
        setAlert({
          msg: "Password must have at least 8 characters",
          error: true,
        });
        return;
      }
      const { data } = await clientAxios.post(
        `veterinaries/forget-password/${token}`,
        {
          password,
        }
      );

      setAlert({ msg: data.msg, error: false });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
      return;
    }
  };
 
  useEffect(() => {
    const { token } = params;
    const confirmToken = async () => {
      try {
        await clientAxios.get(`veterinaries/forget-password/${token}`);
        setAlert({ msg: "Create your new password", error: false });
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };
    confirmToken();
  }, []);
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">New Password</h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl bg-white">
        <form onSubmit={handleSubmit}>
          <Alert alert={message} />
          <div className="my-5">
            <label className="text-black block text-xl font-bold">
              New Password
            </label>
            <input
              id="password"
              type="password"
              className="border w-full p-3 bg-gray-50 rounded-xl"
              name="password"
              placeholder="***********"
            />
          </div>
          <input
            type="submit"
            value="Save"
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