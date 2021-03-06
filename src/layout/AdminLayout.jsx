import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AdminLayout() {
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const token = localStorage.getItem("my-token");
    if (!token || !Object.keys(auth).length >0) {
      navigate('/');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (auth?.isLoading) return "Loading...";
  return (
    <>
      <Header />
      <main className="container mx-auto mt-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}