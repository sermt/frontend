import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/Axios";
export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [disabled,setDisabled]=useState(false);
  const [message, setAlert] = useState("");
  const params = useParams();
  const { token } = params;
  const changePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //check validations
      if (password.trim().length < 8) {
        setAlert({
          msg: "Password must have at least 8 characters",
          error: true,
        });
        return;
      }
      //request to change password
      await clientAxios.post(`veterinaries/forget-password/${token}`, {
        password,
      });

      setAlert({ msg: "New password was successfully changed", error: false });
      setDisabled(true);
      return;
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
      setPassword("");
      return;
    }
  };

  useEffect(() => {
    const confirmToken = async () => {
      try {
        //check if token exists
        await clientAxios.get(`veterinaries/forget-password/${token}`);
        setAlert({ msg: "Create your new password", error: false });
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };
    confirmToken();
  }, [token]);
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
              onChange={changePassword}
              value={password || ""}
              className="border w-full p-3 bg-gray-50 rounded-xl"
              name="password"
              placeholder="***********"
              required
            />
          </div>
          <input
            type="submit"
            value="Save"
            disabled={disabled}
            className="bg-indigo-200 w-full md:w-auto p-3 rounded-xl uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-10 lg-flex lg:justify-between">
          <Link
            className="block font-bold text-center my-5 text-indigo-500 hover:cursor-pointer hover:indigo-blue-900"
            to="/"
          >
            Already registered?
          </Link>
        </nav>
      </div>
    </>
  );
}