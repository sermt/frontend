import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
export default function Header() {
  const {logOut}=useAuth();
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <h1 className="font-bold text-2xl text-center text-white ">Welcome back</h1>

        <nav className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-5 lg:mt-0">
          <Link to="/admin" className="text-white text-sm font-black hover:cursor-pointer uppercase ">
            Patients
          </Link>
          <Link to="/admin/profile" className="text-white text-sm font-black hover:cursor-pointer uppercase">
            Profile
          </Link>
          <button
            type="button"
            className="text-white  text-sm font-black uppercase hover:cursor-pointer"
            onClick={logOut}
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
