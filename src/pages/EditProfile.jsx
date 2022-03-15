import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

export default function EditProfile() {
  const { auth, updateProfile } = useAuth();
  const [message, setAlert] = useState({
    msg: "Be careful when changing data",
    error: false,
  });
  const [profile, setProfile] = useState(auth);
  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = profile;
    if ([name, email].includes("")) {
      setAlert({ msg: "Name and email are required!", error: true });
      return;
    }
    const result = await updateProfile(profile);
    setAlert(result);
  };

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl  text-center mt-5 uppercase">
        Edit profile
      </h2>
      <div className=" flex justify-center">
        <div className=" w-3/4 md:1/2 bg-white shadow rounded-lg p-5">
          <Alert alert={message} />
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 ">
                {" "}
                Name
              </label>
              <input
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="name"
                value={profile.name || ""}
                onChange={(e) =>
                  setProfile((profile) => ({
                    ...profile,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="my-3">
              <label type="text" className="uppercase font-bold text-gray-600 ">
                {" "}
                Web
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={profile.web || ""}
                onChange={(e) =>
                  setProfile((profile) => ({ ...profile, web: e.target.value }))
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 ">
                {" "}
                Telephone
              </label>
              <input
                type="tel"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="tel"
                value={profile.telephone || ""}
                onChange={(e) =>
                  setProfile((profile) => ({
                    ...profile,
                    telephone: e.target.value,
                  }))
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 ">
                {" "}
                Email
              </label>
              <input
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={profile.email || ""}
                onChange={(e) =>
                  setProfile((profile) => ({
                    ...profile,
                    email: e.target.value,
                  }))
                }
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