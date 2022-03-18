import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
export default function Header() {
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(actionCreators, dispatch);

  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <Link
          to="/admin"
          className="hover:bg-indigo-900 text-white text-sm text-3xl font-black hover:cursor-pointer uppercase"
        >
          Vet App
        </Link>

        <nav className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-5 lg:mt-0">
          <Link
            to="/admin"
            className="hover:bg-indigo-900 text-white text-sm font-black hover:cursor-pointer uppercase"
          >
            Patients
          </Link>
          <Link
            to="/admin/profile"
            className="hover:bg-indigo-900 text-white text-sm font-black hover:cursor-pointer uppercase"
          >
            Profile
          </Link>
          <button
            type="button"
            className="hover:bg-indigo-900 text-white  text-sm font-black uppercase hover:cursor-pointer"
            onClick={logout}
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}