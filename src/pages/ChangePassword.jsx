import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
export default function ChangePassword() {

  const dispatch = useDispatch();
  const { updatePassword } = bindActionCreators(actionCreators, dispatch)

  const [passwords, setPasswords] = useState({ oldPwd: "", newPwd: "" });
  const [message, setAlert] = useState({
    msg: "Password must be at least 8 characters",
    error: false,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { oldPwd, newPwd } = passwords;
    const checkTrims = [oldPwd, newPwd].includes("");
    if (checkTrims) {
      return setAlert({
        msg: "Passwords are required.",
        error: true,
      });
    }
    const checkLength = [oldPwd, newPwd].every((pwd) => pwd.length < 8);
    if (checkLength) {
      return setAlert({
        msg: "Passwords must be at least 8 characters.",
        error: true,
      });
    }
    const result = await updatePassword(passwords);
    setAlert(result);
  };
  const changePassword = (event) => {
    if (event.target.id === "oldPassword") {
      setPasswords((passwords) => ({
        ...passwords,
        oldPwd: event.target.value,
      }));
    } else {
      setPasswords((passwords) => ({
        ...passwords,
        newPwd: event.target.value,
      }));
    }
  };
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl  text-center mt-5">
        Change your password
      </h2>
      <div className=" flex justify-center">
        <div className=" w-3/4 md:1/2 bg-white shadow rounded-lg p-5">
          <Alert alert={message} />
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 ">
                {" "}
                Old Password
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="oldPassword"
                id="oldPassword"
                placeholder="Write the old password"
                value={passwords.oldPwd || ""}
                onChange={changePassword}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 ">
                {" "}
                New Password
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="newPassword"
                id="newPassword"
                placeholder="Write a new password"
                value={passwords.newPwd || ""}
                onChange={changePassword}
              />
            </div>
            <input
              type="submit"
              className="bg-indigo-500  px-10 py-3 font-bold hover:bg-indigo-700 hover:cursor-pointer text-white rounded-lg uppercase
            w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  );
}