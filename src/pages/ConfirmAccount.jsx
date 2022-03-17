import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clientAxios from "../config/Axios";
import Alert from "../components/Alert";
export default function ConfirmAccount() {
  const params = useParams();
  const { id } = params;
  const [message, setAlert] = useState("");
 
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `veterinaries/confirm/${id}`;
        await clientAxios(url);
        setAlert({ msg: "User has successfully confirmed", error: false });
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };
    confirmAccount();
  }, [id]);
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirm your account and start managing your patients
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl bg-white">
        {message && <Alert alert={message} />}
        {message && (
          <Link
            className="block font-bold text-center my-5 text-indigo-500 hover:cursor-pointer hover:indigo-blue-900"
            to="/"
          >
            Already registered?
          </Link>
        )}
      </div>
    </>
  );
}
